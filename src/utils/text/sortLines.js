export function sortLinesCaseSensitive(text) {
  return String(text).split(/\r?\n/).sort().join("\n");
}

export function sortLinesCaseInsensitive(text) {
  return String(text)
    .split(/\r?\n/)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .join("\n");
}

export function sortLinesReverseCaseSensitive(text) {
  return String(text).split(/\r?\n/).sort().reverse().join("\n");
}

export function sortLinesReverseCaseInsensitive(text) {
  return String(text)
    .split(/\r?\n/)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .reverse()
    .join("\n");
}

