import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

const healthRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/health",
    {
      schema: {
        tags: ["healthcheck"],
        summary: "Health check",
        description: "Check if the server is running",
        response: {
          200: z.object({
            status: z.string(),
            database: z.boolean().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const ping = await app.db.execute(`SELECT 1`);
      await reply.send({
        status: "ok",
        database: ping.rows.length > 0,
      });
    }
  );
};

export default healthRoute;
