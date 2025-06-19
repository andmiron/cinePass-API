"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRelations = exports.users = exports.roles = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const reservations_1 = require("./reservations");
exports.roles = (0, pg_core_1.pgEnum)("roles", ["user", "admin"]);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    email: (0, pg_core_1.text)("email").unique().notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    role: (0, exports.roles)("role").notNull().default("user"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$onUpdate(() => new Date())
        .defaultNow(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    reservations: many(reservations_1.reservations),
}));
