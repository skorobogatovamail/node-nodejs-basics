import { rename as fsRename, access } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


const rename = async () => {
    try {
        const _dirname = dirname(fileURLToPath(import.meta.url))
        const wrongFilename = join(_dirname, 'files', 'wrongFilename.txt')
        const properFilename = join(_dirname, 'files', 'wrongFilename.md')

        await access(wrongFilename);

        try {
            await access(properFilename);
            throw new Error('FS operation failed')
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        await fsRename(wrongFilename, properFilename);
    }
    catch (error) {
        if (error.code === 'ENOENT' || error.message === 'FS operation failed') {
            throw new Error('FS operation failed')
        }
        throw error;
    }
};

await rename();