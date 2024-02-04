import { createBrotliDecompress } from "zlib";
import fs from "fs";
import InputError from "../InputError.js";
import path from "path";

class Decompress {
  constructor(data) {
    this.data = data;
  }

  async decompress(pathToFile, pathDestination) {
    const brotli = createBrotliDecompress();

    const readable = await new Promise((res, rej) => {
      const readable = fs.createReadStream(
        path.join(pathToFile.dir, pathToFile.base)
      );
      readable.on("error", (err) => rej(new InputError(err.message)));
      readable.on("ready", () => res(readable));
    });

    const writable = await new Promise((res, rej) => {
      const writable = fs.createWriteStream(
        path.join(pathDestination.dir, pathDestination.base, pathToFile.name)
      );
      writable.on("error", (err) => rej(new InputError(err.message)));
      writable.on("ready", () => res(writable));
    });

    readable.pipe(brotli).pipe(writable);
  }
}

export default Decompress;
