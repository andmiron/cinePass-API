"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = async (app) => {
    app.setErrorHandler((error, request, reply) => {
        app.log.error(error);
        const isProd = app.config.NODE_ENV === "production";
        const errorMessage = isProd ? "Internal server error" : error.message;
        const statusCode = error.statusCode || 500;
        reply.status(statusCode).send({
            success: false,
            error: {
                message: errorMessage,
            },
        });
    });
    app.after((err) => {
        if (err) {
            app.log.error(err);
        }
        app.log.info("Error handler plugin loaded");
    });
};
exports.default = errorHandler;
