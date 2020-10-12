import MovieDatabase from "../../src/models/MovieDatabase";
import { FileManagerImpl } from "../../src/utils/FileManager";
import { GenresMovieFinder } from "../../src/utils/MovieFinder";
import path from "path";

describe("MovieFinder tests", () => {

    it('Finds mached movies by given genres', () => {
        const url = path.join(__dirname, "../Mocks/Json/MockedDb.json");
        const movieFinder = new GenresMovieFinder();
        const fileManager = new FileManagerImpl<MovieDatabase>(url);
        const db = fileManager.readContentOfFile();

        const tests = [
            { genres: ['Comedy', 'Fantasy'], length: 2, ids: [1,4] },
            { genres: ['Crime', 'Drama'], length: 2, ids: [2,3] },
            { genres: ['Adventure'], length: 1, ids: [4] },
            { genres: ['Comedy', 'Crime', 'Music'], length: 4, ids: [2,1,4,3] },
        ]


        for(let i = 0; i < tests.length; i++) {
            const movies = movieFinder.findMovies(db.movies, tests[i].genres);
            expect(movies.size).toBe(tests[i].length);

            const iterator = movies.values();
            for(let j = 0; j < tests[i].ids.length; j++) {
                const movie = iterator.next().value;
                expect(movie.id).toBe(tests[i].ids[j]);
            }
        }

    });

    it('Returns empty set for no matches', () => {
        const url = path.join(__dirname, "../Mocks/Json/MockedDb.json");
        const movieFinder = new GenresMovieFinder();
        const fileManager = new FileManagerImpl<MovieDatabase>(url);
        const db = fileManager.readContentOfFile();

        const movies = movieFinder.findMovies(db.movies, ["NotExistingOne", "Tests", "123456668"]);
        expect(movies.size).toBe(0);
    });

});