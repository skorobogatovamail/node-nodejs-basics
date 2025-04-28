import { access, readdir } from 'fs/promises';
import { join, dirname } from 'path'
import { fileURLToPath } from 'url';

const list = async () => {
    try {
        const _dirname = dirname(fileURLToPath(import.meta.url))
        const pathToList = join(_dirname, 'files')

        await access(pathToList)

        const files = await readdir(pathToList)
        console.log(files)

    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed')
        }
    }
};

await list();