import { start } from "repl";

function createTable (arrayOfData) {
    let result = '|¯¯¯(index)¯¯¯|¯¯¯¯¯¯Name¯¯¯¯¯¯|¯¯¯¯¯¯¯Type¯¯¯¯¯¯|\n';

    arrayOfData.forEach(({ index, nameOfFile, extension}) => {
        let indexStrResult = '';
        let nameStrResult = '';
        let extensionStrResult = '';
        let conclusionResult = '';

        indexStrResult = tableMaker(13, index);
        nameStrResult = tableMaker(16, nameOfFile);
        extensionStrResult = tableMaker(17, extension);
        conclusionResult = `|${indexStrResult}|${nameStrResult}|${extensionStrResult}|\n`;
        result += conclusionResult;
    });
    return result.trim();
}

function tableMaker(amountOfSymbols, value) {
    let result = '';
    const amountOfSpace = amountOfSymbols - value.toString().length;
    const startAmountSpace = Math.ceil(amountOfSpace / 2);
    const endAmountSpace = amountOfSpace - startAmountSpace;

    if (amountOfSpace < 0) {
        result += tableMaker(amountOfSymbols, value.slice(0, amountOfSpace)) + '|                 |\n';
        const last = value.slice(amountOfSpace);
        result += '|             |' + tableMaker(amountOfSymbols, last);
    } else {
        result += ' '.repeat(startAmountSpace);
        result += value;
        result += ' '.repeat(endAmountSpace);
    }
    return result;
}

export {
    createTable
}