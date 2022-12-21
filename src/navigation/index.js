import { createTable } from "../services/createTable.js";
import { promises } from 'fs';
import path from "path";
import { isGoodPath } from "../services/isGoodPath.js";

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
    up(options) {
        if (options.mainPath == options.path) return;
        options.path = path.dirname(options.path);
    }
    cd(options, pathN) {
        if (path.isAbsolute(pathN)) {
            options.path = pathN;
        } else {
            options.path = path.join(options.path, pathN, path.sep);
        }

        console.log(`Current working directory is: "${options.path}"`);
    }
}

const navigation = new Navigation();
export {
    navigation
}