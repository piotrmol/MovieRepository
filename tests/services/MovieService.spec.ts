import Movie from "../../src/models/Movie";
import { MovieService, MovieServiceImpl } from "../../src/services/MovieService";
import { MockedMovieRepository } from "../Mocks/MockedMovieRepository";
import { MockedMovieValidator } from "../Mocks/MockedMoviewValidator";

describe("MovieService tests", () => {

    it("Throws validation error", () => {
        const service = getService(false, true);
        const movie = getMovie();
        movie.title = null;

        expect(service.saveMovie(movie)).rejects.toThrow("Title is required");
    });

    it("Throws repository error", () => {
        const service = getService(true, false);
        const movie = getMovie();

        expect(service.saveMovie(movie)).rejects.toThrow("I/O exception");
    });

    it("Saves movie. Nothing is returned", () => {
        const service = getService(false, false);
        const movie = getMovie();

        expect(service.saveMovie(movie)).resolves.toBe(undefined);
    });

    it('Gets list of three available genres', () => {
        const service = getService(false, false);
        const genres = service.getAllGenres();

        expect(genres.length).toBe(3);
        expect(genres).toContain("Comedy");
        expect(genres).toContain("Horror");
        expect(genres).toContain("Drama");
    });

    const getService = (shouldRepositoryFail: boolean, shouldValidatorFail): MovieService => {
        const repository = new MockedMovieRepository(shouldRepositoryFail);
        const validator = new MockedMovieValidator(shouldValidatorFail);
        return new MovieServiceImpl(repository, validator);
    };

    const getMovie = (): Movie => {
        const movie = new Movie();
        movie.director = "director";
        movie.genres = [];
        movie.id = 1;
        movie.runtime = 123;
        movie.year = 123;
        movie.title = "title";
        return movie;
    };

});



