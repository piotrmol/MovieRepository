import MovieDatabase from "../../src/models/MovieDatabase";
import { FileManagerImpl } from "../../src/utils/FileManager";
import { DurationMovieFinder, GenresAndDurationMovieFinder, GenresMovieFinder, RandomMovieFinder } from "../../src/utils/MovieFinder";
import path from "path";

describe("MovieFinder tests", () => {

    let movieDatabase: MovieDatabase;

    beforeAll( () => {
        const url = path.join(__dirname, "../Mocks/Json/MockedDb.json");
        const fileManager = new FileManagerImpl<MovieDatabase>(url);
        movieDatabase = fileManager.readContentOfFile();
    });

    describe("GenresAndDurationMovieFinder tests", () => {
        const movieFinder = new GenresAndDurationMovieFinder();

        it("Finds mached movies by given genres and duration", () => {
            const tests = [
                { genres: ["Crime", "Drama"], duration: 132, length: 2, ids: [2,3] },
                { genres: ["Comedy"], duration: 107, length: 2, ids: [4,1] },
                { genres: ["Crime", "Drama", "Comedy"], duration: 1000, length: 4, ids: [2,3,1,4] }
            ];

            for(let i = 0; i < tests.length; i++) {
                const movies = movieFinder.findMovies(movieDatabase.movies, tests[i].genres, tests[i].duration);
                expect(movies.size).toBe(tests[i].length);

                const iterator = movies.values();
                for(let j = 0; j < tests[i].ids.length; j++) {
                    const movie = iterator.next().value;
                    expect(movie.id).toBe(tests[i].ids[j]);
                }
            }
        });

        it("Returns empty set", () => {
            const emptyGenresMatch = movieFinder.findMovies(movieDatabase.movies, [], 120);
            const noExisitingGenresMatch = movieFinder.findMovies(movieDatabase.movies, ["NotExisting"], 120);
            expect(emptyGenresMatch.size).toBe(0);
            expect(noExisitingGenresMatch.size).toBe(0);
        });

    });

    describe("GenresMovieFinder tests", () => {
        const movieFinder = new GenresMovieFinder();

        it('Finds mached movies by given genres', () => {
            const tests = [
                { genres: ['Comedy', 'Fantasy'], length: 2, ids: [1,4] },
                { genres: ['Crime', 'Drama'], length: 2, ids: [2,3] },
                { genres: ['Adventure'], length: 1, ids: [4] },
                { genres: ['Comedy', 'Crime', 'Music'], length: 4, ids: [2,1,4,3] },
            ];

            for(let i = 0; i < tests.length; i++) {
                const movies = movieFinder.findMovies(movieDatabase.movies, tests[i].genres);
                expect(movies.size).toBe(tests[i].length);

                const iterator = movies.values();
                for(let j = 0; j < tests[i].ids.length; j++) {
                    const movie = iterator.next().value;
                    expect(movie.id).toBe(tests[i].ids[j]);
                }
            }

        });

        it("Returns empty set for no matches", () => {
            const movies = movieFinder.findMovies(movieDatabase.movies, ["NotExistingOne", "Tests", "123456668"]);
            expect(movies.size).toBe(0);
        });

    });

    describe("DurationMovieFinder tests", () => {
        const movieFinder = new DurationMovieFinder();

        it("Returns set with signe element - movie with runtime in accurate range", () => {
            const tests = [ 
                { duration: 100, ids: [1,4] },
                { duration: 117, ids: [2] },
                { duration: 152, ids: [3] }
             ];

             for(let i = 0; i < tests.length; i++) {
                const movies = movieFinder.findMovies(movieDatabase.movies, tests[i].duration);
                expect(movies.size).toBe(1);
                expect(tests[i].ids).toContain(movies.values().next().value.id);
             }
        });

        it("Returns empty set", () => {
            const movies = movieFinder.findMovies(movieDatabase.movies, 500);
            expect(movies.size).toBe(0);
        });

    });

    describe("RandomMovieFinder tests", () => {
        const movieFinder = new RandomMovieFinder();

        it("Returns set with single random movie", () => {
            const movies = movieFinder.findMovies(movieDatabase.movies);
            expect(movies.size).toBe(1);
            expect(movieDatabase.movies).toContain(movies.values().next().value);
        });

    });

});