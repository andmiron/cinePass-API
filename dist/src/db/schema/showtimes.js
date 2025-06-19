"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showtimesRelations = exports.showtimes = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const movies_1 = require("./movies");
const drizzle_orm_1 = require("drizzle-orm");
const seats_1 = require("./seats");
const reservations_1 = require("./reservations");
const cinemas_1 = require("./cinemas");
exports.showtimes = (0, pg_core_1.pgTable)("showtimes", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    movieId: (0, pg_core_1.uuid)("movie_id").references(() => movies_1.movies.id, {
        onDelete: "cascade",
    }),
    cinemaId: (0, pg_core_1.uuid)("cinema_id").references(() => cinemas_1.cinemas.id, {
        onDelete: "cascade",
    }),
    startTime: (0, pg_core_1.timestamp)("start_time").notNull(),
    endTime: (0, pg_core_1.timestamp)("end_time").notNull(),
    price: (0, pg_core_1.integer)("price").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$onUpdate(() => new Date())
        .defaultNow(),
});
exports.showtimesRelations = (0, drizzle_orm_1.relations)(exports.showtimes, ({ one, many }) => ({
    movie: one(movies_1.movies, {
        fields: [exports.showtimes.movieId],
        references: [movies_1.movies.id],
    }),
    cinema: one(cinemas_1.cinemas, {
        fields: [exports.showtimes.cinemaId],
        references: [cinemas_1.cinemas.id],
    }),
    seats: many(seats_1.seats),
    reservations: many(reservations_1.reservations),
}));
