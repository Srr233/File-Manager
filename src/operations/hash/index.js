import crypto from 'crypto';
import fs from 'fs';
import { checkAndMake } from '../../services/checkAndMake.js';
import { isGoodPath } from '../../services/isGoodPath.js';

export function hash (path, filePath) {
    const goodFilePath = isGoodPath(filePath) ? filePath : path + filePath;
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

