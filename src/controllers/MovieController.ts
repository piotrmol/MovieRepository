import { NextFunction, Request, Response } from "express";
import { MovieService } from "../services/MovieService";

export default class MovieController {

    constructor(private service: MovieService){}

    async saveMovie(req: Request, resp: Response, next: NextFunction) {
        try {
            console.log(req);
            await this.service.saveMovie(req.body);
            resp.sendStatus(200);
            next();
        } catch(error) {
            next(error);
        }
    }

    async getMovies(req: Request, resp: Response, next: NextFunction) {
        let genres: string[];
        let duration: number;

        const genresQuery = req.query.genres as string;
        const durationQuery = req.query.duration as string;
        if (genresQuery) {
            genres = genresQuery.split(",");
        }
        if(durationQuery) {
            duration = parseInt(durationQuery, 10);
        }

        const movies = this.service.getMatchingMovies(genres, duration);
        resp.status(200).json(movies);
    }

    async getGenres(req: Request, resp: Response, next: NextFunction) {
        const genres = this.service.getAllGenres();
        resp.status(200).json(genres);
        next();
    }

}