"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const drizzlePlugin = async (app) => {
    const db = await (0, db_1.setupDatabase)();
    app.decorate("db", db);
    app.addHook("onClose", async (app) => {
        await app.db.$client.end();
    });
    try {
        await app.after();
        await app.db.execute(`SELECT 1`);
        app.log.info("Drizzle database plugin loaded");
    }
    catch (error) {
        app.log.error(error);
    }
};
exports.default = drizzlePlugin;
