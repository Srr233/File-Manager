import fs from "fs";
import InputError from "../InputError.js";
import path, { resolve } from "path";

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

  async add(nameOfFile) {
    await new Promise((res, rej) => {
      const createFile = fs.createWriteStream(
        path.join(this.data.workDir.dir, this.data.workDir.base, nameOfFile)
      );
      createFile.on("error", (err) => rej(new InputError(err.message)));
      createFile.on("finish", () => res(writedFile));
    });
  }

  async rn(pathToFile, newFilename) {
    await new Promise((res, rej) => {
      const oldP = path.join(pathToFile.dir, pathToFile.base);
      const newF = path.join(newFilename.dir, newFilename.base);
      fs.rename(oldP, newF, (err) => {
        if (err) {
          rej(new InputError(err.message));
        } else {
          res();
        }
      });
    });
  }

  async cp(pathFile, pathDir) {
    await new Promise((res, rej) => {
      const pathF = path.join(pathFile.dir, pathFile.base);
      const pathD = path.join(
        pathDir.dir,
        pathDir.base,
        pathFile.name + pathFile.ext
      );
      fs.copyFile(pathF, pathD, (err) => {
        if (err) {
          rej(new InputError(err.message));
        } else {
          res();
        }
      });
    });
  }

  async rm() {}

  async mv(pathFile, pathDir) {
    const pathF = path.join(pathFile.dir, pathFile.base);
    const pathD = path.join(
      pathDir.dir,
      pathDir.base,
      pathFile.name + pathFile.ext
    );

    const readStr = await new Promise((res, rej) => {
      const readable = fs.createReadStream(pathF);
      readable.on("error", (err) => rej(new InputError(err.message)));
      readable.on("ready", () => res(readable));
    });

    const writableStr = await new Promise((res, rej) => {
      const writeStr = fs.createWriteStream(pathD);
      writeStr.on("error", (err) => rej(new InputError(err.message)));
      writeStr.on("ready", () => res(writeStr));
    });

    const pipeline = readStr.pipe(writableStr);

    await new Promise((res, rej) => {
      pipeline.on("close", () => {
        fs.rm(pathF, (err) => {
          if (err) {
            rej(new InputError(err.message));
          } else {
            res();
          }
        });
      });
    });
  }
}

export default Operation;
