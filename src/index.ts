import express, { NextFunction, Request, Response } from "express";
import MoviewController from "./controllers/MovieController";
import { handleError } from "./middlewares/ErrorHandlerMiddleware";
import AppError from "./models/AppError";
import { MovieRepositoryImpl } from "./repositories/MovieRepository";
import AppRouter from "./routes/AppRouter";
import { MovieServiceImpl } from "./services/MovieService";
import { MovieValidatorImpl } from "./utils/MovieValidator";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

(async => {
    app.get("/", (req: Request, resp: Response) => {
        resp.send("Hello The Software house");
    });
    
    // To refactor, apply DI
    const url = `${process.cwd()}/static/db.json`;
    const repository = new MovieRepositoryImpl(url);
    const service = new MovieServiceImpl(repository, new MovieValidatorImpl());
    const controller = new MoviewController(service);
    // *********
    
    const router = new AppRouter(controller);
    router.setupRoutes();
    
    app.use(router.router);
    
    // To working properly must be the last one middleware
    app.use((err: AppError | Error, req: Request, resp: Response, next: NextFunction) => {
        handleError(err, resp);
    })
    
    app.listen(PORT, () => {
        console.log(`Application is listening: http://localhost:${PORT}`);
    });
})();

