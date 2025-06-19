"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("./config/app.config"));
const server_1 = __importDefault(require("./server"));
async function main() {
    const { PORT, HOST } = app_config_1.default;
    const server = await (0, server_1.default)();
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
            }
            catch (err) {
                server.log.error(`Error during server shutdown: ${err}`);
                process.exit(1);
            }
        });
    }
}
main();
