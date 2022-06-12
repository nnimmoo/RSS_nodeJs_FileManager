import readline from "readline";
import os from "os";
import path from "path";
import { getInputValue } from "./utils/getInputValue.js";
import { up, cd, ls } from "./nwd/nwd.js";
import { read } from "./fs/read.js";
import { create } from "./fs/create.js";
import { rename } from "./fs/rename.js";
import { copy } from "./fs/copy.js";
import { move } from "./fs/move.js";
import { remove } from "./fs/remove.js";

import { hash } from "./hash/hash.js";
import { compress, decompress } from "./zip/zips.js";

let currDir = os.homedir();
const currUsername = process.argv[2].match(/^--username=(.+)/)[1];


async function greet(username) {
  process.stdout.write(`Welcome to the File Manager, ${username}!\n\n`);
  currLocation();
}
function currLocation() {
  process.stdout.write(`You are currently in ${currDir}\n`);
}

async function handleOperations() {
  greet(currUsername);

  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.on("line", async (input) => {
    const userInput = input.trim();
    switch (userInput) {
      case "up":
        if (await up(currDir)) {
          currDir = await up(currDir);
        }
        currLocation();
        break;

      case "ls":
        ls(currDir);
        currLocation();
      case "os --username":
        console.log(os.userInfo().username);
        break;
      case "os --homedir":
        console.log(os.homedir());
        break;
      case "os --architecture":
        console.log(os.arch());
        break;
      case "os --EOL":
        console.log(JSON.stringify(os.EOL));
        break;
      case "os --cpus":
        os.cpus().forEach((cpu) =>
          console.log(cpu.model + " ", `${cpu.speed / 100} GHz`)
        );
        break;
      case ".exit":
        console.log(`Thank you for using File Manager, ${currUsername}!`);
        process.exit();

      default:

        if (userInput.startsWith("cd")) {
          const newer = userInput.match(/^cd\s(.+)/)[1];
          if (await cd(currDir, newer, true)) {
            currDir = await cd(currDir, newer);
          }
          currLocation();
        } else if (userInput.startsWith("cat")) {
          const pathToFile = await cd(currDir,getInputValue(userInput, "cat"), true);
          read(pathToFile);
          currLocation();
        } else if (userInput.startsWith("add")) {
          const pathToFile = await cd(currDir,getInputValue(userInput, "add") );
          if (path.extname(pathToFile)) {
            create(pathToFile);
          } else {
            console.log(new Error("Invalid input"));
          }
        } else if (userInput.startsWith("rn")) {
          const old = await cd(currDir, getInputValue(userInput, "rn")[0],);
          const newFileName = getInputValue(userInput, "rn")[1];
          rename(old, newFileName);
        } else if (userInput.startsWith("cp")) {
          const old = await cd(currDir,getInputValue(userInput, "cp")[0]);
          const newer = await cd(currDir,getInputValue(userInput, "cp")[1]);
          copy(old, newer, true);
        } else if (userInput.startsWith("mv")) {
          const old = await cd(currDir,getInputValue(userInput, "mv")[0]);
          const newer = await cd(currDir,getInputValue(userInput, "mv")[1]);
          move(old, newer);
        } else if (userInput.startsWith("rm")) {
          const pathToFile = await cd(currDir,getInputValue(userInput, "rm"));
          remove(pathToFile);
        } else if (userInput.startsWith("hash")) {
          const pathToFile = await cd(currDir,getInputValue(userInput, "hash"));
          hash(pathToFile);

        } else if (userInput.startsWith("compress")) {
          const pathToFile = await cd(currDir,getInputValue(userInput, "compress")[0]);
          const destPath = await cd(currDir,getInputValue(userInput, "compress")[1]);
          compress(pathToFile, destPath);

        } else if (userInput.startsWith("decompress")) {
          const pathToFile = await cd(currDir,getInputValue(userInput, "decompress")[0]);
          const destPath = await cd(currDir,getInputValue(userInput, "decompress")[1]);
          decompress(pathToFile, destPath);
        } else {
          console.log(new Error("Invalid input"));
        }

        break;
    }
  });

  reader.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${currUsername}!`);
    process.exit();
  });
}

handleOperations();
