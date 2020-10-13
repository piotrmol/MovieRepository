import UtilsContainer from "../../src/containters/UtilsContainer";
import Movie from "../../src/models/Movie";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

describe("MovieValidator tests", () => {

    const genres = ["Comedy", "Drama", "Science-Fiction"];
    const validator = UtilsContainer.getMovieValidator();
    
    it('Successfully validates movie', async () => {
        const movie = new Movie();
        movie.title = "title";
        movie.year = 123;
        movie.runtime = 123;
        movie.director = "director";
        movie.genres = ["Comedy", "Drama"];

        await expect(validator.validate(movie, genres)).resolves.not.toThrow();
    });  
    
    it("Fails eight times with provided error messages", async () => {
        const movies = getInvalidMovies();
        expect(movies.length).toBe(8);

        movies.forEach((movie) => {
            expect(validator.validate(movie, genres)).rejects.toMatch(/required|are not valid|cannot be longer/);
        });
    });

    const getInvalidMovies = (): Movie[] => {
        const url = path.join(__dirname, "../../", process.env.INVALID_MOVIES_URL);
        const fileManager = UtilsContainer.getFileManager<Movie[]>(url);
        return fileManager.readContentOfFile();
    };

});