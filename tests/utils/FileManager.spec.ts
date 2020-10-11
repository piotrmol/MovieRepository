import { FileManagerImpl } from "../../src/utils/FileManager";
import Movie from "../../src/models/Movie";
import os from "os";
import UtilsContainer from "../../src/containters/UtilsContainer";

const fsify = require("fsify")({
    cwd: os.tmpdir(),
    persistent: false,
    force: true
});

describe("FileManager tests", () => {
    
    it('Saves object to file', async () => {
        const fileManager = await getFileManager();
        const movie = await fileManager.saveObjectToFile(getMovie());

        expect(movie).toBeUndefined;
    });

    it('Reads file and recives its content', async () => {
        const fileManager = await getFileManager();
        const data = getMovie();
        await fileManager.saveObjectToFile(data);

        const movie = fileManager.readContentOfFile();
        expect(movie.id).toBe(data.id);
        expect(movie.title).toBe(data.title);
        expect(movie.runtime).toBe(data.runtime);
        expect(movie.year).toBe(data.year);
        expect(movie.genres.length).toBe(0);
        expect(movie.director).toBe(data.director);
    });

    it('Throws becouse of bad url', () => {
        const fileUrl = "fakeUrl";
        const fileManager = new FileManagerImpl<Movie>(fileUrl);

        expect(fileManager.readContentOfFile()).toBeNull();
    });

    const structure = [
        {
            type: fsify.FILE,
            name: `filename${new Date().getTime()}`
        }
    ];
    
    const getFileManager = async () => {
        const files = await fsify(structure);
        const fileUrl = files[0].name;
        return UtilsContainer.getFileManager<Movie>(fileUrl);
    };

    const getMovie = (): Movie => {
        const movie = new Movie();
        movie.id = 1;
        movie.title = "test title";
        movie.runtime = 123;
        movie.year = 123;
        movie.genres = [];
        movie.director = "test director";
        return movie;
    };

});

