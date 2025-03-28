import {
  pgTable,
  timestamp,
  uuid,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { movies } from "./movies";
import { relations } from "drizzle-orm";
import { seats } from "./seats";
import { reservations } from "./reservations";
import { cinemas } from "./cinemas";

export const showtimes = pgTable("showtimes", {
  id: uuid("id").primaryKey().defaultRandom(),
  movieId: uuid("movie_id").references(() => movies.id, {
    onDelete: "cascade",
  }),
  cinemaId: uuid("cinema_id").references(() => cinemas.id, {
    onDelete: "cascade",
  }),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const showtimesRelations = relations(showtimes, ({ one, many }) => ({
  movie: one(movies, {
    fields: [showtimes.movieId],
    references: [movies.id],
  }),
  cinema: one(cinemas, {
    fields: [showtimes.cinemaId],
    references: [cinemas.id],
  }),
  seats: many(seats),
  reservations: many(reservations),
}));
