import { createHash } from "crypto";
import fs from "fs";
import InputError from "../InputError.js";
import path from "path";
import { pipeline } from "stream/promises";
import OperationFailed from "../OperationFailed.js";

class HashCalc {
  async hash(rightPath) {
    const hashed = createHash("sha256");
    hashed.setEncoding("hex");

    const readStream = await new Promise((res, rej) => {
      const readStream = fs.createReadStream(
        path.join(rightPath.dir, rightPath.base)
      );
      readStream.on("error", (err) => rej(new InputError(err.message)));
      readStream.on("ready", () => res(readStream));
    });

    readStream.pipe(hashed).pipe(process.stdout);
  }
}

export default HashCalc;
