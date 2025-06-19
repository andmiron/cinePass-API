"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = build;
const fastify_1 = __importDefault(require("fastify"));
const node_path_1 = require("node:path");
const autoload_1 = __importDefault(require("@fastify/autoload"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const app_options_1 = require("./config/app.options");
async function build() {
    const app = (0, fastify_1.default)(app_options_1.fastifyOptions);
    app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
    app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
    app.register(autoload_1.default, {
        dir: (0, node_path_1.join)(__dirname, "plugins"),
        encapsulate: false,
    });
    await app.after();
    app.log.warn("Plugins loaded");
    app.register(autoload_1.default, {
        dir: (0, node_path_1.join)(__dirname, "routes"),
        options: { prefix: "/api" },
    });
    await app.after();
    app.log.warn("Routes loaded");
    return app;
}
