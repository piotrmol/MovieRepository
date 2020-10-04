export default class AppError extends Error {
    
    readonly statusCode: number;

    constructor(message: string, statusCode?: number) {
        super();
        this.message = message;

        this.statusCode = (statusCode == null || statusCode == undefined) ? 500 : statusCode;
    }

}