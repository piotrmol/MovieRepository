import Movie from "../models/Movie";
import {Validator} from "class-validator";

interface MovieValidator {
    validate(movie: Movie, genres: string[]): Promise<void>;
}

class MovieValidatorImpl implements MovieValidator {

    async validate(movie: Movie, genres: string[]): Promise<void> {
        return new Promise(async (resolve, rejects) => {
            try {
                await new Validator().validateOrReject(movie);
                this.hasAvailableGenres(movie, genres) ? resolve() : rejects("Genres are not valid")
            } catch(errors) {
                const message = errors
                    .map(error  => {
                        const values = Object.values(error.constraints);
                        return values.join(". ");
                    })
                    .reduce((priev, next) => priev + "\n" + next);
                rejects(message);
            }
        });
    }

    private hasAvailableGenres(movie: Movie, genres: string[]): boolean {
        return movie.genres
            .map(el => genres.includes(el))
            .reduce((priev, next) => priev && next);
    }
    
}

export { MovieValidator, MovieValidatorImpl }