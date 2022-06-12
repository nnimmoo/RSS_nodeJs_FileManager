import fs from "fs/promises";
import path from "path";
import { createReadStream, createWriteStream } from "fs";

export const rename = async (old, newName) => {
    const newPath = path.join(path.dirname(old), newName);
    const readStream = createReadStream(old);
    const writeStream = createWriteStream(newPath);
    readStream.pipe(writeStream);
    fs.rm(old);
    console.log("file renamed");
};
