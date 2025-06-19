"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const healthRoute = async (app) => {
    app.get("/health", {
        schema: {
            tags: ["healthcheck"],
            summary: "Health check",
            description: "Check if the server is running",
            response: {
                200: zod_1.z.object({
                    server: zod_1.z.boolean().describe("Server status"),
                    database: zod_1.z.boolean().describe("Database connection status"),
                }),
            },
        },
    }, async (request, reply) => {
        const ping = await app.db.execute(`SELECT 1`);
        await reply.send({
            server: true,
            database: ping.rows.length > 0,
        });
    });
    app.after((err) => {
        if (err) {
            app.log.error(err);
        }
        app.log.info(`GET: ${app.prefix}/health`);
    });
};
exports.default = healthRoute;
