import path from "path";
import fs from "fs/promises";
import InputError from "../InputError.js";

class Nwd {
  constructor(data) {
    this.data = data;
  }

  up() {
    if (path.parse(this.data.workDir).base) {
      this.data.workDir = path.dirname(this.data.workDir);
    }
  }

  async cd(pathTo) {
    try {
      const normalized = path.normalize(pathTo);
      await fs.access(normalized);
      this.data.workDir = normalized;
    } catch (err) {
      if (err.message.includes("ENOENT")) throw new InputError();
    }
  }

  ls() {}
}

export default Nwd;
