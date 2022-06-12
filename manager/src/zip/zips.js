import zlib from "zlib";
import path from "path";
import fs from "fs/promises";
import { constants, createReadStream, createWriteStream, rm } from "fs";
import { pipeline } from "stream/promises";

export const compress = async (File, dest) => {
  try {
    await fs.access(File, constants.R_OK | constants.F_OK);
    if (path.extname(dest)) {
      await fs.access(path.dirname(dest), constants.R_OK | constants.F_OK);
    } else {
      await fs.access(dest, constants.R_OK | constants.F_OK);
    }
  } catch (err) {
    console.log(new Error("Operation failed"));
    return null;
  }

  try {
    if (!path.extname(dest)) {
      dest = path.join(dest, path.basename(File) + ".br");
    } else {
      dest += ".br";
    }

    await pipeline(
      createReadStream(File),
      zlib.createBrotliCompress(),
      createWriteStream(dest)
    );
  } catch (err) {
    console.log("Operation failed");
  } finally {
    rm(File, (err) => {
      if (err) {
        console.log("Operation failed");
      }
    });
    console.log("File compressed");
  }
};

export const decompress = async (File, dest) => {
  try {
    await fs.access(File, constants.R_OK | constants.F_OK);
    if (path.extname(dest)) {
      await fs.access(path.dirname(dest), constants.R_OK | constants.F_OK);
    } else {
      await fs.access(dest, constants.R_OK | constants.F_OK);
    }
  } catch (err) {
    console.log(new Error("Operation failed"));
    return null;
  }

  try {
    dest = path.join(
      dest,
      path.basename(File).match(/^(.+)\.br$/)[1]
    );

    await pipeline(
      createReadStream(File),
      zlib.createBrotliDecompress(),
      createWriteStream(dest)
    );
  } catch (err) {
    console.log("Operation failed");
  } finally {
    rm(File, (err) => {
      if (err) {
        console.log("Operation failed");
      }
    });
    console.log("File decompressed");
  }
};

