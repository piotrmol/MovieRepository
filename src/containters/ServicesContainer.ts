import { MovieService, MovieServiceImpl } from "../services/MovieService";
import RepositoryContainer from "./RepositoriesContainer";
import UtilsContainer from "./UtilsContainer";

export default class ServiceContainer {

    static getMovieService(): MovieService {
        const repository = RepositoryContainer.getMovieRepository();
        const validator = UtilsContainer.getMovieValidator();
        return new MovieServiceImpl(repository, validator);
    }

}