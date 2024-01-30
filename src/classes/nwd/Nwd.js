import path from "path";

class Nwd {
  constructor(data) {
    this.data = data;
  }

  up() {
    if (path.parse(this.data.workDir).base) {
      this.data.workDir = path.dirname(this.data.workDir);
    }
  }

  cd(path) {}

  ls() {}
}

export default Nwd;
