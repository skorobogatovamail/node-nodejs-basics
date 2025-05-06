import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const sourceFile = join(__dirname, 'files', 'fileToCompress.txt');
    const archiveFile = join(__dirname, 'files', 'archive.gz');

    const readStream = createReadStream(sourceFile);
    const writeStream = createWriteStream(archiveFile);
    const gzip = createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
        readStream.on('error', reject);
    });
};

await compress();