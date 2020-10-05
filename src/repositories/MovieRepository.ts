import Movie from "../models/Movie"
import MovieDatabase from "../models/MovieDatabase";
import { FileManager, FileManagerImpl } from "../utils/FileManager";

interface MovieRepository {
    saveMovie(movie: Movie): Promise<void>;
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

    async saveMovie(movie: Movie): Promise<void> {
        return new Promise(async (resolve, rejects) => {
            const tempDatabase = this.movieDatabse;
            movie.id = this.getNextMovieId();
            tempDatabase.movies.push(movie);
            try {
                await this.fileManager.saveObjectToFile(tempDatabase);
                this.movieDatabse = tempDatabase;
                resolve();
            } catch(error) {
                rejects("Cannot save movie");
            }
        }); 
    }

    getAllMovies() {

    }

    getAllGeneres(): string[] {
        return this.movieDatabse.genres;
    }

    private getNextMovieId(): number {
        return this.movieDatabse.movies[this.movieDatabse.movies.length -1].id + 1;
    }
    
}

export { MovieRepository, MovieRepositoryImpl };