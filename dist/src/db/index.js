"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseUrl = void 0;
exports.setupDatabase = setupDatabase;
const app_config_1 = __importDefault(require("../config/app.config"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const getDatabaseUrl = () => {
    switch (app_config_1.default.NODE_ENV) {
        case "production":
            return app_config_1.default.DATABASE_URL_PROD;
        case "test":
            return app_config_1.default.DATABASE_URL_TEST;
        default:
            return app_config_1.default.DATABASE_URL_DEV;
    }
};
exports.getDatabaseUrl = getDatabaseUrl;
async function setupDatabase() {
    const pool = new pg_1.Pool({
        connectionString: (0, exports.getDatabaseUrl)(),
    });
    const db = (0, node_postgres_1.drizzle)({ client: pool });
    return db;
}
