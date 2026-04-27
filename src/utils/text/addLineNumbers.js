export function addLineNumbers(text) {
  return String(text)
    .split("\n")
    .map((line, index) => `${index + 1}. ${line}`)
    .join("\n");
}

