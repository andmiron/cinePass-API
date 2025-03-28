import { relations } from "drizzle-orm";
import { pgTable, point, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { reservations } from "./reservations";
import { showtimes } from "./showtimes";

export const cinemas = pgTable("cinemas", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  location: point("location").notNull(),
  address: text("address").unique().notNull(),
  phone: text("phone").unique().notNull(),
  city: text("city").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const cinemasRelations = relations(cinemas, ({ many }) => ({
  reservations: many(reservations),
  showtimes: many(showtimes),
}));
