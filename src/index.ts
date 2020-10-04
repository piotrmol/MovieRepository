import express, { NextFunction, Request, Response } from "express";
import { handleError } from "./middleware/ErrorHandlerMiddleware";
import AppError from "./model/AppError";

const PORT = 3000;
const app = express();

app.get("/", (req: Request, resp: Response) => {
    resp.send("Hello The Software house");
});

// To working properly must be the last one middleware
app.use((err: AppError | Error, req: Request, resp: Response, next: NextFunction) => {
    handleError(err, resp);
})

app.listen(PORT, () => {
    console.log(`Application is listening: http://localhost:${PORT}`);
});