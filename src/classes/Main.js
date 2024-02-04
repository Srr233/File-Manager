import path from "path";
import Commander from "./Commander.js";
import InfoSpeaker from "./InfoSpeaker.js";
import { homedir } from "os";

class Main {
  constructor(args) {
    const parsedHomeDir = path.parse(homedir());
    this.data = {
      args: args,
      homeDir: parsedHomeDir,
      workDir: parsedHomeDir,
    };
    const commander = new Commander(this.data);

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
    InfoSpeaker.currentDir(this.data.homeDir);
    InfoSpeaker.waitFor();
  }
}

export default Main;
