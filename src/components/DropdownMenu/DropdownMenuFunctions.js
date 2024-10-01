import { frequencyOfString } from "character-frequency";
import wordsFrequency from "words-frequency";
import {
  splitString,
  joinString,
  removeExtraSpaces,
  removeAllSpaces,
  removeAllSymbols,
  duplicate,
  reverse,
  slugify,
  truncate,
  paraToSingleLine,
  alphabetize,
  zalgo,
  rotate13Deg,
  encodeUri,
  decodeUri,
  base64Enode,
  base64Decode,
  addPrefix,
  addSuffix,
  extractText,
  getDummyText,
  getRandomCharacters,
} from "superbstring";
import {
  decimalToRoman,
  extractNumber,
  formatNumbers,
  getNumbers,
  romanToDecimal,
  unixToDate,
  unixToTime,
} from "number-pro";
import { getQuote } from "../Utils/QuotesData.js";
import {
  alternateCase1,
  alternateCase2,
  camelCase,
  constantCase,
  dotCase,
  invertCase,
  kebabCase,
  lowerCase,
  noCase,
  pascalCase,
  pathCase,
  snakeCase,
  reverseTitleCase,
  sentenceCase,
  spongeCase as randomCase,
  titleCase,
  toggleCase,
  trainCase,
  upperCase,
} from "case-string";
import { generateSlug } from "random-word-slugs";

const actionHandlers = {
  splitInput: (text) => splitString(text),
  joinInput: (text) => joinString(text),
  removeExtraSpaces: (text) => removeExtraSpaces(text),
  removeAllSpaces: (text) => removeAllSpaces(text),
  removeAllSymbols: (text) => removeAllSymbols(text),
  duplicate: (text) => {
    const count = prompt("Enter duplicate count:");
    return duplicate(text, count);
  },
  reverse: (text) => reverse(text),
  slugify: (text) => slugify(text),
  truncate: (text) => {
    const length = prompt("Enter truncation length:");
    return truncate(text, length);
  },
  paragraphToSingleLine: (text) => paraToSingleLine(text),
  alphabetize: (text) => alphabetize(text),
  zalgo: (text) => zalgo(text),
  rotate13: (text) => rotate13Deg(text),
  addLineNum: (text) => addLineNum(text),
  encodeUri: (text) => encodeUri(text),
  decodeUri: (text) => decodeUri(text),
  base64Encode: (text) => base64Enode(text),
  base64Decode: (text) => base64Decode(text),
  unixToDate: (text) => unixToDate(text),
  unixToTime: (text) => unixToTime(text),
  formatNumbers: (text) => formatNumbers(text),
  extractText: (text) => extractText(text),
  extractNumbers: (text) => extractNumber(text),
  addPrefix: (text) => {
    const prefix = prompt("Enter the prefix:");
    return addPrefix(text, prefix);
  },
  addSuffix: (text) => {
    const suffix = prompt("Enter the suffix:");
    return addSuffix(text, suffix);
  },
  sortLinesSENS: (text) => sortLinesSENS(text),
  sortLinesINSENS: (text) => sortLinesINSENS(text),
  sortLinesReverseSENS: (text) => sortLinesReverseSENS(text),
  sortLinesReverseINSENS: (text) => sortLinesReverseINSENS(text),
  convertDecimalToRoman: (text) => decimalToRoman(text),
  convertRomanToDecimal: (text) => romanToDecimal(text),
  uppercase: (text) => upperCase(text),
  lowercase: (text) => lowerCase(text),
  titlecase: (text) => titleCase(text),
  reverseTitleCase: (text) => reverseTitleCase(text),
  invertcase: (text) => invertCase(text),
  sentencecase: (text) => sentenceCase(text),
  togglecase: (text) => toggleCase(text),
  randomcase: (text) => randomCase(text),
  camelcase: (text) => camelCase(text),
  pascalcase: (text) => pascalCase(text),
  kebabcase: (text) => kebabCase(text),
  snakecase: (text) => snakeCase(text),
  constantcase: (text) => constantCase(text),
  dotcase: (text) => dotCase(text),
  nocase: (text) => noCase(text),
  alternatecase1: (text) => alternateCase1(text),
  pathcase: (text) => pathCase(text),
  traincase: (text) => trainCase(text),
  alternatecase2: (text) => alternateCase2(text),
  charFreqStr: (text) => charFreqStr(text),
  wordFreq: (text) => wordFreq(text),
  generateDummyText: () => getDummyText(),
  generateRandomCharacters: () => {
    const totalChars = prompt("What length of random characters do you need?");
    return getRandomCharacters(totalChars);
  },
  generateRandomSlagWords: () => {
    const totalSlugWords = Number(
      prompt("How many random words slug do you need? Enter a number:")
    );
    return generateSlug(totalSlugWords);
  },
  generateRandomNouns: () => {
    const totalNouns = Number(
      prompt("How many random nouns do you need? Enter a number:")
    );
    return generateSlug(totalNouns, { format: "noun" });
  },
  generateRandomAdjectives: () => {
    const totalAdjectives = Number(
      prompt("How many random adjectives do you need? Enter a number:")
    );
    return generateSlug(totalAdjectives, { format: "adjective" });
  },
  generateNumbersList: () => {
    const startingNum = window.prompt(
      "The STARTING Number must be SMALLER than the ENDING Number\nEnter the starting number:"
    );
    const endingNum = window.prompt(
      "The ENDING Number must be GREATER than the STARTING Number\nEnter the ending number:"
    );
    return getNumbers(startingNum, endingNum);
  },
  convertToHashCode: (text) => convertToHashCode(text),
  generateQuote: () => {
    const { statement, author } = getQuote();
    return `${statement}\n${author}`;
  },
};

