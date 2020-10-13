import MovieDatabase from "../../src/models/MovieDatabase";
import { FileManager } from "../../src/utils/FileManager";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const MockedFileManager = jest.fn<FileManager<MovieDatabase>, any>((shouldFailReading: boolean = false, shouldFailWriting: boolean) => ({
    fileUrl: "",

    readContentOfFile(): MovieDatabase {
        if (shouldFailReading) {
            return null;
        } else {
            const url = path.join(__dirname, "../../", process.env.MOCK_DATABASE_URL);
            const data = fs.readFileSync(url).toString();
            const db: MovieDatabase = JSON.parse(data);
            return db;
        }
    }, 

    saveObjectToFile(object: MovieDatabase): Promise<void> {
        return shouldFailWriting ? Promise.reject("I/O exception") : Promise.resolve();
    },

}));