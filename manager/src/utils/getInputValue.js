export function getInputValue(input, inputCommand) {
  input = input.trim();
  try {
    const regexp = new RegExp(`^${inputCommand}\\s([^\\s]*)\\s*([^\\s]*)?`);
    if (input.match(regexp)[2]) {
      const [, path1, path2] = input.match(regexp);
      return [path1, path2];
    } else {
      return input.match(regexp)[1];
    }
  } catch (err) {
    console.log(new Error("Invalid input"));
  }
}
