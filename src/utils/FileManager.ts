import fs from "fs";
import AppError from "../models/AppError";

interface FileManager<T> {
    readonly fileUrl: string;

    readContentOfFile(): T | null;
    saveObjectToFile(object: T): Promise<void>;
}

class FileManagerImpl<T> implements FileManager<T> {

    constructor(readonly fileUrl: string) {}

    readContentOfFile(): T | null {
        try {
            const data = fs.readFileSync(this.fileUrl);
            const object: T = JSON.parse(data.toString());
            return object;
        } catch (error) {
            return null;
        }
    }

    saveObjectToFile(object: T): Promise<void> {
        const json = JSON.stringify(object);
        return new Promise((resolve, reject) => {
            fs.writeFile(this.fileUrl, json, (error: NodeJS.ErrnoException) => {
                if(error) {
                    reject(error.message);
                } else {
                    resolve();
                }
            });
        });
    }

}

export { FileManager, FileManagerImpl };