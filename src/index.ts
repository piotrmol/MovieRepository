import express, { NextFunction, Request, Response } from "express";
import { handleError } from "./middlewares/ErrorHandlerMiddleware";
import AppError from "./models/AppError";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import RoutersContainer from "./containters/RoutersContainer";

dotenv.config();

(() => {
    const PORT = process.env.PORT;
    const app = express();

    app.use(helmet({
        hsts: false
    }));
    app.use(bodyParser.json());

    const router = RoutersContainer.getAppRouter();
    router.setupRoutes();
    app.use(router.router);

    // To working properly must be the last one middleware
    app.use((err: AppError | Error, req: Request, resp: Response, next: NextFunction) => {
        handleError(err, resp);
    });

    app.listen(PORT, () => {
        console.log(`Application is listening: http://localhost:${PORT}`);
    });

})();

