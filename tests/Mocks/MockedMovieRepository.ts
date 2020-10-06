import Movie from "../../src/models/Movie";
import { MovieRepository } from "../../src/repositories/MovieRepository";

export const MockedMovieRepository = jest.fn<MovieRepository, any>((shouldFail: boolean) => ({
    saveMovie(movie: Movie): Promise<void> {
        return shouldFail ? Promise.reject("I/O exception") : Promise.resolve();
    },

    getAllMovies() {

    },

    getAllGeneres(): string[] {
        return ["Comedy", "Horror", "Drama"];
    }
  }));