import { dirname, join } from 'path'
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

const calculateHash = async () => {
    return new Promise((resolve, reject) => {
        try {
            const _dirname = dirname(fileURLToPath(import.meta.url))
            const filePath = join(_dirname, 'files', 'fileToCalculateHashFor.txt')
            const hash = createHash('sha256');
            const stream = createReadStream(filePath)

            stream.on('data', (chunk) => {
                hash.update(chunk);
            });

            stream.on('end', () => {
                const hexHash = hash.digest('hex');
                console.log(hexHash);
                resolve(hexHash)
            });

            stream.on('error', (error) => {
                reject(error)
            });

        } catch (error) {
            reject(error)
        }
    })


};

await calculateHash();