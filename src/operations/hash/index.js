import crypto from 'crypto';
import fs from 'fs';
import { checkAndMake } from '../../services/checkAndMake.js';

export function hash (path, filePath) {
    const goodFilePath = filePath.match(/[a-zA-Z]:\\/) ? filePath : path + filePath;
    checkAndMake(goodFilePath, () => {
        fs.createReadStream(goodFilePath).on('data', chunk => {
            console.log(
                crypto
                .createHash('sha256')
                .update(chunk.toString())
                .digest('hex')
            );
        })
    })
}

