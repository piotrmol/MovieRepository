import { IsNotEmpty, MaxLength } from "class-validator";

export default class Movie {

    id: number;

    @IsNotEmpty({
        message: "Title is required"
    })
    @MaxLength(255, {
        message: "Title cannot be longer than 255 characters"
    })
    title: string;

    @IsNotEmpty({
        message: "Year is required"
    })
    year: number;

    @IsNotEmpty({
        message: "Runtime is required"
    })
    runtime: number;

    @IsNotEmpty({
        message: "Genres is required"
    })
    genres: string[];

    @IsNotEmpty({
        message: "Director is required"
    })
    @MaxLength(255, {
        message: "Director cannot be longer than 255 characters"
    })
    director: string;

    actors?: string;
    plot?: string;
    posterUrl?: string;

}