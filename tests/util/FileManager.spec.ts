import { FileManager, FileManagerImpl } from "../../src/util/FileManager";
import Movie from "../../src/model/Movie";
import os from "os";

const fsify = require("fsify")({
    cwd: os.tmpdir(),
    persistent: false,
    force: true
});

const data = new Movie(1, "test title", "test year", 123, [], "test director");
const structure = [
    {
        type: fsify.FILE,
        name: `filename${new Date().getTime()}`
    }
]

const getFileManager = async () => {
    const files = await fsify(structure);
    const fileUrl = files[0].name;
    return new FileManagerImpl<Movie>(fileUrl);
};

test('Saving object to file', async () => {
    const fileManager = await getFileManager();
    const movie = await fileManager.saveObjectToFile(data);

    expect(movie).toBeUndefined;
});

test('Reading file', async () => {
    const fileManager = await getFileManager();
    await fileManager.saveObjectToFile(data);

    const movie = await fileManager.readContentOfFile();
    expect(movie.id).toBe(data.id);
    expect(movie.title).toBe(data.title);
    expect(movie.runtime).toBe(data.runtime);
    expect(movie.genres.length).toBe(0);
    expect(movie.director).toBe(data.director);
});

test('Reading file exception, bad url', () => {
    const fileUrl = "fakeUrl";
    const fileManager = new FileManagerImpl<Movie>(fileUrl);

    expect(fileManager.readContentOfFile()).rejects.toMatch("ENOENT: no such file or directory, open 'fakeUrl'");
});