import fs from 'fs';
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
            const args = arg.split('.');

            const [first, second, third] = args;
            const fileName = `${first}.${second.split(' ')[0]}`;
            const newFilename = `${second.split(' ').slice(1).join(' ')}.${third}`;
    
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
}

const basicOperation = new BasicOperation();

export {
    basicOperation
}