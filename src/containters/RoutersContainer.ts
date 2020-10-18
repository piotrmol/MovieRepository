import AppRouter from "../routes/AppRouter";
import ControllerContainer from "./ControllersContainer";

export default class RoutersContainer {

    static getAppRouter() {
        const movieController = ControllerContainer.getMovieController();
        return new AppRouter(movieController);
    }

}