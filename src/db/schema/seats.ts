import { pgTable, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { showtimes } from "./showtimes";
import { relations } from "drizzle-orm";

export const seats = pgTable("seats", {
  id: uuid("id").primaryKey().defaultRandom(),
  showtimeId: uuid("showtime_id").references(() => showtimes.id, {
    onDelete: "cascade",
  }),
  row: integer("row").notNull(),
  number: integer("number").notNull(),
  isReserved: boolean("is_reserved").default(false),
});

export const seatsRelations = relations(seats, ({ one }) => ({
  showtime: one(showtimes, {
    fields: [seats.showtimeId],
    references: [showtimes.id],
  }),
}));
