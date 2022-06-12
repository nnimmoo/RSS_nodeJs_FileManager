import fs from "fs/promises";
import { constants, readFile} from "fs";

export const read = async (file) => {
  try {
    await fs.access(file, constants.R_OK | constants.F_OK);
  } catch (err) {
    console.log( new Error("Operation failed"));
    return null;
  }
 readFile(file, function (err, data) {
    if (err)  console.log( new Error('operation failed: couldnt read'));
    console.log(data.toString());
  });
};
