import { rejects } from "assert";
import fs from "fs";

interface FileManager<T> {
    readonly fileUrl: string;

    readContentOfFile(): Promise<T>;
    saveObjectToFile(object: T): Promise<void>;
}

class FileManagerImpl<T> implements FileManager<T> {

    constructor(readonly fileUrl: string) {}

    readContentOfFile(): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileUrl, (error: NodeJS.ErrnoException, data: Buffer) => {
                if (error) reject(error.message);
                const object: T = JSON.parse(data.toString());

                resolve(object);
            });
        });
    }

    saveObjectToFile(object: T): Promise<void> {
        const json = JSON.stringify(object);
        return new Promise((resolve, reject) => {
            fs.writeFile(this.fileUrl, json, (error: NodeJS.ErrnoException) => {
                if (error) reject(error.message);
                resolve();
            });
        });
    }

}

export { FileManager, FileManagerImpl };