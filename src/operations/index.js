import fs, { write } from 'fs';
import pathM from 'path';

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
    
            if (fileName.match(/[a-zA-Z]:\\/) && !newFilename.match(/[a-zA-Z]:\\/)) {
                fs.rename(fileName, pathM.normalize(`${pathM.dirname(fileName)}\\${newFilename}`), err => {
                    if (err) console.log('Something went wrong!', err.message);
                });
            } else if (fileName.match(/[a-zA-Z]:\\/) && newFilename.match(/[a-zA-Z]:\\/)) {
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
            if (firstArg.match(/[a-zA-Z]:\\/) && secondArg.match(/[a-zA-Z]:\\/)) {
                fs.createReadStream(firstArg).pipe(fs.createWriteStream(secondArg));
            } else if (firstArg.match(/[a-zA-Z]:\\/) && !secondArg.match(/[a-zA-Z]:\\/)) {
                fs.createReadStream(firstArg).pipe(fs.createWriteStream(`${pathM.dirname(firstArg)}\\${secondArg}`));
            } else if (!firstArg.match(/[a-zA-Z]:\\/) && secondArg.match(/[a-zA-Z]:\\/)) {
                fs.createReadStream(`${path}\\${firstArg}`).pipe(fs.createWriteStream(secondArg));
            } else {
                fs.createReadStream(`${path}\\${firstArg}`)
                .pipe(fs.createWriteStream(`${path}\\${secondArg}`));
            }
        } catch(e) {
            console.log('Something went wrong, and I think I know who did it. So, please give me correct arguments...');
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

const basicOperation = new BasicOperation();

export {
    basicOperation
}