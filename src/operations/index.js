import fs from 'fs';


class BasicOperation {
    cat(path) {
        const readableStream = fs.createReadStream(path);
        readableStream.pipe(process.stdout);
        readableStream.on('error', () => console.log('Something went wrong...'));
    }
    add(path, fileName) {
        fs.createWriteStream(`${path}\\${fileName}`).write('');
    }
}

const basicOperation = new BasicOperation();

export {
    basicOperation
}