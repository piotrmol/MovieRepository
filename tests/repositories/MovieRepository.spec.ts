import Movie from "../../src/models/Movie";
import { MovieRepository, MovieRepositoryImpl } from "../../src/repositories/MovieRepository";
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
        const repository = getMovieRepository(false, true);
        expect(repository.getAllMovies().length).toBe(4);

        await expect(repository.saveMovie(movie)).rejects.toBe("Cannot save movie");
        expect(repository.getAllMovies().length).toBe(4);
    });

    it("Saves movie. Number of movies changes", async () => {
        const repository = getMovieRepository();
        expect(repository.getAllMovies().length).toBe(4);

        await expect(repository.saveMovie(movie)).resolves.toBe(undefined);
        expect(repository.getAllMovies().length).toBe(5);
    });

    it("Returns list of four movies", () => {
        const repository = getMovieRepository();
        const movies = repository.getAllMovies();

        expect(movies.length).toBe(4);
        expect(movies[0].id).toBe(1);
        expect(movies[0].title).toBe("Beetlejuice");
    });

    it("Returns list of twenty one genres", () => {
        const repository = getMovieRepository();
        const genres = repository.getAllGeneres();

        expect(genres.length).toBe(21);
    });

    const getMovieRepository = (shouldFailReading: boolean = false, shouldFailWriting: boolean = false): MovieRepository => {
        const mockedFileManager = new MockedFileManager(shouldFailReading, shouldFailWriting);
        return new MovieRepositoryImpl(mockedFileManager);
    };

});