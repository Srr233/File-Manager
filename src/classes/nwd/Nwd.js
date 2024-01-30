import path from "path";
import fs from "fs/promises";
import InputError from "../InputError.js";
import createlsTable from "../../service/createlsTable.js";
import OperationFailed from "../OperationFailed.js";
import createDatals from "../../service/createDatals.js";

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
      if (path.parse(normalized).ext) {
        throw new InputError("The path is not a directory!");
      } else if (!pathTo) {
        throw new InputError("cd command does not have an argument!");
      }
      await fs.access(normalized);
      this.data.workDir = normalized;
    } catch (err) {
      throw new InputError(err.message);
    }
  }

  async ls() {
    try {
      const data = await createDatals(this.data.workDir);
      const table = createlsTable(data);
      return table;
    } catch (err) {
      throw new OperationFailed();
    }
  }
}

export default Nwd;
