function argsReader (str) {
    try {
        const args = str.slice(2)[0];
        const userName = args.split('=')[1];
        return userName;
    } catch(e) {
        console.log('user name is not defined');
    }
}

export default argsReader;