import { FastifyInstance } from "fastify";
import config from "@/config/config";
import build from "@/server";

async function main() {
  const { PORT, HOST } = config;

  const server: FastifyInstance = await build();

  server.listen({ port: PORT, host: HOST }, (err) => {
    if (err) {
      server.log.error(`Error on starting the server: ${err}`);
      process.exit(1);
    }
  });

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, async () => {
      server.log.info(`Received ${signal}, starting graceful shutdown...`);
      try {
        await server.close();
        server.log.info("Server closed successfully");
        process.exit(0);
      } catch (err) {
        server.log.error(`Error during server shutdown: ${err}`);
        process.exit(1);
      }
    });
  }
}

main();
