"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sensible_1 = __importDefault(require("@fastify/sensible"));
const sensiblePlugin = async (app) => {
    app.register(sensible_1.default);
    app.after((err) => {
        if (err) {
            app.log.error(err);
        }
        app.log.info("Sensible plugin loaded");
    });
};
exports.default = sensiblePlugin;
