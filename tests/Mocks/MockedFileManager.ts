import MovieDatabase from "../../src/models/MovieDatabase";
import { FileManager } from "../../src/utils/FileManager";
import fs from "fs";
import path from "path";

export const MockedFileManager = jest.fn<FileManager<MovieDatabase>, any>((shouldFailReading: boolean = false, shouldFailWriting: boolean) => ({
    fileUrl: "",

    readContentOfFile(): MovieDatabase {
        if (shouldFailReading) {
            return null;
        } else {
            const url = path.join(__dirname, "../Mocks/Json/MockedDb.json");
            const data = fs.readFileSync(url).toString();
            const db: MovieDatabase = JSON.parse(data);
            return db;
        }
    }, 

    saveObjectToFile(object: MovieDatabase): Promise<void> {
        return shouldFailWriting ? Promise.reject("I/O exception") : Promise.resolve();
    },

}));