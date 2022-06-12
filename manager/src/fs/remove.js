import fs from "fs/promises";
import path from "path";
import { constants } from "fs";

export const remove = async (File) => {
  try {
    await fs.access(path.join(File), constants.R_OK | constants.F_OK);
  } catch (err) {
    console.log(new Error("Operation failed"));
    return null;
  }
    await fs.rm(File, { recursive: true });
  console.log("file removed");
};
