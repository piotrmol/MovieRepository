import { MovieRepository, MovieRepositoryImpl } from "../../src/repository/MovieRepository";

describe('Tests for persistence layer', () => {
    
    let repository: MovieRepository;

    beforeEach(() => {
        repository = new MovieRepositoryImpl("test");
    });    

    afterAll(() => {
        repository = null;
    });

    test('Repository contains list of movies', () => {
        expect(repository.movies).not.toBe(null);
    });

});