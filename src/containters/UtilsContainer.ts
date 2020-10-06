import { FileManager, FileManagerImpl } from "../utils/FileManager";
import { MovieValidator, MovieValidatorImpl } from "../utils/MovieValidator";

export default class UtilsContainer {

    static getFileManager<T>(fileUrl: string): FileManager<T> {
        return new FileManagerImpl<T>(fileUrl);
    }

    static getMovieValidator(): MovieValidator {
        return new MovieValidatorImpl();
    }

}