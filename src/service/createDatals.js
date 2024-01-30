import fs from "fs/promises";
import path from "path";

async function createDatals(pathLike) {
  const filesName = await fs.readdir(pathLike);
  const res = [];

  for (let i = 0; i < filesName.length; i++) {
    const fileData = {};
    fileData.index = i;
    fileData.name = filesName[i];
    if (path.parse(filesName[i]).ext) {
      fileData.type = "file";
    } else {
      fileData.type = "directory";
    }
    res.push(fileData);
  }
  return res;
}
export default createDatals;
