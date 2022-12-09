import { createTable } from "../services/createTable.js";
import { promises } from 'fs';

const fs = promises;

class Navigation {
    async ls(path) {
        try {
            const files = (await fs.readdir(path))
            .sort(v => v.match(/[.]/) ? 1 : -1 ? v.split('.')[0] ?  -1 : 1 : 1);
            const dataForTable = files.map((value, i) => (
                {
                    index: i,
                    nameOfFile: value,
                    extension: (value.match(/[.]/) ? true : false) ? (value.split('.')[0] ?  'file' : 'Directory') : 'Directory'
                }
            ));
    
            console.log(createTable(dataForTable));
        } catch(e) {
            console.log('Bad path, try again');
        }
    }
}

const navigation = new Navigation();
export {
    navigation
}