import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { showtimes } from "./showtimes";

export const movies = pgTable("movies", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(),
  posterUrl: text("poster_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const genres = pgTable("genres", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull(),
});

export const movieGenres = pgTable("movie_genres", {
  movieId: uuid("movie_id").references(() => movies.id, {
    onDelete: "cascade",
  }),
  genreId: uuid("genre_id").references(() => genres.id, {
    onDelete: "cascade",
  }),
});

export const moviesRelations = relations(movies, ({ many }) => ({
  showtimes: many(showtimes),
  genres: many(movieGenres),
}));

export const genresRelations = relations(genres, ({ many }) => ({
  movies: many(movieGenres),
}));

export const movieGenresRelations = relations(movieGenres, ({ one }) => ({
  movie: one(movies, {
    fields: [movieGenres.movieId],
    references: [movies.id],
  }),
  genre: one(genres, {
    fields: [movieGenres.genreId],
    references: [genres.id],
  }),
}));
