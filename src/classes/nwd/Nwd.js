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
    if (this.data.workDir.base) {
      this.data.workDir = path.parse(this.data.workDir.dir);
    }
  }

  async cd(pathTo) {
    try {
      if (pathTo?.ext) {
        throw new InputError("The path is not a directory!");
      } else if (!pathTo) {
        throw new InputError("cd command does not have an argument!");
      }

      const pathDirBase = path.join(pathTo.dir, pathTo.base);
      await fs.access(pathDirBase);
      this.data.workDir = pathTo;
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
      throw new OperationFailed(err.message);
    }
  }
}

export default Nwd;
