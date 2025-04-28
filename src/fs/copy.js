import { cp, access } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    try {
        const _dirname = dirname(fileURLToPath(import.meta.url))
        const sourcePath = join(_dirname, 'files')
        const destinationPath = join(_dirname, 'files_copy')

        try {
            await access(destinationPath)
            throw new Error('FS operation failed')
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        await cp(sourcePath, destinationPath, {
            recursive: true,
            force: false,
            errorOnExist: true,
        })
    } catch (error) {
        throw error
    }
};

await copy();
