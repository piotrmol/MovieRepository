import Movie from "../models/Movie"
import MovieDatabase from "../models/MovieDatabase";
import { FileManager } from "../utils/FileManager";

interface MovieRepository {
    saveMovie(movie: Movie): Promise<void>;
    getAllMovies(): Movie[];
    getAllGeneres(): string[];
}

class MovieRepositoryImpl implements MovieRepository {

    private movieDatabse: MovieDatabase = new MovieDatabase();

    constructor(private fileManager: FileManager<MovieDatabase>) {
        this.setupDatabase();
    }

    async saveMovie(movie: Movie): Promise<void> {
        return new Promise(async (resolve, rejects) => {
            const tempDatabase = {genres: [...this.movieDatabse.genres], movies: [...this.movieDatabse.movies]};
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

    getAllMovies(): Movie[] {
        return this.movieDatabse.movies;
    }

    getAllGeneres(): string[] {
        return this.movieDatabse.genres;
    }

    private setupDatabase() {
        const movieDatabse = this.fileManager.readContentOfFile();

        if (movieDatabse) {
            this.movieDatabse = movieDatabse;
            console.log("Connected to database");
        } else {
            console.log("Cannot connect to database");
            // TODO exit process in production mode
            // process.exit(0);
        }
    }

    private getNextMovieId(): number {
        return this.movieDatabse.movies[this.movieDatabse.movies.length -1].id + 1;
    }

}

export { MovieRepository, MovieRepositoryImpl };