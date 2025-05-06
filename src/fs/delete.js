import { dirname, join } from 'path'
import { fileURLToPath } from 'url';
import { unlink, access } from 'fs/promises'

const remove = async () => {
    try {
        const _dirname = dirname(fileURLToPath(import.meta.url))
        const fileToRemove = join(_dirname, 'files', 'fileToRemove.txt')

        await access(fileToRemove);
        await unlink(fileToRemove);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed')
        }
        throw error
    }
};

await remove();