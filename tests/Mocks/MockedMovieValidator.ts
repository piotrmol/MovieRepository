import Movie from "../../src/models/Movie";
import { MovieValidator } from "../../src/utils/MovieValidator";

export const MockedMovieValidator = jest.fn<MovieValidator, any>((shouldFail: boolean) => ({
    validate(movie: Movie, genres: string[]): Promise<void> {
        return shouldFail ? Promise.reject("Title is required") : Promise.resolve();
    }
}));