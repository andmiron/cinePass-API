"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seatsRelations = exports.seats = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const showtimes_1 = require("./showtimes");
const drizzle_orm_1 = require("drizzle-orm");
exports.seats = (0, pg_core_1.pgTable)("seats", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    showtimeId: (0, pg_core_1.uuid)("showtime_id").references(() => showtimes_1.showtimes.id, {
        onDelete: "cascade",
    }),
    row: (0, pg_core_1.integer)("row").notNull(),
    number: (0, pg_core_1.integer)("number").notNull(),
    isReserved: (0, pg_core_1.boolean)("is_reserved").default(false),
});
exports.seatsRelations = (0, drizzle_orm_1.relations)(exports.seats, ({ one }) => ({
    showtime: one(showtimes_1.showtimes, {
        fields: [exports.seats.showtimeId],
        references: [showtimes_1.showtimes.id],
    }),
}));
