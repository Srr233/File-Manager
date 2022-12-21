import fs from 'fs';
import pathM from 'path';
import { checkAndMake } from '../services/checkAndMake.js';
import { isGoodPath } from '../services/isGoodPath.js';
class BasicOperation {
    cat(path) {
        const readableStream = fs.createReadStream(path);
        readableStream.pipe(process.stdout);
        readableStream.on('error', () => console.log('Something went wrong...'));
    }
    add(path, fileName) {
        fs.createWriteStream(`${path}\\${fileName}`).write('');
    }
    rn(path, arg) {
        try {
            const [fileName, newFilename] = giveGoodArgs(arg);
    
            if (isGoodPath(fileName) && !isGoodPath(newFilename)) {
                fs.rename(fileName, pathM.normalize(`${pathM.dirname(fileName)}\\${newFilename}`), err => {
                    if (err) console.log('Something went wrong!', err.message);
                });
            } else if (isGoodPath(fileName) && isGoodPath(newFilename)) {
                fs.rename(fileName, newFilename, err => {
                    if (err) console.log('Something went wrong!', err.message);
                });
            } else {
                fs.rename(pathM.normalize(`${path}\\${fileName}`), pathM.normalize(`${path}\\${newFilename}`), err => {
                    if (err) console.log('Something went wrong!\n', err.message);
                });
            }
        } catch(e) {
            console.log('Something went wrong, and I think I know who did it. So, please give me correct arguments...');
        }
    }
    cp(path, arg) {
        try {
            const [firstArg, secondArg] = giveGoodArgs(arg);
            if (isGoodPath(firstArg) && isGoodPath(secondArg)) {
                checkAndMake(firstArg, () => {
                    fs.createReadStream(firstArg)
                    .pipe(fs.createWriteStream(secondArg.split('.').slice(0, -1).join('') + firstArg.split('\\').pop()));
                })
            } else if (!isGoodPath(firstArg) && isGoodPath(secondArg)) {
                checkAndMake(`${path}\\${firstArg}`, () => {
                    fs.createReadStream(`${path}\\${firstArg}`)
                    .pipe(fs.createWriteStream(secondArg.split('.').slice(0, -1).join('') + firstArg));
                })
            } else {
                console.log('Please, second argumend must have \'D:\path\\\'');
            }
        } catch(e) {
            console.log('Something went wrong, and I think I know who did it. So, please give me correct arguments...');
        }
    }
    mv(path, arg) {
        try {
            const [firstArg, secondArg1] = giveGoodArgs(arg);
            const secondArg = secondArg1.split('.')[0];
            if (isGoodPath(firstArg) && isGoodPath(secondArg)) {
                moveFile(firstArg, secondArg);
            } else if (!isGoodPath(firstArg) && isGoodPath(secondArg)) {
                moveFile(`${path}\\${firstArg}`, secondArg);
            } else {
                console.log('What? What are you doing with the paths?');
            }
        } catch(e) {
            console.log('Something went wrong, and I think I know who did it. So, please give me correct arguments, or read this: ', e.message);
        }
    }

    rm(path, pathTofile) {
        if (isGoodPath(pathTofile)) {
            checkAndMake(pathTofile, () => {
                fs.rm(pathTofile, err => err ? console.log(err.message) : '');
            })
            return;
        }
        checkAndMake(`${path}${pathTofile}`, () => fs.rm(`${path}${pathTofile}`, err => err ? console.log(err.message) : ''));
    }
}

function moveFile(fromPath, toPathDirectory) {
    const pathForCopyFile = `${toPathDirectory}${fromPath.split('\\').pop()}`;
    checkAndMake(fromPath, () => {
        fs.createReadStream(fromPath)
        .pipe(fs.createWriteStream(pathForCopyFile)
        .on('finish', () => {
            fs.rm(fromPath, () => {});
        }));
    });
}


function giveGoodArgs(arg) {
    const args = arg.split('.');
    const [first, second, third] = args;
    const firstRes = `${first}.${second.split(' ')[0]}`;
    const secondRes = `${second.split(' ').slice(1).join(' ')}.${third}`;
    return [firstRes, secondRes];
}

const basicOperation = new BasicOperation();

export {
    basicOperation
}