import argsReader from './src/services/argsReader.js';
import process from 'process';
import { myOs } from './src/os_info/index.js';
import { navigation } from './src/navigation/index.js';
import { basicOperation } from './src/operations/index.js';

const userName = argsReader(process.argv);
console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${myOs.home()}`);
console.log(`Supported commands:
up - Go upper from current directory
cd path_to_directory - path to a directory you want
ls - lists of files
cat path_to_file - read and print content of a file
add - add a new file
rn - path_to_file new_file_name - rename a file
cp path_to_file path_to_new_directory - copy a file to a new directory
mv path_to_file path_to_new_directory - same as copy but a file will be deleted
rm path_to_file - delete a file

os --EOL - print End Of Life
os --cpus - print host machine CPUs info
os --homedir - print home directory
os --username - print user name
os --architecture - print CPU architecture for which Node.js binary has compiled
hash path_to_file - calculate hash for file and print it
compress path_to_file path_to_destination - compress file
decompress path_to_file path_to_destination - decompress file`);
const options = {
    path: myOs.home(),
};
Object.defineProperty(options, 'mainPath', {
    value: myOs.home(),
    writable: false,
    enumerable: false,
});

process.stdin.on('data', data => {
    const correctData = data.toString().trim();
    if (correctData == '.exit') {
        console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
        process.exit();
    } else {
        const command = correctData.split(" ")[0];
        const arg = correctData.split(" ").slice(1).join(' ');
        if (command == 'ls') navigation.ls(arg ? arg : options.path, options);
        if (command == 'up') navigation.up(options);
        if (command == 'cd') navigation.cd(options, arg);
        if (command == 'cat') basicOperation.cat(arg);
        if (command == 'add') basicOperation.add(options.path, arg);
        if (command == 'rn') basicOperation.rn(options.path, arg);
        if (command == 'cp') basicOperation.cp(options.path, arg);
        if (command == 'mv') basicOperation.mv(options.path, arg);
        if (command == 'rm') basicOperation.rm(options.path, arg);
        if (command == 'os') {
            if (arg == '--username') myOs.username();
            if (arg == '--cpus') myOs.cpus();
            if (arg == '--architecture') myOs.architecture();
            if (arg == '--homedir') console.log(myOs.home());
        }
    }
});
process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
    process.exit();
});