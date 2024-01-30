import getCommandArg from "../service/getCommanArg.js";
import useRightErrorSpeak from "../service/useRightErrorSpeak.js";
import InfoSpeaker from "./InfoSpeaker.js";
import Nwd from "./nwd/Nwd.js";

class Commander {
  constructor(main) {
    this.main = main;
    this.nwd = new Nwd(main);
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
    await this.nwd.cd(args.join(" "));
    InfoSpeaker.currentDir(this.main.workDir);
  }
}

export default Commander;
