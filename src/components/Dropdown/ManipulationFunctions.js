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
import { getQuote } from "../Utils/quotesData.js";
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

export const handleTextManipulation = (
  action,
  inputText,
  props,
  setOutputText,
  setInputText,
  transitionOutputTextarea
) => {
  const originalText = inputText;
  let transformedText = "";
  switch (action) {
    case "splitInput":
      transformedText = splitString(originalText);
      props.showAlert("Split!", "success");
      break;
    case "joinInput":
      transformedText = joinString(originalText);
      props.showAlert("Join!", "success");
      break;
    case "removeExtraSpaces":
      transformedText = removeExtraSpaces(originalText);
      props.showAlert("Remove Extra Spaces!", "success");
      break;
    case "removeAllSpaces":
      transformedText = removeAllSpaces(originalText);
      props.showAlert("Remove All Spaces!", "success");
      break;
    case "removeAllSymbols":
      transformedText = removeAllSymbols(originalText);
      props.showAlert("Remove All Symbols!", "success");
      break;
    case "duplicate":
      const count = prompt("Enter duplicate count:");
      transformedText = duplicate(originalText, count);
      props.showAlert("Duplicate!", "success");
      break;
    case "reverse":
      transformedText = reverse(originalText);
      props.showAlert("Reverse!", "success");
      break;
    case "slugify":
      transformedText = slugify(originalText);
      props.showAlert("Slugify!", "success");
      break;
    case "truncate":
      const length = prompt("Enter truncation length:");
      transformedText = truncate(originalText, length);
      props.showAlert("Truncate!", "success");
      break;
    case "paragraphToSingleLine":
      transformedText = paraToSingleLine(originalText);
      props.showAlert("Paragraph to single line!", "success");
      break;
    case "alphabetize":
      transformedText = alphabetize(originalText);
      props.showAlert("Alphabetize!", "success");
      break;
    case "zalgo":
      transformedText = zalgo(originalText);
      props.showAlert("Zalgo!", "success");
      break;
    case "rotate13":
      transformedText = rotate13Deg(originalText);
      props.showAlert("Rotate 13!", "success");
      break;
    case "addLineNum":
      transformedText = addLineNum(originalText);
      props.showAlert("Add Line Number!", "success");
      break;
    case "encodeUri":
      transformedText = encodeUri(originalText);
      props.showAlert("URL Encode!", "success");
      break;
    case "decodeUri":
      transformedText = decodeUri(originalText);
      props.showAlert("URL Decode!", "success");
      break;
    case "base64Encode":
      transformedText = base64Enode(originalText);
      props.showAlert("Base64 Encode!", "success");
      break;
    case "base64Decode":
      transformedText = base64Decode(originalText);
      props.showAlert("Base64 Decode!", "success");
      break;
    case "unixToDate":
      transformedText = unixToDate(originalText);
      props.showAlert("UNIX to Date!", "success");
      break;
    case "unixToTime":
      transformedText = unixToTime(originalText);
      props.showAlert("UNIX to Time!", "success");
      break;
    case "formatNumbers":
      transformedText = formatNumbers(originalText);
      props.showAlert("Format Numbers!", "success");
      break;
    case "extractText":
      transformedText = extractText(originalText);
      props.showAlert("Extract Text!", "success");
      break;
    case "extractNumbers":
      transformedText = extractNumber(originalText);
      props.showAlert("Extract Numbers!", "success");
      break;
    case "addPrefix":
      const prefix = prompt("Enter the prefix:");
      transformedText = addPrefix(originalText, prefix);
      props.showAlert("Add Prefix!", "success");
      break;
    case "addSuffix":
      const suffix = prompt("Enter the suffix:");
      transformedText = addSuffix(originalText, suffix);
      props.showAlert("Add Suffix!", "success");
      break;
    case "sortLinesSENS":
      transformedText = sortLinesSENS(originalText);
      props.showAlert("Sort Lines SENS!", "success");
      break;
    case "sortLinesINSENS":
      transformedText = sortLinesINSENS(originalText);
      props.showAlert("Sort Lines INSENS!", "success");
      break;
    case "sortLinesReverseSENS":
      transformedText = sortLinesReverseSENS(originalText);
      props.showAlert("Sort Lines Reverse SENS!", "success");
      break;
    case "sortLinesReverseINSENS":
      transformedText = sortLinesReverseINSENS(originalText);
      props.showAlert("Sort Lines Reverse INSENS!", "success");
      break;
    case "convertDecimalToRoman":
      transformedText = decimalToRoman(originalText);
      props.showAlert("Convert Decimal to Roman!", "success");
      break;
    case "convertRomanToDecimal":
      transformedText = romanToDecimal(originalText);
      props.showAlert("Convert Roman to Decimal!", "success");
      break;
    case "uppercase":
      transformedText = upperCase(originalText);
      props.showAlert("Convert to Upper Case!", "success");
      break;
    case "lowercase":
      transformedText = lowerCase(originalText);
      props.showAlert("Convert to Lower Case!", "success");
      break;
    case "titlecase":
      transformedText = titleCase(originalText);
      props.showAlert("Convert to Title Case!", "success");
      break;
    case "reverseTitleCase":
      transformedText = reverseTitleCase(originalText);
      props.showAlert("Convert to Reverse Title Case!", "success");
      break;
    case "invertcase":
      transformedText = invertCase(originalText);
      props.showAlert("Convert to Invert Case!", "success");
      break;
    case "sentencecase":
      transformedText = sentenceCase(originalText);
      props.showAlert("Convert to Sentence Case!", "success");
      break;
    case "togglecase":
      transformedText = toggleCase(originalText);
      props.showAlert("Convert to Toggle Case!", "success");
      break;
    case "randomcase":
      transformedText = randomCase(originalText);
      props.showAlert("Convert to Random Case!", "success");
      break;
    case "camelcase":
      transformedText = camelCase(originalText);
      props.showAlert("Convert to Camel Case!", "success");
      break;
    case "pascalcase":
      transformedText = pascalCase(originalText);
      props.showAlert("Convert to Pascal Case!", "success");
      break;
    case "kebabcase":
      transformedText = kebabCase(originalText);
      props.showAlert("Convert to Kebab Case!", "success");
      break;
    case "snakecase":
      transformedText = snakeCase(originalText);
      props.showAlert("Convert to Snake Case!", "success");
      break;
    case "constantcase":
      transformedText = constantCase(originalText);
      props.showAlert("Convert to Constant Case!", "success");
      break;
    case "dotcase":
      transformedText = dotCase(originalText);
      props.showAlert("Convert to Dot Case!", "success");
      break;
    case "nocase":
      transformedText = noCase(originalText);
      props.showAlert("Convert to No Case!", "success");
      break;
    case "alternatecase1":
      transformedText = alternateCase1(originalText);
      props.showAlert("Convert to Alternate Case 1!", "success");
      break;
    case "pathcase":
      transformedText = pathCase(originalText);
      props.showAlert("Convert to Path Case!", "success");
      break;
    case "traincase":
      transformedText = trainCase(originalText);
      props.showAlert("Convert to Train Case!", "success");
      break;
    case "alternatecase2":
      transformedText = alternateCase2(originalText);
      props.showAlert("Convert to Alternate Case 2!", "success");
      break;
    case "charFreqStr":
      transformedText = charFreqStr(originalText);
      props.showAlert("Character Frequency String!", "success");
      break;
    case "wordFreq":
      transformedText = wordFreq(originalText);
      props.showAlert("Word Frequency!", "success");
      break;
    case "generateDummyText":
      transformedText = getDummyText();
      props.showAlert("Dummy Text Generated!", "success");
      break;
    case "generateRandomCharacters":
      const totalChars = prompt(
        "What length of random characters do you need?"
      );
      transformedText = getRandomCharacters(totalChars);
      props.showAlert("Random Characters Generated!", "success");
      break;
    case "generateRandomSlagWords":
      const totalSlugWords = Number(
        prompt("How many random words slug do you need? Enter a number:")
      );
      transformedText = generateSlug(totalSlugWords);
      props.showAlert("Random Words Slug Generated!", "success");
      break;
    case "generateRandomNouns":
      const totalNouns = Number(
        prompt("How many random nouns do you need? Enter a number:")
      );
      transformedText = generateSlug(totalNouns, { format: "noun" });
      props.showAlert("Random Nouns Generated!", "success");
      break;
    case "generateRandomAdjectives":
      const totalAdjectives = Number(
        prompt("How many random adjectives do you need? Enter a number:")
      );
      transformedText = generateSlug(totalAdjectives, {
        format: "adjective",
      });
      props.showAlert("Random Adjectives Generated!", "success");
      break;
    case "generateNumbersList":
      const startingNum = window.prompt(
        "The STARTING Number must be SMALLER then the ENDING Number\nEnter the starting number:"
      );
      const endingNum = window.prompt(
        "The ENDING Number must be GREATER then the STARTING Number\nEnter the ending number:"
      );
      transformedText = getNumbers(startingNum, endingNum);
      props.showAlert("Numbers List Generated!", "success");
      break;
    case "convertToHashCode":
      transformedText = convertToHashCode(originalText);
      props.showAlert("Hash Code Generated!", "success");
      setOutputText(transformedText);
      break;
    case "generateQuote":
      const statement = getQuote().statement;
      const author = getQuote().author;
      transformedText = `${statement}\n${author}`;
      props.showAlert("Quote Generated!", "success");
      break;
    default:
      break;
  }

  setOutputText(transformedText);

  const isActionTypeGenerate =
    action === "generateDummyText" ||
    "generateNumbersList" ||
    "generateQuote" ||
    "generateRandomCharacters" ||
    "generateRandomSlagWords" ||
    "generateRandomNouns" ||
    "generateRandomAdjectives" ||
    "generateNumbersList";

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
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString();
}
