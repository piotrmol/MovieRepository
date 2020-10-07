import { url } from "inspector";
import MovieDatabase from "../models/MovieDatabase";
import { MovieRepository, MovieRepositoryImpl } from "../repositories/MovieRepository";
import UtilsContainer from "./UtilsContainer";

export default class RepositoryContainer {

    static getMovieRepository(): Promise<MovieRepository> {
        const url = `${process.cwd()}/static/db.json`;
        const fileManager = UtilsContainer.getFileManager<MovieDatabase>(url);
        return MovieRepositoryImpl.createMovieRepository(fileManager);
    }

}