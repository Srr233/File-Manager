import getCommandArg from "../service/getCommanArg.js";
import InfoSpeaker from "./InfoSpeaker.js";
import InputError from "./InputError.js";
import OperationFailed from "./OperationFailed.js";

class Commander {
  constructor(main) {
    this.main = main;
  }
  doCommand(command) {
    try {
      const data = getCommandArg(command.toString("utf8").trim());
      this[data.command](data.args);
    } catch (err) {
      if (err instanceof TypeError || err instanceof InputError) {
        InfoSpeaker.invaldInput();
      }
      if (err instanceof OperationFailed) {
        InfoSpeaker.error();
      }
    }
  }
  exit() {
    process.exit(0);
  }
}

export default Commander;
