import express, { Request, Response } from "express";

const PORT = 3000;
const app = express();

app.get("/", (req: Request, resp: Response) => {
    resp.send("Hello The Software house");
});

app.listen(PORT, () => {
    console.log(`Application is listening: http://localhost:${PORT}`);
});