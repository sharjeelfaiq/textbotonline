import { frequencyOfString } from "character-frequency";
import wordsFrequency from "words-frequency";

export function addLineNum(text) {
  return text
    .split("\n")
    .map((line, index) => `${index + 1}. ${line}`)
    .join("\n");
}

export function sortLinesSENS(text) {
  return text.split(/\r?\n/).sort().join("\n");
}

export function sortLinesINSENS(text) {
  return text
    .split(/\r?\n/)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .join("\n");
}

export function sortLinesReverseSENS(text) {
  return text.split(/\r?\n/).sort().reverse().join("\n");
}

export function sortLinesReverseINSENS(text) {
  return text
    .split(/\r?\n/)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .reverse()
    .join("\n");
}

export function charFreqStr(text) {
  const JSONdata = frequencyOfString(text);
  return Object.entries(JSONdata)
    .map(([key, value]) => `${key} = ${value}`)
    .join("\n");
}

export function wordFreq(text) {
  const JSONdata = wordsFrequency(text).data;
  return Object.entries(JSONdata)
    .map(([key, value]) => `${key} = ${value}`)
    .join("\n");
}

export function convertToHashCode(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString();
}
