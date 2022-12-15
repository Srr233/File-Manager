import os from 'os';

class MyOs {
    home() {
        return os.homedir();
    }
    EOL() {
        console.log(os.EOL);
    }
    cpus() {
        console.log(os.cpus());
    }
    username() {
        console.log(os.userInfo().username);
    }
    architecture() {
        console.log(os.arch());
    }
}

const myOs = new MyOs();
export {
    myOs
}