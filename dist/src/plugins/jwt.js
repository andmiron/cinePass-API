"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("@fastify/jwt"));
const jwtPlugin = async (app) => {
    await app.register(jwt_1.default, {
        secret: app.config.JWT_SECRET,
    });
    app.decorate("authenticate", async (request, reply) => {
        try {
            await request.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    });
    app.decorate("isAdmin", async (request, reply) => {
        const user = (await request.user);
        if (user.role !== "admin") {
            await reply.forbidden();
        }
    });
    app.after((err) => {
        if (err) {
            app.log.error(err);
        }
        app.log.info("JWT plugin loaded");
    });
};
exports.default = jwtPlugin;
