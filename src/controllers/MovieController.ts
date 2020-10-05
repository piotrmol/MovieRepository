import { NextFunction, Request, Response } from "express";
import { MovieService } from "../services/MovieService";

export default class MovieController {

    constructor(private service: MovieService){}

    async saveMovie(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.service.saveMovie(req.body);
            resp.status(200);
            next();
        } catch(error) {
            next(error);
        }
    }

    async getMovies(req: Request, resp: Response, next: NextFunction) {

    }

    async getGenres(req: Request, resp: Response, next: NextFunction) {
        const genres = this.service.getAllGenres();
        resp.status(200).json(genres);
        next();
    }
    
}