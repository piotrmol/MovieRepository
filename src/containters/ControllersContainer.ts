import MovieController from "../controllers/MovieController";
import ServiceContainer from "./ServicesContainer";

export default class ControllerContainer {

    static async getMovieController(): Promise<MovieController> {
        const service = await ServiceContainer.getMovieService();
        return new MovieController(service);
    }

}