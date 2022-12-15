import fs from 'fs';
import Zlib from 'zlib';
import { checkAndMake } from '../services/checkAndMake.js';

class TransformFile {
    compress(path, arg) {
        const [firstArg, secondArg] = giveGoodArgs(arg);
        const pathToFile = firstArg;
        const pathToCreateFile = secondArg.split('.')[0];
        if (pathToFile.match(/[a-zA-Z]:\\/)) {
            checkAndMake(pathToFile.match(/[a-zA-Z]:\\/) ? pathToFile : path + pathToFile, () => {
                const correctPathToCreateNewFile = pathToCreateFile + pathToFile.split('\\').pop() + '.gz';
                const gZlib = Zlib.createGzip();
                fs.createReadStream(pathToFile).pipe(gZlib)
                .pipe(fs.createWriteStream(correctPathToCreateNewFile).on('error', err => {
                    if (err) console.log('Something went wrong! The error: ', err.message);
                }))
            })
            return;
        } 
    }
    decompress(path, arg) {
        const [firstArg, secondArg] = giveGoodArgs(arg);
        const pathToFile = firstArg + '.gz';
        const pathToCreateFile = secondArg.split(' ').slice(1).join(' ');
        if (pathToFile.match(/[a-zA-Z]:\\/)) {
            checkAndMake(pathToFile.match(/[a-zA-Z]:\\/) ? pathToFile : path + pathToFile, () => {
                const correctPathToCreateNewFile = pathToCreateFile + pathToFile.split('\\').pop().split('.').slice(0, -1).join('.');
                const unZlib = Zlib.createUnzip();
                const [readStream, writeStream] = [fs.createReadStream(pathToFile.match(/[a-zA-Z]:\\/) ? pathToFile : path + pathToFile), fs.createWriteStream(correctPathToCreateNewFile)];
                readStream.pipe(unZlib).pipe(writeStream);
            })
            return;
        } 
    }
}
function giveGoodArgs(arg) {
    const args = arg.split('.');
    const [first, second, third] = args;
    const firstRes = `${first}.${second.split(' ')[0]}`;
    const secondRes = `${second.split(' ').slice(1).join(' ')}.${third}`;
    return [firstRes, secondRes];
}

const transformFile = new TransformFile();

export {
    transformFile
}