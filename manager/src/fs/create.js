import {appendFile, constants,existsSync } from "fs";
import { access } from "fs/promises";
import path from "path";

export const create = async (dest) => {
  try {
    access(path.dirname(dest), constants.F_OK);
  } catch (err) {
    throw new Error('operation failed');
  }
  if (existsSync(dest)) { 
    console.log(new Error("Operation failed: File already Exists"));
} else {
    appendFile(dest, "", function (err) {
      if (err)   console.log(new Error("Operation failed"))
    });
    console.log("Created new file")
  }
};

