import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const decompress = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const archiveFile = join(__dirname, 'files', 'archive.gz');
    const outputFile = join(__dirname, 'files', 'fileToCompress.txt');

    const readStream = createReadStream(archiveFile);
    const writeStream = createWriteStream(outputFile);
    const gunzip = createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
        readStream.on('error', reject);
    });
};

await decompress();