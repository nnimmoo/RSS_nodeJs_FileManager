import path from "path";
import fs from "fs/promises";
import { constants } from "fs";

const up = async (dir) => {
    return path.join(dir, "..");
};

const ls = async (dir) => {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    console.log(file.name);
  }
};


const cd = async (dir, newPath, check = false) => {
  if (check) {
    try {
      await fs.access(
        path.join(dir, newPath),
        constants.R_OK | constants.F_OK
      );
    } catch (err) {
      console.log(new Error("Operation failed"));
      return null;
    }
  }
    if (path.isAbsolute(newPath)) {
      return newPath;
    } else {
      return path.join(dir, newPath);
    }
  
};

export { up, cd, ls };
