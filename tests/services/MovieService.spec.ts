import Movie from "../../src/models/Movie";
import { MovieService, MovieServiceImpl } from "../../src/services/MovieService";
import { MockedMovieRepository } from "../Mocks/MockedMovieRepository";
import { MockedMovieValidator } from "../Mocks/MockedMovieValidator";

describe("MovieService tests", () => {

    let movie: Movie;

    beforeAll(() => {
        movie = new Movie();
        movie.director = "director";
        movie.genres = [];
        movie.id = 1;
        movie.runtime = 123;
        movie.year = 123;
        movie.title = "title";
    });

    it("Throws validation error", async () => {
        const service = getService(false, true);
        movie.title = null;

        await expect(service.saveMovie(movie)).rejects.toThrow("Title is required");
    });

    it("Throws repository error", async () => {
        const service = getService(true, false);
        await expect(service.saveMovie(movie)).rejects.toThrow("I/O exception");
    });

    it("Saves movie. Nothing is returned", () => {
        const service = getService();
        expect(service.saveMovie(movie)).resolves.toBe(undefined);
    });

    it('Gets list of three available genres', () => {
        const service = getService();
        const genres = service.getAllGenres();

        expect(genres.length).toBe(3);
        expect(genres).toContain("Comedy");
        expect(genres).toContain("Horror");
        expect(genres).toContain("Drama");
    });

    it("Should gets list of mached movies for given genres and duration", () => {
        const service = getService();
        const genres = ["Comedy", "Adventure"];
        const duration = 107;

        const movies = service.getMatchingMovies(genres, duration);
        expect(movies.length).toBe(2);
        expect(movies[0].id).toBe(4);
        expect(movies[1].id).toBe(1);
    });

    it("Should gets list with single random movie for given duration", () => {
        const service = getService();
        const duration = 130;

        const movies = service.getMatchingMovies(null, duration);
        const movieDuration = parseInt(movies[0].runtime as any);

        expect(movies.length).toBe(1);
        expect([2,3]).toContain(movies[0].id);
        expect(movieDuration).toBeGreaterThanOrEqual(duration - 10);
        expect(movieDuration).toBeLessThanOrEqual(duration + 10);
    });

    it("Should gets list of movies for given genres", () => {
        const service = getService();
        const genres = ["Comedy", "Crime"];

        const movies = service.getMatchingMovies(genres, null);

        expect(movies.length).toBe(4);
        expect(movies[0].id).toBe(1);
        expect(movies[1].id).toBe(4);
        expect(movies[2].id).toBe(2);
        expect(movies[3].id).toBe(3);
    });

    it("Should gets list with single random movie for no paramters provided", () => {
        const service = getService();
        const movies = service.getMatchingMovies(null, null);

        expect(movies.length).toBe(1);
    });

    const getService = (shouldRepositoryFail: boolean = false, shouldValidatorFail: boolean = false): MovieService => {
        const repository = new MockedMovieRepository(shouldRepositoryFail);
        const validator = new MockedMovieValidator(shouldValidatorFail);
        return new MovieServiceImpl(repository, validator);
    };

});



