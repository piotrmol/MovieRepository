import Movie from "../models/Movie";
import Queue from "../models/Queue";

interface MovieFinder {
    findMovies(...args): Set<Movie>;
}

class GenresAndDurationMovieFinder {

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

    private getGenresCombination(genres: string[]): Array<Array<string>> {
        const result = new Array<Array<string>>();
        const genresQueue = new Queue<string[]>();

        result.push(genres);
        genresQueue.push(genres);
        
        while(!genresQueue.isEmpty()) {
            const subGenres = this.getAllGenresCombinationV2(genresQueue.pop());
            subGenres.forEach(subGenresArr => {
                result.push(subGenresArr);
                if (subGenresArr.length > 1) {
                    genresQueue.push(subGenresArr);
                }
            });
        }

        return this.getUniqueCombinations(result);
    }

    private getAllGenresCombinationV2(genres: string[]): Array<Array<string>> {
        const result = new Array<Array<string>>();

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

    private getUniqueCombinations(combinations: Array<Array<string>>): Array<Array<string>> {
        let set  = new Set<string>(combinations.map(arr => JSON.stringify(arr)));
        let uniqueArray: Array<Array<string>> = Array.from(set).map(arr => JSON.parse(arr));
        return uniqueArray;
    }

}

class DurationMovieFinder {

}

class RandomMovieFinder {
    
}

export { MovieFinder, GenresAndDurationMovieFinder, GenresMovieFinder, DurationMovieFinder, RandomMovieFinder };