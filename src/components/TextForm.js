import { useState } from "react";

import wordsFrequency from "words-frequency";
import {
  addPrefix,
  addSuffix,
  alphabetize,
  base64Decode,
  base64Enode,
  decodeUri,
  duplicate,
  encodeUri,
  extractText,
  getDummyText,
  getRandomCharacters,
  joinString,
  paraToSingleLine,
  removeAllSpaces,
  removeAllSymbols,
  removeExtraSpaces,
  reverse,
  rotate13Deg,
  slugify,
  splitString,
  truncate,
  zalgo,
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
import { getQuote } from "./Quotes";
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
  pascalSnakeCase,
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
import { Dropdown } from "react-bootstrap";
import { frequencyOfString } from "character-frequency";
import { generateSlug } from "random-word-slugs";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../css/TextForm.css";

const TextForm = (props) => {
  const [text, setText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [inputDarkBackground, setInputDarkBackground] = useState("#242526");
  const [outputDarkBackground, setOutputDarkBackground] = useState("#242526");
  const [inputLightBackground, setInputLightBackground] = useState("white");
  const [outputLightBackground, setOutputLightBackground] = useState("white");

  const uploadTextFile = () => {
    let files = document.querySelector('input[type="file"]').files;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result;
      setText(lines);
      setGeneratedText(lines);
    };
    setInputLightBackground("#8BE48B");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    setInputDarkBackground("#8BE48B");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    reader.readAsText(files[0]);
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
    setOutputLightBackground("#0DCAF0");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setOutputDarkBackground("#0DCAF0");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
  };

  const handleTextSplit = () => {
    const newText = splitString(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text is splitted!.", "success");
  };

  const handleTextJoin = () => {
    const newText = joinString(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text is joined!.", "success");
  };

  const handleExtraSpacesRemoval = () => {
    const newText = removeExtraSpaces(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Extra spaces removed!", "success");
  };

  const handleAllSpacesRemoval = () => {
    const newText = removeAllSpaces(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("All spaces removed!", "success");
  };

  const handleAllSymbolsRemoval = () => {
    const newText = removeAllSymbols(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("All symbols removed!", "success");
  };

  const handleTextDuplication = () => {
    const count = Number(
      prompt("How many times do you want to duplicate the text?")
    );
    const newText = duplicate(text, count);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text duplicated!", "success");
  };

  const handleTextReversal = () => {
    const newText = reverse(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Reversed!", "success");
  };

  const handleTextSlugification = () => {
    const newText = slugify(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Slugified!", "success");
  };

  const handleTextTruncation = () => {
    const length = prompt("What length upto you want to truncate your text?");
    const newText = truncate(text, length);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Truncated!", "success");
  };

  const convertParagraphsToLine = () => {
    const newText = paraToSingleLine(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Changed to one line text!", "success");
  };

  const sortWordsAlphabetically = () => {
    const newText = alphabetize(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Alphabetized", "success");
  };

  const applyZalgoEffect = () => {
    const newText = zalgo(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Zalgo affect applied", "success");
  };

  const handleTextRotation = () => {
    const newText = rotate13Deg(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Rotate 13 decoder applied", "success");
  };

  const addLineNum = () => {
    const newText = text
      .split("\n")
      .map((line, index) => `${index + 1}. ${line}`)
      .join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Line numbers added.", "success");
  };

  const handleUrlEncoding = () => {
    const newText = encodeUri(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Encoded to URL", "success");
  };

  const handleUrlDecoding = () => {
    const newText = decodeUri(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Decoded the URL", "success");
  };

  const handleBase64Encoding = () => {
    const newText = base64Enode(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Base64 encoded!", "success");
  };

  const handleBase64Decoding = () => {
    const newText = base64Decode(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Base64 decoded!", "success");
  };

  const convertUnixToDate = () => {
    const newText = unixToDate(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted from Unix Time to Date", "success");
  };

  const convertUnixToTime = () => {
    const newText = unixToTime(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted from Unix Timestamp to Time", "success");
  };

  const formatNumberInput = () => {
    const newText = formatNumbers(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Number(s) Formated!", "success");
  };

  const extractTextFromInput = () => {
    const newText = extractText(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Text Extracted!", "success");
  };

  const extractNumbersFromInput = () => {
    const newText = extractNumber(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Numbers Extracted!", "success");
  };

  const addPrefixToInput = () => {
    const prefix = window.prompt(
      "Enter the text you need to prefix to the text inside the text area."
    );
    const newText = addPrefix(text, prefix);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Prefix added!", "success");
  };

  const addSuffixToInput = () => {
    const suffix = window.prompt(
      "Enter the text you need to suffix to the text inside the text area."
    );
    const newText = addSuffix(text, suffix);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Suffix added!", "success");
  };

  const sortLinesSENS = () => {
    const newText = text.split(/\r?\n/).sort().join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Lines Sorted!", "success");
  };

  const sortLinesINSENS = () => {
    const newText = text.split(/\r?\n/i).sort().join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Lines Sorted!", "success");
  };

  const sortLinesReverseSENS = () => {
    const newText = text.split(/\r?\n/).sort().reverse().join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Lines Sorted in Reverse Order!", "success");
  };

  const sortLinesReverseINSENS = () => {
    const newText = text.split(/\r?\n/i).sort().reverse().join("\n");
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Lines Sorted in Reverse Order!", "success");
  };

  const convertDecimalToRoman = () => {
    const newText = decimalToRoman(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert(
      "The entered decimal is converted to roman format!",
      "success"
    );
  };

  const convertRomanToDeciman = () => {
    const newText = romanToDecimal(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert(
      "The entered roman number is converted to decimal!",
      "success"
    );
  };

  const convertToUpperCase = () => {
    const newText = upperCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'UPPERCASE'!", "success");
  };

  const convertToLowerCase = () => {
    const newText = lowerCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'lowercase'!", "success");
  };

  const convertToTitleCase = () => {
    const newText = titleCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Title Case'!", "success");
  };

  const convertToReverseTitleCase = () => {
    const newText = reverseTitleCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Reverse Title Case'!", "success");
  };

  const convertToInvertCase = () => {
    const newText = invertCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Invert Case'!", "success");
  };

  const convertToSentenceCase = () => {
    var newText = sentenceCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Sentence Case'!", "success");
  };

  const handleToggleCase = () => {
    const newText = toggleCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Toggle cased text!", "success");
  };

  const convertToRandomCase = () => {
    const newText = randomCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Random Case'!", "success");
  };

  const convertToCamelCase = () => {
    const newText = camelCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Cammal Case'!", "success");
  };

  const convertToConstantCase = () => {
    const newText = constantCase(text);
    console.log(newText);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Constant Case'!", "success");
  };

  const convertToDotCase = () => {
    const newText = dotCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Dot Case'!", "success");
  };

  const convertToNoCase = () => {
    const newText = noCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'No Case'!", "success");
  };

  const convertToPascalCase = () => {
    const newText = pascalCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Pascal Case'!", "success");
  };

  const convertToKebabCase = () => {
    const newText = kebabCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Kebab Case'!", "success");
  };

  const convertToSnakeCase = () => {
    const newText = snakeCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert(
      "Converted to 'Cammal Case (Upper Camel Case or Pascal Camel Case)'!",
      "success"
    );
  };

  const convertToAlternateCase1 = () => {
    var newText = alternateCase1(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Alternate Case'!", "success");
  };

  const convertToAlternateCase2 = () => {
    var newText = alternateCase2(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Alternate Case'!", "success");
  };

  const convertToPascalSnakeCase = () => {
    const newText = pascalSnakeCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Pascal Snake Case'!", "success");
  };

  const convertToPathCase = () => {
    const newText = pathCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Path Case'!", "success");
  };

  const convertToTrainCase = () => {
    const newText = trainCase(text);
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Converted to 'Train Case'!", "success");
  };

  const charFreqStr = () => {
    const JSONdata = frequencyOfString(text);
    console.log(JSONdata);
    let newText;
    for (const [key, value] of Object.entries(JSONdata)) {
      newText += `${JSON.stringify(key)} = ${JSON.stringify(value)}\n`;
    }
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Characters Frequency Generated From a String!", "success");
  };

  const wordFreq = () => {
    const JSONdata = wordsFrequency(text).data;
    let newText;
    for (const [key, value] of Object.entries(JSONdata)) {
      newText += `${JSON.stringify(key)} = ${JSON.stringify(value)}\n`;
    }
    setText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Words Frequency Generated!", "success");
  };

  const generateDummyText = () => {
    let newText = getDummyText();
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Dummy Text Generated!", "success");
  };

  const generateRandomCharacters = () => {
    const limit = prompt("What length of random characters do you need?");
    const newText = getRandomCharacters(limit);
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Random Characters generated!", "success");
  };

  const generateRandomSlagWords = () => {
    const count = Number(
      prompt("How many random words slug do you need? Enter a number:")
    );
    const newText = generateSlug(count);
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Random Words Slug generated!", "success");
  };

  const generateRandomNouns = () => {
    const count = Number(
      prompt("How many random nouns do you need? Enter a number:")
    );
    const newText = generateSlug(count, { format: "noun" });
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert(
      "Random Nouns generated! You can join them to get all of them in a row.",
      "success"
    );
  };

  const generateRandomAdjectives = () => {
    const count = Number(
      prompt("How many random adjectives do you need? Enter a number:")
    );
    const newText = generateSlug(count, { format: "adjective" });
    setText(newText);
    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert(
      "Random Adjectives generated! You can join them to get all of them in a row.",
      "success"
    );
  };

  const generateNumbersList = () => {
    const startingNum = window.prompt(
      "The STARTING Number must be SMALLER then the ENDING Number\nEnter the starting number:"
    );
    const endingNum = window.prompt(
      "The ENDING Number must be GREATER then the STARTING Number\nEnter the ending number:"
    );
    const newText = getNumbers(startingNum, endingNum);
    setText(newText);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("Entered series of numbers is generated!", "success");
  };

  const convertToHashCode = () => {
    const hashCode = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    };

    const newText = hashCode(text).toString();
    setText(newText);
    setOutputDarkBackground("#CED4DA");

    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert(
      "The hash code is generated from the given string!",
      "success"
    );
  };

  const generateQuote = () => {
    const statement = getQuote().statement;
    const author = getQuote().author;

    const newText = `${statement}\n${author}`;
    setText(newText);

    setGeneratedText(newText);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 280);
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 280);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Random Quote Fetched!", "success");
  };

  const clear = () => {
    setText("");
    setGeneratedText("");
    setOutputDarkBackground("#962B35");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 400);
    setInputDarkBackground("#962B35");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 400);
    setOutputLightBackground("#962B35");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    setInputLightBackground("#962B35");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("Cleared!.", "success");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setOutputDarkBackground("#CED4DA");
    setTimeout(() => {
      setOutputDarkBackground("#242526");
    }, 400);
    setOutputLightBackground("#CED4DA");
    setTimeout(() => {
      setOutputLightBackground("white");
    }, 280);
    props.showAlert("COPIED!", "success");
  };

  const pasteToTextarea = () => {
    navigator.clipboard
      .readText()
      .then((newText) => {
        setText(newText);
        setGeneratedText(newText);
        props.showAlert("PASTED!", "success");
      })
      .catch((err) => {
        props.showAlert(err, "error");
      });
    setInputDarkBackground("#CED4DA");
    setTimeout(() => {
      setInputDarkBackground("#242526");
    }, 400);
    setInputLightBackground("#CED4DA");
    setTimeout(() => {
      setInputLightBackground("white");
    }, 280);
    props.showAlert("PASTED!", "success");
  };

  const onTextChange = (e) => {
    setText(e.target.value);
    setGeneratedText(e.target.value);
  };

  return (
    <>
      <motion.h1
        className={`mt-3 text-center text-${
          props.mode === "light" ? "dark" : "light"
        }`}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.4,
            },
          },
        }}
      >
        <span className="text-uppercase font-monospace">
          TEXTBOT<span className="text-info">ONLINE</span>
        </span>
      </motion.h1>
      <small>
        <p
          className={`text-center text-${
            props.mode === "light" ? "dark" : "light"
          }`}
        >
          Just copy/paste or upload your text here and hit the desired button
        </p>
      </small>
      <div className="form-floating mb-3">
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Upload
            </Dropdown.Toggle>
            <Dropdown.Menu variant={`${props.mode}`} className="menu-opt">
              <input
                type="file"
                accept="text/plain"
                onChange={uploadTextFile}
                title="Open the text file"
                className="menu-item"
              />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Edit
            </Dropdown.Toggle>
            <Dropdown.Menu className="menu-scroll" variant={`${props.mode}`}>
              <Dropdown.Item
                onClick={handleTextSplit}
                disabled={text.length === 0}
                title="Split all words to new lines."
                className="menu-item"
              >
                Split Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleTextJoin}
                disabled={text.length === 0}
                title="Join all the text to a single line."
                className="menu-item"
              >
                Join Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleExtraSpacesRemoval}
                disabled={text.length === 0}
                title="Removes extra spaces, new ines, tab spaces"
                className="menu-item"
              >
                Remove Extra Spaces
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleAllSpacesRemoval}
                disabled={text.length === 0}
                title="Removes all the spaces, new ines, tab spaces"
                className="menu-item"
              >
                Remove All Spaces
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleAllSymbolsRemoval}
                disabled={text.length === 0}
                title="Removes all the symbols"
                className="menu-item"
              >
                Remove All Symbols
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleTextDuplication}
                disabled={text.length === 0}
                title="Duplicate text"
                className="menu-item"
              >
                Duplicate
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleTextReversal}
                disabled={text.length === 0}
                title="Reverese text"
                className="menu-item"
              >
                Reverse
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleTextSlugification}
                disabled={text.length === 0}
                title="Slugify text"
                className="menu-item"
              >
                Slugify
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleTextTruncation}
                disabled={text.length === 0}
                title="Truncate the text upto desired length"
                className="menu-item"
              >
                Truncate
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertParagraphsToLine}
                disabled={text.length === 0}
                title="Convert paragraphs to single line"
                className="menu-item"
              >
                Paragraph to single line
              </Dropdown.Item>
              <Dropdown.Item
                onClick={sortWordsAlphabetically}
                disabled={text.length === 0}
                title="Change the order of words in text as A-Z"
                className="menu-item"
              >
                Alphabetize Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={applyZalgoEffect}
                disabled={text.length === 0}
                title="Apply Zalgo affect"
                className="menu-item"
              >
                Zalgo
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleTextRotation}
                disabled={text.length === 0}
                title="Rotate 13 decoder"
                className="menu-item"
              >
                Rotate 13
              </Dropdown.Item>
              <Dropdown.Item
                onClick={addLineNum}
                disabled={text.length === 0}
                title="Add line number to each line"
                className="menu-item"
              >
                Add Line Number
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleUrlEncoding}
                disabled={text.length === 0}
                title="Encode to URL"
                className="menu-item"
              >
                Encode URL
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleUrlDecoding}
                disabled={text.length === 0}
                title="Decode the URL"
                className="menu-item"
              >
                Decode URL
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleBase64Encoding}
                disabled={text.length === 0}
                title="Encode to URL"
                className="menu-item"
              >
                Base64 Encode
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleBase64Decoding}
                disabled={text.length === 0}
                title="Decode the URL"
                className="menu-item"
              >
                Base64 Decode
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertUnixToDate}
                disabled={text.length === 0}
                title="Convert from Unix to date"
                className="menu-item"
              >
                UNIX to Date
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertUnixToTime}
                disabled={text.length === 0}
                title="Convert from Unix to time"
                className="menu-item"
              >
                UNIX to Time
              </Dropdown.Item>
              <Dropdown.Item
                onClick={formatNumberInput}
                disabled={text.length === 0}
                title="Adds comma to numbers after every three digits"
                className="menu-item"
              >
                Format Numbers
              </Dropdown.Item>
              <Dropdown.Item
                onClick={extractTextFromInput}
                disabled={text.length === 0}
                title="Extract the text from the given string"
                className="menu-item"
              >
                Extract Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={extractNumbersFromInput}
                disabled={text.length === 0}
                title="Extract the numbers from the given string"
                className="menu-item"
              >
                Extract Numbers
              </Dropdown.Item>
              <Dropdown.Item
                onClick={addPrefixToInput}
                disabled={text.length === 0}
                title="Adds prefix to the given string"
                className="menu-item"
              >
                Add Prefix
              </Dropdown.Item>
              <Dropdown.Item
                onClick={addSuffixToInput}
                disabled={text.length === 0}
                title="Adds suffix to the given string"
                className="menu-item"
              >
                Add Suffix
              </Dropdown.Item>
              <Dropdown.Item
                onClick={sortLinesSENS}
                disabled={text.length === 0}
                title="Sort lines in the aphabetical order"
                className="menu-item"
              >
                Sort lines alphabetically
              </Dropdown.Item>
              <Dropdown.Item
                onClick={sortLinesINSENS}
                disabled={text.length === 0}
                title="Sort lines in the aphabetical order (case insensitive)"
                className="menu-item"
              >
                Sort lines alphabetically (case insensitive)
              </Dropdown.Item>
              <Dropdown.Item
                onClick={sortLinesReverseSENS}
                disabled={text.length === 0}
                title="Sort lines in the reverse aphabetical order"
                className="menu-item"
              >
                Reverse sort lines alphabetically
              </Dropdown.Item>
              <Dropdown.Item
                onClick={sortLinesReverseINSENS}
                disabled={text.length === 0}
                title="Sort lines in the reverse aphabetical order (case insensitive)"
                className="menu-item"
              >
                Reverse sort lines alphabetically (case insensitive)
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertDecimalToRoman}
                disabled={text.length === 0}
                title="Converts Decimal to Roman numbers."
                className="menu-item"
              >
                Decimal to Roman
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertRomanToDeciman}
                disabled={text.length === 0}
                title="Converts Roman numbers to Decimal."
                className="menu-item"
              >
                Roman to Decimal
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Change Case
            </Dropdown.Toggle>
            <Dropdown.Menu className="menu-scroll" variant={`${props.mode}`}>
              <Dropdown.Item
                onClick={convertToUpperCase}
                disabled={text.length === 0}
                title="CHANGE THE CASE OF YOUR TEXT"
                className="menu-item"
              >
                UPPERCASE
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToLowerCase}
                disabled={text.length === 0}
                title="change the case of your text"
                className="menu-item"
              >
                lowercase
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToTitleCase}
                disabled={text.length === 0}
                title="Change The Case Of Your Text"
                className="menu-item"
              >
                Title Case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToReverseTitleCase}
                disabled={text.length === 0}
                title="changE thE casE oF youR texT"
                className="menu-item"
              >
                reversE titlE casE
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToInvertCase}
                disabled={text.length === 0}
                title="Change THE case OF your TEXT => cHANGE the CASE of YOUR text"
                className="menu-item"
              >
                Invert CASE
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToSentenceCase}
                disabled={text.length === 0}
                title="Change the case of your text"
                className="menu-item"
              >
                Sentence case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleToggleCase}
                disabled={text.length === 0}
                title="cHANGE tHE cASE oF yOUR tEXT"
                className="menu-item"
              >
                Toggle case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToRandomCase}
                disabled={text.length === 0}
                title="CHangE thE CasE OF yoUR teXT"
                className="menu-item"
              >
                raNDoM cASE
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToCamelCase}
                disabled={text.length === 0}
                title="changeTheCaseOfYourText"
                className="menu-item"
              >
                camelCase
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToPascalCase}
                disabled={text.length === 0}
                title="ChangeTheCaseOfYourText"
                className="menu-item"
              >
                PascalCase
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToKebabCase}
                disabled={text.length === 0}
                title="change-the-case-of-your-text"
                className="menu-item"
              >
                kebab-case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToSnakeCase}
                disabled={text.length === 0}
                title="change_the_case_of_your_text"
                className="menu-item"
              >
                snake_case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToConstantCase}
                disabled={text.length === 0}
                title="Change the case of your text"
                className="menu-item"
              >
                CONSTANT_CASE
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToDotCase}
                disabled={text.length === 0}
                title="Change.the.case.of.your.text"
                className="menu-item"
              >
                dot.case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToNoCase}
                disabled={text.length === 0}
                title="Change the case of your text"
                className="menu-item"
              >
                no case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToAlternateCase1}
                disabled={text.length === 0}
                title="ChAnGe ThE cAsE oF yOuR tExT"
                className="menu-item"
              >
                AlTeRnAtE cAsE - 1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToPascalSnakeCase}
                disabled={text.length === 0}
                title="CJAMGE_THE_CASE_OF_YOUR_TEXT"
                className="menu-item"
              >
                Pascal Snake Case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToPathCase}
                disabled={text.length === 0}
                title="CJAMGE_THE_CASE_OF_YOUR_TEXT"
                className="menu-item"
              >
                Path Case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToTrainCase}
                disabled={text.length === 0}
                title="CJAMGE_THE_CASE_OF_YOUR_TEXT"
                className="menu-item"
              >
                Train Case
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToAlternateCase2}
                disabled={text.length === 0}
                title="cHaNgE tHe CaSe Of YoUr TeXt"
                className="menu-item"
              >
                AlTeRnAtE cAsE - 2
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Generate
            </Dropdown.Toggle>
            <Dropdown.Menu className="menu-scroll" variant={`${props.mode}`}>
              <Dropdown.Item
                onClick={charFreqStr}
                title="Generate characters frequency"
                disabled={text.length === 0}
                className="menu-item"
              >
                Characters Frequency
              </Dropdown.Item>
              <Dropdown.Item
                onClick={wordFreq}
                title="Generate words frequency"
                disabled={text.length === 0}
                className="menu-item"
              >
                Words Frequency
              </Dropdown.Item>
              <Dropdown.Item
                onClick={generateDummyText}
                title="Generate dummy text"
                className="menu-item"
              >
                Dummy Text
              </Dropdown.Item>
              <Dropdown.Item
                onClick={generateRandomCharacters}
                title="Generate random characters"
                className="menu-item"
              >
                Random Characters
              </Dropdown.Item>
              <Dropdown.Item
                onClick={generateRandomSlagWords}
                title="Generate random words-slug"
                className="menu-item"
              >
                Random-Words-Slug
              </Dropdown.Item>
              <Dropdown.Item
                onClick={generateRandomNouns}
                title="Generate random nouns"
                className="menu-item"
              >
                Random Nouns
              </Dropdown.Item>
              <Dropdown.Item
                onClick={generateRandomAdjectives}
                title="Generate random adjectives"
                className="menu-item"
              >
                Random Adjectives
              </Dropdown.Item>
              <Dropdown.Item
                onClick={generateNumbersList}
                title="Generate Numbers"
                className="menu-item"
              >
                Generate Numbers
              </Dropdown.Item>
              <Dropdown.Item
                onClick={convertToHashCode}
                title="Generate Hash Code from a string"
                className="menu-item"
              >
                Hash Code
              </Dropdown.Item>
              <Dropdown.Item
                onClick={generateQuote}
                title="Generate a quote"
                className="menu-item"
              >
                Get Quote
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="d-flex align-items-center mt-1 mb-3">
          <textarea
            className="form-control"
            id="floatingTextarea output"
            style={{
              width: "100%",
              backgroundColor: `${
                props.mode === "dark"
                  ? inputDarkBackground
                  : inputLightBackground
              }`,
              color: `${props.mode === "dark" ? "white" : "black"}`,
              textAlign: "left",
            }}
            onChange={onTextChange}
            value={generatedText}
            placeholder="Enter text here."
            rows={12}
            required
          ></textarea>
          <div className="mx-1"></div>
          <textarea
            className="form-control"
            id="floatingTextarea output"
            style={{
              width: "100%",
              backgroundColor: `${
                props.mode === "dark"
                  ? outputDarkBackground
                  : outputLightBackground
              }`,
              color: `${props.mode === "dark" ? "white" : "black"}`,
            }}
            value={text.length === 0 ? "Nothing to preview!" : text}
            readOnly
            rows={12}
          ></textarea>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <motion.button
              whileTap={{
                scale: 0,
              }}
              className="btn btn-danger mx-1 btn-sm bottom-btns rounded"
              onClick={clear}
              disabled={text.length === 0}
            >
              Clear <i className="bi bi-x-lg bottom-btns-icons"></i>
            </motion.button>
            <motion.button
              whileTap={{
                scale: 0,
              }}
              className="btn btn-secondary mx-1 btn-sm bottom-btns rounded"
              onClick={pasteToTextarea}
              title="Paste the text to text area"
            >
              Paste <i className="bi bi-clipboard bottom-btns-icons"></i>
            </motion.button>
          </div>
          <div>
            <motion.button
              whileTap={{
                scale: 0,
              }}
              className={`btn btn-${
                text.length === 0 ? "secondary" : "primary"
              } mx-1 btn-sm bottom-btns rounded`}
              onClick={downloadTxtFile}
              title="Save the .txt file"
              disabled={text.length === 0}
            >
              Save <i className="bi bi-download bottom-btns-icons" />
            </motion.button>
            <motion.button
              whileTap={{
                scale: 0,
              }}
              className="btn btn-warning mx-1 btn-sm bottom-btns rounded"
              onClick={copyToClipboard}
              title="Copy the text to clipboard"
              disabled={text.length === 0}
            >
              Copy{" "}
              <i className="bi bi-clipboard-check-fill bottom-btns-icons"></i>
            </motion.button>
          </div>
        </div>
      </div>
      <hr className={`text-${props.mode === "dark" ? "light" : "dark"}`} />
      <div className="d-flex justify-content-center">
        <button
          className={`btn btn-outline-${
            props.mode === "dark" ? "light" : "dark"
          } mx-1 btn-sm statistics-btn`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
        >
          <span className="text-uppercase">Statistics</span>
        </button>

        <div
          className="offcanvas offcanvas-bottom statistics-section"
          tabIndex="-1"
          id="offcanvasBottom"
          aria-labelledby="offcanvasBottomLabel"
          style={{
            backgroundColor: `${props.mode === "dark" ? "#212529" : "#F8F9FA"}`,
            color: `${props.mode === "dark" ? "white" : "black"}`,
          }}
        >
          <div
            className="offcanvas-header d-flex justify-content-center"
            style={{
              backgroundColor: `${
                props.mode === "dark" ? "#212529" : "#F8F9FA"
              }`,
              color: `${props.mode === "dark" ? "white" : "black"}`,
            }}
          >
            <table
              className={`table table-hover table-sm table-responsive statistics-text table-${props.mode}`}
            >
              <thead>
                <tr>
                  <th scope="col" colSpan="3" className="text-center">
                    TEXT SUMMARY TABLE
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Average reading time</td>
                  <td>
                    {(text.split(" ").length * 0.0033).toFixed(1)} minutes
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Paragraphs</td>
                  <td>{text.split(/\r\n|\r|\n/).filter(Boolean).length}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Sentences</td>
                  <td>{text.split(".").filter(Boolean).length}</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Words</td>
                  <td>{text.split(/\s+/).filter(Boolean).length}</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Unique Words</td>
                  <td>{new Set(text.split(" ").filter(Boolean)).size}</td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Spaces</td>
                  <td>{text.split(" ").length - 1}</td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Characters with spaces and new lines</td>
                  <td>{text.length}</td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>Characters without spaces and new lines</td>
                  <td>{text.replace(/\s/g, "").length}</td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td>Average characters per word</td>
                  <td>
                    {text.replace(/ /g, "").length / text.split(" ").length}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className={`close-btn btn-${props.mode}`}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <hr className={`text-${props.mode === "dark" ? "light" : "dark"}`} />
    </>
  );
};

export default TextForm;
