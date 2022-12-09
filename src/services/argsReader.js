function argsReader (str) {
    const args = str.slice(2)[0];
    const userName = args.split('=')[1];
    return userName;
}

export default argsReader;