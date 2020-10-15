import Movie from "../models/Movie";
import Queue from "../models/Queue";

interface MovieFinder {
    findMovies(...args): Set<Movie>;
}

class GenresAndDurationMovieFinder implements MovieFinder {

    findMovies(movies: Movie[], genres: string[], duration: number): Set<Movie> {
        if(genres.length === 0) {
            return new Set();
        }

        const bestMatches = movies.filter((movie) => {
            const machedGenres = genres.every(gen => movie.genres.includes(gen));
            return movie.runtime >= duration -10 && movie.runtime <= duration + 10 && machedGenres;
        });

        const genresMovieFinder = new GenresMovieFinder();
        const genresMaches = genresMovieFinder.findMovies(movies, genres);
        const machedMovies = [...bestMatches, ...genresMaches];

        return new Set<Movie>(machedMovies);
    }

}

class GenresMovieFinder implements MovieFinder {


    findMovies(movies: Movie[], genres: string[]): Set<Movie>  {
        const movieMaches = this.calculateMatchesPerMovie(movies, genres);
        const sortedAndFilteredMatches = this.sortAndFilterMatches(movieMaches);
        return new Set<Movie>(sortedAndFilteredMatches.map(match => match.movie));
    }

    private calculateMatchesPerMovie(movies: Movie[], genres: string[]): GenresMovieFinder.MovieGenresMatch[] {
        return movies.map(movie => {
            let matches = 0;
            for(const genre of genres) {
                if( movie.genres.includes(genre)) {
                    matches ++;
                }
            }
            return new GenresMovieFinder.MovieGenresMatch(movie, matches);
        });
    }

    private sortAndFilterMatches(matches: GenresMovieFinder.MovieGenresMatch[]): GenresMovieFinder.MovieGenresMatch[] {
        return matches
            .filter(match => match.matches > 0)
            .sort((priev, next) => next.matches - priev.matches);
    }
    
}

namespace GenresMovieFinder {
    export class MovieMatch {
        constructor(public id: number, public matches: number) {}
    }

    export class MovieGenresMatch {
        constructor(public movie: Movie, public matches: number) {}
    }
}

class DurationMovieFinder implements MovieFinder {

    findMovies(movies: Movie[], duration: number): Set<Movie> {
        const result = new Set<Movie>();
        const mached = movies.filter(movie => movie.runtime >= duration - 10 &&  movie.runtime <= duration + 10 );
        const randomMovie = mached[Math.floor(Math.random() * mached.length)];

        if (randomMovie) {
            result.add(randomMovie);
        }

        return result;
    }

}

class RandomMovieFinder implements MovieFinder{

    findMovies(movies: Movie[]): Set<Movie> {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];

        return new Set<Movie>().add(randomMovie);
    }

}

export { MovieFinder, GenresAndDurationMovieFinder, GenresMovieFinder, DurationMovieFinder, RandomMovieFinder };
