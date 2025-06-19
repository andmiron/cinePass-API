"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const db_1 = require("./src/db");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: "./src/db/schema/*.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: (0, db_1.getDatabaseUrl)(),
    },
});
