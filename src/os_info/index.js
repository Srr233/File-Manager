import os from 'os';

class MyOs {
    home() {
        return os.homedir();
    }
}

const myOs = new MyOs();
export {
    myOs
}