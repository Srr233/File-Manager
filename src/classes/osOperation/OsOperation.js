import os from "os";

class OsOperation {
  constructor(data) {
    this.data = data;
  }
  EOL() {
    process.stdout.write(os.EOL + "\n");
  }

  cpus() {
    const stringify = os.cpus().map((cpu) => JSON.stringify(cpu) + "\n");
    process.stdout.write(stringify + "\n");
  }

  homedir() {
    process.stdout.write(os.homedir() + "\n");
  }

  username() {
    process.stdout.write(this.data.args.username + "\n");
  }

  architecture() {
    process.stdout.write(os.arch());
  }
}

export default OsOperation;
