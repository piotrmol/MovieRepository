import AppError from "../models/AppError";
import Movie from "../models/Movie";
import { MovieRepository } from "../repositories/MovieRepository";
import { DurationMovieFinder, GenresAndDurationMovieFinder, GenresMovieFinder, RandomMovieFinder } from "../utils/MovieFinder";
import { MovieValidator } from "../utils/MovieValidator";

interface MovieService {
    saveMovie(requestBody: any);
    getAllGenres(): string[];
    getMatchingMovies(genres?: string[], duration?: number): Movie[];
}

class MovieServiceImpl implements MovieService {

    constructor(private repository: MovieRepository, private movieValidator: MovieValidator){}

    async saveMovie(requestBody: any) {
        const movie = this.getMovieFromBody(requestBody);

        try {
            await this.movieValidator.validate(movie, this.getAllGenres());
        } catch (validationError) {
            throw new AppError(validationError, 400);
        }

        try {
            await this.repository.saveMovie(movie);
        } catch (writeError) {
            throw new AppError(writeError, 500);
        }
    }

    getAllGenres(): string[] {
        return this.repository.getAllGeneres();
    }

    getMatchingMovies(genres?: string[], duration?: number): Movie[] {
        const movies = this.repository.getAllMovies();
        let matchedMovies: Set<Movie>;

        if (genres && duration) {
            matchedMovies = new GenresAndDurationMovieFinder().findMovies(movies, genres, duration);
        } else if (duration) {
            matchedMovies = new DurationMovieFinder().findMovies(movies, duration);
        } else if (genres) {
            matchedMovies = new GenresMovieFinder().findMovies(movies, genres);
        } else {
            matchedMovies = new RandomMovieFinder().findMovies(movies);
        }

        return [...matchedMovies];
    }

    private getMovieFromBody(requestBody: any): Movie {
        const movie = new Movie();
        movie.title = requestBody.title;
        movie.year = requestBody.year;
        movie.runtime = requestBody.runtime;
        movie.genres = requestBody.genres;
        movie.director = requestBody.director;
        movie.actors = requestBody.actors;
        movie.plot = requestBody.plot;
        movie.posterUrl = requestBody.posterUrl;
        return movie;
    }

}

export { MovieService, MovieServiceImpl }