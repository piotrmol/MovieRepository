import validator from "class-validator";
import { MovieRepository } from "../repositories/MovieRepository";

interface MovieService {
    saveMovie(reqestBody: any);
    getAllGenres(): string[];
}

class MovieServiceImpl implements MovieService {

    constructor(private repository: MovieRepository){}
    
    async saveMovie(reqestBody: any) {

    }

    getAllGenres(): string[] {
        return this.repository.getAllGeneres();
    }

}

export { MovieService, MovieServiceImpl }