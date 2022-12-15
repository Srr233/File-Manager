import fs from 'fs';

export function checkAndMake(file, callback) {
    fs.access(file, err => {
        if (err) {
            console.log('Something went wrong. The error: ', err.message);
            return;
        }
        callback();
    })
}