export const handleTextManipulation = (
  action,
  inputText,
  props,
  setOutputText,
  setInputText,
  transitionOutputTextarea
) => {
  const originalText = inputText;
  let transformedText = actionHandlers[action]
    ? actionHandlers[action](originalText)
    : "";

  if (transformedText) {
    props.showAlert(`${action.replace(/([A-Z])/g, " $1").trim()}!`, "success");
  }

  setOutputText(transformedText);

  const isActionTypeGenerate = [
    "generateDummyText",
    "generateNumbersList",
    "generateQuote",
    "generateRandomCharacters",
    "generateRandomSlagWords",
    "generateRandomNouns",
    "generateRandomAdjectives",
  ].includes(action);

  if (isActionTypeGenerate) {
    setInputText(transformedText);
    setOutputText(transformedText);
  }

  transitionOutputTextarea();
};

function addLineNum(text) {
  return text
    .split("\n")
    .map((line, index) => `${index + 1}. ${line}`)
    .join("\n");
}

function sortLinesSENS(text) {
  return text.split(/\r?\n/).sort().join("\n");
}

function sortLinesINSENS(text) {
  return text
    .split(/\r?\n/)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .join("\n");
}

function sortLinesReverseSENS(text) {
  return text.split(/\r?\n/).sort().reverse().join("\n");
}

function sortLinesReverseINSENS(text) {
  return text
    .split(/\r?\n/)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .reverse()
    .join("\n");
}

function charFreqStr(text) {
  const JSONdata = frequencyOfString(text);
  return Object.entries(JSONdata)
    .map(([key, value]) => `${key} = ${value}`)
    .join("\n");
}

function wordFreq(text) {
  const JSONdata = wordsFrequency(text).data;
  return Object.entries(JSONdata)
    .map(([key, value]) => `${key} = ${value}`)
    .join("\n");
}

function convertToHashCode(text) {
  return text
    .split("")
    .reduce((hash, char) => {
      hash = (hash << 5) - hash + char.charCodeAt(0);
      return hash | 0;
    }, 0)
    .toString();
}
