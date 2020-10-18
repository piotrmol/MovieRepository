import MovieDatabase from "../models/MovieDatabase";
import { MovieRepository, MovieRepositoryImpl } from "../repositories/MovieRepository";
import UtilsContainer from "./UtilsContainer";
import path from "path"

export default class RepositoryContainer {

    static getMovieRepository(): MovieRepository {
        const url = path.join(__dirname, "../../", process.env.DATABESE_URL);
        const fileManager = UtilsContainer.getFileManager<MovieDatabase>(url);
        return new MovieRepositoryImpl(fileManager);
    }

}