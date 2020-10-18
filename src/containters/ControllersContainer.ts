import MovieController from "../controllers/MovieController";
import ServiceContainer from "./ServicesContainer";

export default class ControllerContainer {

    static getMovieController(): MovieController {
        const service = ServiceContainer.getMovieService();
        return new MovieController(service);
    }

}