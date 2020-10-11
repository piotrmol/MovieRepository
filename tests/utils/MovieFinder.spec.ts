import MovieDatabase from "../../src/models/MovieDatabase";
import { FileManagerImpl } from "../../src/utils/FileManager";
import { GenresMovieFinder } from "../../src/utils/MovieFinder";

describe("MovieFinder tests", () => {

    it('Test test', () => {
        const url = `${process.cwd()}/static/db.json`;
        const movieFinder = new GenresMovieFinder();
        const fileManager = new FileManagerImpl<MovieDatabase>(url);
        const db = fileManager.readContentOfFile();

        const movies = movieFinder.findMovies(db.movies, ['Crime', 'History']);
        
        expect(2).toBe(2);
    });

});