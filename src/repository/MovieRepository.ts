import Movie from "../model/Movie"
import MovieDatabase from "../model/MovieDatabase";

interface MovieRepository {
    addMovie(movie: Movie);
    getAllMovies();
    getAllGeneres();
}

class MovieRepositoryImpl implements MovieRepository {
    
    private movieDatabse: MovieDatabase;

    constructor(private dbUrl: string) {
        
    }

    addMovie(movie: Movie) {

    }

    getAllMovies() {

    }

    getAllGeneres() {

    }
    
}

export { MovieRepository, MovieRepositoryImpl };