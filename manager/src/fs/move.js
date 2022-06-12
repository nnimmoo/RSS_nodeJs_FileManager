import fs from "fs/promises";
import { constants } from "fs";
import path from "path";
import { createReadStream, createWriteStream } from "fs";

export const move = async (src, dest, check = false) => {
  if (check) {
    try {
      await fs.access(src, constants.R_OK | constants.F_OK);
      await fs.access(dest, constants.R_OK | constants.F_OK);
    } catch (err) {
      console.log(new Error("Operation failed"));
      return null;
    }
  }
    const readStream = createReadStream(src);
    const writeStream = createWriteStream(path.join(dest, path.basename(src)));
    readStream.pipe(writeStream);
    fs.rm(src);
};
