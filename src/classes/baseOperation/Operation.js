import fs from "fs";
import InputError from "../InputError.js";
import path from "path";

class Operation {
  constructor(data) {
    this.data = data;
  }

  async cat(pathParsed) {
    const readFS = await new Promise((res, rej) => {
      const readableStream = fs.createReadStream(
        path.join(pathParsed.dir, pathParsed.base)
      );
      readableStream.on("ready", () => res(readableStream));
      readableStream.on("error", (err) => rej(new InputError(err.message)));
    });
    readFS.pipe(process.stdout);
  }

  async add() {}

  async rn() {}

  async cp() {}

  async rm() {}

  async mv() {}
}

export default Operation;
