"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationsRelations = exports.reservations = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
const showtimes_1 = require("./showtimes");
const drizzle_orm_1 = require("drizzle-orm");
const cinemas_1 = require("./cinemas");
exports.reservations = (0, pg_core_1.pgTable)("reservations", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)("user_id").references(() => users_1.users.id, { onDelete: "cascade" }),
    showtimeId: (0, pg_core_1.uuid)("showtime_id").references(() => showtimes_1.showtimes.id, {
        onDelete: "cascade",
    }),
    cinemaId: (0, pg_core_1.uuid)("cinema_id").references(() => cinemas_1.cinemas.id, {
        onDelete: "cascade",
    }),
    seats: (0, pg_core_1.jsonb)("seats").notNull(),
    totalPrice: (0, pg_core_1.decimal)("total_price", { precision: 10, scale: 2 }).notNull(),
    status: (0, pg_core_1.text)("status").notNull().default("active"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$onUpdate(() => new Date())
        .defaultNow(),
});
exports.reservationsRelations = (0, drizzle_orm_1.relations)(exports.reservations, ({ one }) => ({
    user: one(users_1.users, {
        fields: [exports.reservations.userId],
        references: [users_1.users.id],
    }),
    showtime: one(showtimes_1.showtimes, {
        fields: [exports.reservations.showtimeId],
        references: [showtimes_1.showtimes.id],
    }),
    cinema: one(cinemas_1.cinemas, {
        fields: [exports.reservations.cinemaId],
        references: [cinemas_1.cinemas.id],
    }),
}));
