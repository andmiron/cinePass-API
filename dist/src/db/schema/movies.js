"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieGenresRelations = exports.genresRelations = exports.moviesRelations = exports.movieGenres = exports.genres = exports.movies = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const showtimes_1 = require("./showtimes");
exports.movies = (0, pg_core_1.pgTable)("movies", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    duration: (0, pg_core_1.integer)("duration").notNull(),
    posterUrl: (0, pg_core_1.text)("poster_url").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at")
        .$onUpdate(() => new Date())
        .defaultNow(),
});
exports.genres = (0, pg_core_1.pgTable)("genres", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)("name").unique().notNull(),
});
exports.movieGenres = (0, pg_core_1.pgTable)("movie_genres", {
    movieId: (0, pg_core_1.uuid)("movie_id").references(() => exports.movies.id, {
        onDelete: "cascade",
    }),
    genreId: (0, pg_core_1.uuid)("genre_id").references(() => exports.genres.id, {
        onDelete: "cascade",
    }),
});
exports.moviesRelations = (0, drizzle_orm_1.relations)(exports.movies, ({ many }) => ({
    showtimes: many(showtimes_1.showtimes),
    genres: many(exports.movieGenres),
}));
exports.genresRelations = (0, drizzle_orm_1.relations)(exports.genres, ({ many }) => ({
    movies: many(exports.movieGenres),
}));
exports.movieGenresRelations = (0, drizzle_orm_1.relations)(exports.movieGenres, ({ one }) => ({
    movie: one(exports.movies, {
        fields: [exports.movieGenres.movieId],
        references: [exports.movies.id],
    }),
    genre: one(exports.genres, {
        fields: [exports.movieGenres.genreId],
        references: [exports.genres.id],
    }),
}));
