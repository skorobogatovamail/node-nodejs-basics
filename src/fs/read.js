import { access, readFile } from 'fs/promises';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';


const read = async () => {
    try {
        const _dirname = dirname(fileURLToPath(import.meta.url))
        const fileToRead = join(_dirname, 'files', 'fileToRead.txt')

        await access(fileToRead)

        const fileContent = await readFile(fileToRead, { encoding: 'utf-8' })
        console.log(fileContent)
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation faile')
        }
        throw error
    }

};

await read();