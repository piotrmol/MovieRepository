
export default class Movie {
    id: number;
    title: string;
    year: string;
    runtime: number;
    genres: string[];
    director: string;
    actors?: string;
    plot?: string;
    posterUrl?: string;

    constructor(
        id: number,
        title: string,
        year: string,
        runtime: number,
        genres: string[],
        director: string,
        actors?: string,
        plot?: string,
        posterUrl?: string,
    ) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.genres = genres;
        this.director = director;
        this.actors = actors;
        this.plot = plot;
        this.posterUrl = posterUrl;
    }

}