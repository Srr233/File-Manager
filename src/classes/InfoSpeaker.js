class InfoSpeaker {
  static greeting(name) {
    process.stdout.write(`Welcome to the File Manager, ${name}!\n`);
  }
  static adios(name) {
    process.stdout.write(
      `Thank you for using File Manager, ${name}, goodbye!\n`
    );
  }
  static currentDir(dirName) {
    process.stdout.write(`You are currently in ${dirName}\n`);
  }
  static waitFor() {
    process.stdout.write("Print command and wait for result.\n");
  }
  static invaldInput() {
    process.stdout.write("Invalid input\n");
  }
  static error() {
    process.stdout.write("Operation failed\n");
  }
}

export default InfoSpeaker;
