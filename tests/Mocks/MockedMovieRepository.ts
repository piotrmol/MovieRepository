import Movie from "../../src/models/Movie";
import { MovieRepository } from "../../src/repositories/MovieRepository";
import path from "path";
import { FileManagerImpl } from "../../src/utils/FileManager";
import MovieDatabase from "../../src/models/MovieDatabase";

export const MockedMovieRepository = jest.fn<MovieRepository, any>((shouldFail: boolean) => ({
    saveMovie(movie: Movie): Promise<void> {
        return shouldFail ? Promise.reject("I/O exception") : Promise.resolve();
    },

    getAllMovies(): Movie[] {
        const url = path.join(__dirname, "../Mocks/Json/MockedDb.json");
        const fileManager = new FileManagerImpl<MovieDatabase>(url);
        return fileManager.readContentOfFile().movies;
    },

    getAllGeneres(): string[] {
        return ["Comedy", "Horror", "Drama"];
    }
  }));