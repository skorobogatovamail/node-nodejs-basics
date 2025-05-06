import { dirname, join } from 'path'
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';

const read = async () => {
    const _dirname = dirname(fileURLToPath(import.meta.url))
    const filePath = join(_dirname, 'files', 'fileToRead.txt');
    const stream = createReadStream(filePath, { encoding: 'utf8' })

    stream.pipe(process.stdout);

    stream.on('error', (err) => {
        console.error('Error reading file:', err);
    });
};

await read();