import {
  decimal,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { showtimes } from "./showtimes";
import { relations } from "drizzle-orm";
import { cinemas } from "./cinemas";

export const reservations = pgTable("reservations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  showtimeId: uuid("showtime_id").references(() => showtimes.id, {
    onDelete: "cascade",
  }),
  cinemaId: uuid("cinema_id").references(() => cinemas.id, {
    onDelete: "cascade",
  }),
  seats: jsonb("seats").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const reservationsRelations = relations(reservations, ({ one }) => ({
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id],
  }),
  showtime: one(showtimes, {
    fields: [reservations.showtimeId],
    references: [showtimes.id],
  }),
  cinema: one(cinemas, {
    fields: [reservations.cinemaId],
    references: [cinemas.id],
  }),
}));
