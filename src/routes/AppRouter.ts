import { Router } from "express";
import MovieController from "../controllers/MovieController";

export default class AppRouter {

    router = Router();

    constructor(
        private movieController: MovieController
    ) {}

    setupRoutes() {
        this.router.get("/genres", this.movieController.getGenres.bind(this.movieController));
        this.router.post("/movie", this.movieController.saveMovie.bind(this.movieController));
    }

}