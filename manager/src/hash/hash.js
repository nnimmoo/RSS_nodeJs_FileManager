import { createHash } from "crypto";
import { existsSync, createReadStream} from "fs";

export const hash = async (File) => {
    if (!existsSync(File)) { 
    console.log(new Error("Operation failed: File does't Exist"));
    return null;
    }
  try {
    const hash = createHash("sha256");
    const reader = createReadStream(File);
    reader.on("data", (data) => {
      hash.update(data);
    });
    reader.on("end", () => {
      console.log(hash.digest("hex"));
    });
  } catch (err) {
    console.log(new Error("operation failed: Couldn't calculate hash"));
  }
};
