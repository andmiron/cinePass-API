"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyOptions = void 0;
const node_crypto_1 = require("node:crypto");
const logger_1 = require("./logger");
const app_config_1 = __importDefault(require("./app.config"));
exports.fastifyOptions = {
    genReqId: () => (0, node_crypto_1.randomUUID)(),
    logger: (_a = logger_1.envToLogger[app_config_1.default.NODE_ENV]) !== null && _a !== void 0 ? _a : true,
};
