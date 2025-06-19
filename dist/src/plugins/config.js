"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("../config/app.config"));
const configPlugin = async (app) => {
    app.decorate("config", app_config_1.default);
    app.after((err) => {
        if (err) {
            app.log.error(err);
        }
        app.log.info("Config plugin loaded");
    });
};
exports.default = configPlugin;
