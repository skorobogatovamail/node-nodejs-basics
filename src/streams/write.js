import { dirname, join } from 'path'
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';

const write = async () => {
    const _dirname = dirname(fileURLToPath(import.meta.url))
    const filePath = join(_dirname, 'files', 'fileToWrite.txt');
    const stream = createWriteStream(filePath)

    process.stdin.pipe(stream);

    stream.on('error', (err) => {
        console.error('Error writing file:', err);
    });
};

await write();