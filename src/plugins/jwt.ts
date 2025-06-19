import fastifyJwt from "@fastify/jwt";
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { User } from "../db/schema/users";

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

  app.decorateRequest(
    "isAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = (await request.user) as User;
      if (user.role !== "admin") {
        await reply.forbidden();
      }
    }
  );

  app.after(() => app.log.info("Plugin loaded: jwt"));
};

export default jwtPlugin;
