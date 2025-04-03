import fastifyJwt from "@fastify/jwt";
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { User } from "@/db/schema/users";

const jwtPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
  await app.register(fastifyJwt, {
    secret: app.config.JWT_SECRET,
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );

  app.decorate(
    "isAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = (await request.user) as User;
      if (user.role !== "admin") {
        await reply.forbidden();
      }
    }
  );

  app.after((err) => {
    if (err) {
      app.log.error(err);
    }
    app.log.info("JWT plugin loaded");
  });
};

export default jwtPlugin;
