import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { DatabaseError } from "pg";
import { createSelectSchema } from "drizzle-zod";
import * as argon2 from "argon2";
import { z } from "zod";
import { users } from "@/db/schema/users";

const userRegisterSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    })
    .transform((email) => email.toLowerCase()),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

const userRegisterResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      user: createSelectSchema(users).pick({ id: true, email: true }),
    }),
  })
  .describe("Success user registration response");

type UserRegisterSchema = z.infer<typeof userRegisterSchema>;
type UserRegisterResponseSchema = z.infer<typeof userRegisterResponseSchema>;

const registerRoute: FastifyPluginAsyncZod = async (app: FastifyInstance) => {
  app.post(
    "/register",
    {
      schema: {
        tags: ["auth"],
        summary: "New user registration route",
        body: userRegisterSchema,
        response: {
          201: userRegisterResponseSchema,
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: UserRegisterSchema }>,
      reply: FastifyReply
    ) => {
      const { email, password } = request.body;

      try {
        const hashedPassword = await argon2.hash(password);
        const user = await app.db
          .insert(users)
          .values({
            email,
            password: hashedPassword,
          })
          .returning({
            id: users.id,
            email: users.email,
          });

        await reply.status(201).send({
          success: true,
          message: "User registered successfully",
          data: {
            user: user[0],
          },
        });
      } catch (err) {
        const error = err as DatabaseError;
        if (error.code === "23505") {
          await reply.badRequest("User with this email already exists");
        }
        await reply.badRequest("Failed to register user");
      }
    }
  );

  await app.after();
  app.log.info(`POST: ${app.prefix}/register`);
};

export default registerRoute;

export {
  userRegisterSchema,
  userRegisterResponseSchema,
  type UserRegisterSchema,
  type UserRegisterResponseSchema,
};
