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

    findMovies(movies: Movie[], genres: string[]): Set<Movie> {
        const result = new Set<Movie>();

        const genresCombination = this.getGenresCombination(genres);

        genresCombination.forEach(combination => {
            movies.forEach(movie => {
                if (combination.every( el => movie.genres.includes(el))) {
                    result.add(movie);
                }
            });
        });

        return result;
    }

    private getGenresCombination(genres: string[]): string[][] {
        const result: string[][] = [];
        const genresQueue = new Queue<string[]>();

        result.push(genres);
        genresQueue.push(genres);

        while(!genresQueue.isEmpty()) {
            const subGenres = this.getAllGenresConbinations(genresQueue.pop());
            subGenres.forEach(subGenresArr => {
                result.push(subGenresArr);
                if (subGenresArr.length > 1) {
                    genresQueue.push(subGenresArr);
                }
            });
        }

        return this.getUniqueCombinations(result);
    }

    private getAllGenresConbinations(genres: string[]): string[][] {
        const result: string[][] = [];

        if (genres.length === 0){
            return result;
        } else if (genres.length === 1) {
            result.push(genres);
            return result;
        }

        let excluded = genres.length - 1;
        while (excluded !== -1) {
            const copy = [...genres];
            copy.splice(excluded, 1);
            result.push(copy);
            excluded --;
        }

        return result;
    }

    private getUniqueCombinations(combinations: string[][]): string[][] {
        const set  = new Set<string>(combinations.map(arr => JSON.stringify(arr)));
        const uniqueArray: string[][] = Array.from(set).map(arr => JSON.parse(arr));
        return uniqueArray;
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
