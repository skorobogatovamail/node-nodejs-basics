import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const content = 'I am fresh and young';
    const _dirname = dirname(fileURLToPath(import.meta.url))
    console.log(_dirname)
    const fileName = join(_dirname, 'files', 'fresh.txt')

    try {
        await writeFile(fileName, content, { flag: 'wx' });
    } catch (error) {
        if (error.code === 'EEXIST') {
            throw new Error('FS operation failed')
        }
        throw error
    }
};

await create();