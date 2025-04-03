import { FastifyInstance } from "fastify";
import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const healthRoute: FastifyPluginAsyncZod = async (app: FastifyInstance) => {
  app.get(
    "/health",
    {
      schema: {
        tags: ["healthcheck"],
        summary: "Health check",
        description: "Check if the server is running",
        response: {
          200: z.object({
            server: z.boolean().describe("Server status"),
            database: z.boolean().describe("Database connection status"),
          }),
        },
      },
    },
    async (request, reply) => {
      const ping = await app.db.execute(`SELECT 1`);
      await reply.send({
        server: true,
        database: ping.rows.length > 0,
      });
    }
  );

  app.after((err) => {
    if (err) {
      app.log.error(err);
    }
    app.log.info(`GET: ${app.prefix}/health`);
  });
};

export default healthRoute;
