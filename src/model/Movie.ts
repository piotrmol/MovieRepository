
export default class Movie {

    constructor(
        readonly id: number,
        readonly title: string,
        readonly year: string,
        readonly runtime: number,
        readonly genres: string[],
        readonly director: string,
        readonly actors?: string,
        readonly plot?: string,
        readonly posterUrl?: string,
    ) {}

}