import Movie from "../models/Movie"
import MovieDatabase from "../models/MovieDatabase";
import { FileManager, FileManagerImpl } from "../utils/FileManager";

interface MovieRepository {
    saveMovie(movie: Movie);
    getAllMovies();
    getAllGeneres(): string[];
}

class MovieRepositoryImpl implements MovieRepository {
    
    private movieDatabse: MovieDatabase = new MovieDatabase();
    private fileManager: FileManager<MovieDatabase>;

    constructor(private dbUrl: string) {
        this.fileManager = new FileManagerImpl(dbUrl);
        this.fileManager.readContentOfFile()
            .then((db: MovieDatabase) => {
                this.movieDatabse = db;
                console.log("Database connected");
            }).catch((error: Error) => {
                console.log(error);
            });
    }

    saveMovie(movie: Movie) {

    }

    getAllMovies() {

    }

    getAllGeneres(): string[] {
        return this.movieDatabse.genres;
    }
    
}

export { MovieRepository, MovieRepositoryImpl };