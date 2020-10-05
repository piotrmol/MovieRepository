import { MovieServiceImpl } from "../../src/services/MovieService";
import { MovieRepository } from "../../src/repositories/MovieRepository";
import Movie from "../../src/models/Movie";
import { MovieValidatorImpl } from "../../src/utils/MovieValidator";


class MockMovieRepository implements MovieRepository{
    saveMovie(movie: Movie): Promise<void> {
        return Promise.reject();
    }
    getAllMovies() {

    }

    getAllGeneres(): string[] {
        return ["Comedy", "Horror", "Drama"];
    }
}


test('Getting list of all available genres', () => {
    const service = new MovieServiceImpl(new MockMovieRepository(), new MovieValidatorImpl());
    const genres = service.getAllGenres()

    expect(genres.length).toBe(3);
    expect(genres).toContain("Comedy");
    expect(genres).toContain("Horror");
    expect(genres).toContain("Drama");
});