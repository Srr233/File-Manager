import getCommandArg from "../service/getCommanArg.js";
import useRightErrorSpeak from "../service/useRightErrorSpeak.js";
import InfoSpeaker from "./InfoSpeaker.js";
import Nwd from "./nwd/Nwd.js";

class Commander {
  constructor(main) {
    this.main = main;
    this.nwd = new Nwd(main);
  }
  doCommand(command) {
    try {
      const data = getCommandArg(command.toString("utf8").trim());
      this[data.command](data.args);
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
  cd(args) {
    this.nwd
      .cd(args.join(" "))
      .then(() => {
        InfoSpeaker.currentDir(this.main.workDir);
      })
      .catch((err) => {
        useRightErrorSpeak(err);
      });
  }
}

export default Commander;
