import Movie from "../../src/models/Movie";
import { MovieRepositoryImpl } from "../../src/repositories/MovieRepository";
import { MockedFileManager } from "../Mocks/MockedFileManager";

describe('Tests for persistence layer', () => {
    
    let movie: Movie;

    beforeAll(() => {
        movie = new Movie();
        movie.title = "title";
        movie.director = "director";
        movie.genres = [];
        movie.id = 1;
        movie.runtime = 123;
        movie.year = 123;
    });

    it("Throws save movie error. Number of movies doesn't change", async () => {
        const mockedFileManager = new MockedFileManager(false, true);
        const repository = new MovieRepositoryImpl(mockedFileManager);
        expect(repository.getAllMovies().length).toBe(2);

        await expect(repository.saveMovie(movie)).rejects.toBe("Cannot save movie");
        expect(repository.getAllMovies().length).toBe(2);
    });

    it("Saves movie. Number of movies changes", async () => {
        const mockedFileManager = new MockedFileManager(false, false);
        const repository = new MovieRepositoryImpl(mockedFileManager);
        expect(repository.getAllMovies().length).toBe(2);

        await expect(repository.saveMovie(movie)).resolves.toBe(undefined);
        expect(repository.getAllMovies().length).toBe(3);
    });

});