import UtilsContainer from "../../src/containters/UtilsContainer";
import Movie from "../../src/models/Movie";
import path from "path";

describe("MovieValidator tests", () => {
    
    it('Successfully validates movie', async () => {
        const movie = new Movie();
        movie.title = "title";
        movie.year = 123;
        movie.runtime = 123;
        movie.director = "director";
        movie.genres = ["Comedy", "Drama"];

        expect(validator.validate(movie, genres)).resolves.not.toThrow();
    });  
    
    it("Fails eight times with provided error messages", async () => {
        const movies = await getInvalidMovies();
        expect(movies.length).toBe(8);

        movies.forEach((movie) => {
            expect(validator.validate(movie, genres)).rejects.toMatch(/required|are not valid|cannot be longer/);
        });
    });

    const genres = ["Comedy", "Drama", "Science-Fiction"];
    const validator = UtilsContainer.getMovieValidator();

    const getInvalidMovies = ():Promise< Movie[]> => {
        const url = path.join(__dirname, "../Mocks/Json/InvalidMovies.json");
        const fileManager = UtilsContainer.getFileManager<Movie[]>(url);
        return fileManager.readContentOfFile();
    };

});