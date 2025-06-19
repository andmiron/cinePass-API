"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cinemasRelations = exports.cinemas = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const reservations_1 = require("./reservations");
const showtimes_1 = require("./showtimes");
exports.cinemas = (0, pg_core_1.pgTable)("cinemas", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)("name").notNull(),
    location: (0, pg_core_1.point)("location").notNull(),
    address: (0, pg_core_1.text)("address").unique().notNull(),
    phone: (0, pg_core_1.text)("phone").unique().notNull(),
    city: (0, pg_core_1.text)("city").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$onUpdate(() => new Date())
        .defaultNow(),
});
exports.cinemasRelations = (0, drizzle_orm_1.relations)(exports.cinemas, ({ many }) => ({
    reservations: many(reservations_1.reservations),
    showtimes: many(showtimes_1.showtimes),
}));
