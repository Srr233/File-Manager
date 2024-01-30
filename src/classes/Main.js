import Commander from "./Commander.js";
import InfoSpeaker from "./InfoSpeaker.js";
import { homedir } from "os";

class Main {
  constructor(args) {
    this.data = {
      args: args,
      homedir: homedir(),
    };
    const commander = new Commander(this);

    process.on("exit", (code) => {
      if (code === 0) InfoSpeaker.adios(this.data.args.username);
    });
    process.on("SIGINT", () => {
      process.exit();
    });
    process.stdin.on("data", (value) => {
      commander.doCommand(value);
    });

    InfoSpeaker.greeting(this.data.args.username);
    InfoSpeaker.currentDir(this.data.homedir);
    InfoSpeaker.waitFor();
  }
}

export default Main;
