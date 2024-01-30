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
  static invaldInput(message) {
    process.stdout.write(`Invalid input\n Error: ${message}\n`);
  }
  static error() {
    process.stdout.write("Operation failed\n");
  }
  static showInfo(info) {
    process.stdout.write(info);
  }
}

export default InfoSpeaker;
