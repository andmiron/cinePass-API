"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const swaggerPlugin = async (app) => {
    app.register(swagger_1.default, {
        openapi: {
            openapi: "3.0.0",
            info: {
                title: "Movie reservation API",
                description: "API for the movie reservation",
                version: "1.0.0",
            },
            tags: [
                { name: "auth", description: "Authentication related endpoints" },
                {
                    name: "healthcheck",
                    description: "API and database health check",
                },
            ],
        },
        transform: fastify_type_provider_zod_1.jsonSchemaTransform,
    });
    app.register(swagger_ui_1.default, {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "full",
            deepLinking: false,
        },
    });
    app.after((err) => {
        if (err) {
            app.log.error(err);
        }
        app.log.info("Swagger plugin loaded");
    });
};
exports.default = swaggerPlugin;
