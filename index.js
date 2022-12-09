import argsReader from './src/services/argsReader.js';
import process from 'process';
import { myOs } from './src/os_info/index.js';
import { navigation } from './src/navigation/index.js';

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

process.stdin.on('data', data => {
    const correctData = data.toString().trim();
    if (correctData == '.exit') {
        console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
        process.exit();
    } else {
        const values = correctData.split(' ');
        if (values[0] == 'ls') navigation.ls(values[1]);
    }
});
process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
    process.exit();
});