import { Response } from "express";
import AppError from "../models/AppError";

export const handleError = (error: AppError | Error, resp: Response)  => {
    let message = "Internal server error";
    let statusCode = 500;
    if (error instanceof AppError)  {
        statusCode = error.statusCode;
        message = error.message;
    }
    resp.status(statusCode).json({
        status: "error",
        statusCode: statusCode,
        message: message
    });
}