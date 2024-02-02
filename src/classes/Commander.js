import getCommandArg from "../service/getCommanArg.js";
import getRightPath from "../service/getRightPath.js";
import useRightErrorSpeak from "../service/useRightErrorSpeak.js";
import InfoSpeaker from "./InfoSpeaker.js";
import InputError from "./InputError.js";
import Operation from "./baseOperation/Operation.js";
import Nwd from "./nwd/Nwd.js";
import OsOperation from "./osOperation/OsOperation.js";

class Commander {
  constructor(main) {
    this.main = main;
    this.nwd = new Nwd(main);
    this.operation = new Operation(main);
    this.osOperation = new OsOperation(main);
  }
  async doCommand(command) {
    try {
      const data = getCommandArg(command.toString("utf8").trim());
      await this[data.command](data.args);
    } catch (err) {
      useRightErrorSpeak(err);
    }
  }
  exit() {
    process.exit(0);
  }
  up() {
    this.nwd.up();
    InfoSpeaker.currentDir(this.main.workDir);
  }
  async cd(args) {
    const rightPath = getRightPath(args.join(" "), this.main.workDir);
    await this.nwd.cd(rightPath);
    InfoSpeaker.currentDir(this.main.workDir);
  }
  async ls() {
    const tableString = await this.nwd.ls();
    InfoSpeaker.showInfo(tableString);
  }

  async cat(args) {
    const rightPath = getRightPath(args.join(" "), this.main.workDir);
    await this.operation.cat(rightPath);
  }

  async add(args) {
    await this.operation.add(args.join(""));
  }

  async rn([oldPath, newPath]) {
    const old = getRightPath(oldPath, this.main.workDir);
    const newP = getRightPath(newPath, this.main.workDir);

    await this.operation.rn(old, newP);
  }

  async cp([pathFile, pathDir]) {
    const pathF = getRightPath(pathFile, this.main.workDir);
    const pathD = getRightPath(pathDir, this.main.workDir);

    await this.operation.cp(pathF, pathD);
  }

  async mv([pathFile, pathDir]) {
    const pathF = getRightPath(pathFile, this.main.workDir);
    const pathD = getRightPath(pathDir, this.main.workDir);

    await this.operation.mv(pathF, pathD);
  }

  async rm(args) {
    const pathForDelete = getRightPath(args.join(""), this.main.workDir);

    await this.operation.rm(pathForDelete);
  }

  os(args) {
    const [osArg] = args;
    try {
      this.osOperation[osArg.slice(2)]();
    } catch (err) {
      throw new InputError(err.message);
    }
  }
}

export default Commander;
