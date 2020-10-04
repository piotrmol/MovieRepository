import { IsNotEmpty, MaxLength } from "class-validator";

export default class Movie {

    readonly id: number;

    @IsNotEmpty({
        message: "Title is required"
    })
    @MaxLength(255, {
        message: "Title cannot be longer than 255 characters"
    })
    readonly title: string;

    @IsNotEmpty({
        message: "Year is required"
    })
    readonly year: number;

    @IsNotEmpty({
        message: "Runtime is required"
    })
    readonly runtime: number;

    @IsNotEmpty({
        message: "Genres is required"
    })
    readonly genres: string[];

    @IsNotEmpty({
        message: "Director is required"
    })
    @MaxLength(255, {
        message: "Director cannot be longer than 255 characters"
    })
    readonly director: string;

    readonly actors?: string;
    readonly plot?: string;
    readonly posterUrl?: string;

    constructor(
        id: number,
        title: string,
        year: number,
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