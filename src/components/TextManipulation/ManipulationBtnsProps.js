import { handleTextManipulation } from "./ManipulationFunctions";

export const manipulationButtonsProps = (
  inputText,
  props,
  setOutputText,
  setInputText,
  transitionOutputTextarea
) => {
  return [
    {
      menuName: "Edit",
      optionName: "Split Text",
      title: "Split all words to new lines.",
      action: () =>
        handleTextManipulation(
          "splitInput",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Join Text",
      title: "Join all the text to a single line.",
      action: () =>
        handleTextManipulation(
          "joinInput",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Remove Extra Spaces",
      title: "Removes extra spaces, new ines, tab spaces",
      action: () =>
        handleTextManipulation(
          "removeExtraSpaces",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Remove All Spaces",
      title: "Removes all the spaces, new ines, tab spaces",
      action: () =>
        handleTextManipulation(
          "removeAllSpaces",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Remove All Symbols",
      title: "Removes all the symbols",
      action: () =>
        handleTextManipulation(
          "removeAllSymbols",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Duplicate",
      title: "Duplicate text",
      action: () =>
        handleTextManipulation(
          "duplicate",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Reverse",
      title: "Reverese text",
      action: () =>
        handleTextManipulation(
          "reverse",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Slugify",
      title: "Slugify text",
      action: () =>
        handleTextManipulation(
          "slugify",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Truncate",
      title: "Truncate the text upto desired length",
      action: () =>
        handleTextManipulation(
          "truncate",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Paragraph to single line",
      title: "Convert paragraphs to single line",
      action: () =>
        handleTextManipulation(
          "paragraphToSingleLine",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Alphabetize Text",
      title: "Change the order of words in text as A-Z",
      action: () =>
        handleTextManipulation(
          "alphabetize",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Zalgo",
      title: "Apply Zalgo affect",
      action: () =>
        handleTextManipulation(
          "zalgo",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Rotate 13",
      title: "Rotate 13 decoder",
      action: () =>
        handleTextManipulation(
          "rotate13",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Add Line Number",
      title: "Add line number to each line",
      action: () =>
        handleTextManipulation(
          "addLineNum",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Encode URL",
      title: "Encode to URL",
      action: () =>
        handleTextManipulation(
          "encodeUri",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Decode the URL",
      title: "Decode the URL",
      action: () =>
        handleTextManipulation(
          "decodeUri",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Base64 Encode",
      title: "Encode to URL",
      action: () =>
        handleTextManipulation(
          "base64Encode",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Base64 Decode",
      title: "Decode the URL",
      action: () =>
        handleTextManipulation(
          "base64Decode",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "UNIX to Date",
      title: "Convert from Unix to date",
      action: () =>
        handleTextManipulation(
          "unixToDate",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "UNIX to Time",
      title: "Convert from Unix to time",
      action: () =>
        handleTextManipulation(
          "unixToTime",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Format Numbers",
      title: "Adds comma to numbers after every three digits",
      action: () =>
        handleTextManipulation(
          "formatNumbers",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Extract Text",
      title: "Extract the text from the given string",
      action: () =>
        handleTextManipulation(
          "extractText",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Extract Numbers",
      title: "Extract the numbers from the given string",
      action: () =>
        handleTextManipulation(
          "extractNumbers",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Add Prefix",
      title: "Add prefix to each line",
      action: () =>
        handleTextManipulation(
          "addPrefix",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Add Suffix",
      title: "Add suffix to each line",
      action: () =>
        handleTextManipulation(
          "addSuffix",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Sort Lines SENS",
      title: "Sort lines in the aphabetical order",
      action: () =>
        handleTextManipulation(
          "sortLinesSENS",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Sort Lines INSENS",
      title: "Sort lines in the aphabetical order (case insensitive)",
      action: () =>
        handleTextManipulation(
          "sortLinesINSENS",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Sort Lines Reverse SENS",
      title: "Sort lines in the reverse aphabetical order",
      action: () =>
        handleTextManipulation(
          "sortLinesReverseSENS",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Sort Lines Reverse INSENS",
      title: "Sort lines in the reverse aphabetical order (case insensitive)",
      action: () =>
        handleTextManipulation(
          "sortLinesReverseINSENS",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Convert Decimal to Roman",
      title: "Converts Decimal to Roman numbers.",
      action: () =>
        handleTextManipulation(
          "convertDecimalToRoman",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Convert Roman to Decimal",
      title: "Converts Roman numbers to Decimal.",
      action: () =>
        handleTextManipulation(
          "convertRomanToDecimal",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Convert to Hash Code",
      title: "Convert to Hash Code.",
      action: () =>
        handleTextManipulation(
          "convertToHashCode",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Edit",
      optionName: "Hash Code",
      title: "Generate Hash Code from a string",
      action: () =>
        handleTextManipulation(
          "convertToHashCode",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Uppercase",
      title: "Convert to Uppercase",
      action: () =>
        handleTextManipulation(
          "uppercase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Lowercase",
      title: "Convert to Lowercase",
      action: () =>
        handleTextManipulation(
          "lowercase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Titlecase",
      title: "Convert to Titlecase",
      action: () =>
        handleTextManipulation(
          "titlecase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Reverse Titlecase",
      title: "Convert to Reverse Titlecase",
      action: () =>
        handleTextManipulation(
          "reverseTitleCase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Invert Case",
      title: "Convert to Invert Case",
      action: () =>
        handleTextManipulation(
          "invertcase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Sentence Case",
      title: "Convert to Sentence Case",
      action: () =>
        handleTextManipulation(
          "sentencecase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Toggle Case",
      title: "Convert to Toggle Case",
      action: () =>
        handleTextManipulation(
          "togglecase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Random Case",
      title: "Convert to Random Case",
      action: () =>
        handleTextManipulation(
          "randomcase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Camel Case",
      title: "Convert to Camel Case",
      action: () =>
        handleTextManipulation(
          "camelcase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Pascal Case",
      title: "Convert to Pascal Case",
      action: () =>
        handleTextManipulation(
          "pascalcase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Kebab Case",
      title: "Convert to Kebab Case",
      action: () =>
        handleTextManipulation(
          "kebabcase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Snake Case",
      title: "Convert to Snake Case",
      action: () =>
        handleTextManipulation(
          "snakecase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Constant Case",
      title: "Convert to Constant Case",
      action: () =>
        handleTextManipulation(
          "constantcase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Dot Case",
      title: "Convert to Dot Case",
      action: () =>
        handleTextManipulation(
          "dotcase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "No Case",
      title: "Convert to No Case",
      action: () =>
        handleTextManipulation(
          "nocase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Alternate Case 1",
      title: "Convert to Alternate Case 1",
      action: () =>
        handleTextManipulation(
          "alternatecase1",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Path Case",
      title: "Convert to Path Case",
      action: () =>
        handleTextManipulation(
          "pathcase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Train Case",
      title: "Convert to Train Case",
      action: () =>
        handleTextManipulation(
          "traincase",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Change Case",
      optionName: "Alternate Case 2",
      title: "Convert to Alternate Case 2",
      action: () =>
        handleTextManipulation(
          "alternatecase2",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Generate",
      optionName: "Generate Characters Frequency",
      title: "Generate characters frequency",
      action: () =>
        handleTextManipulation(
          "charFreqStr",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Generate",
      optionName: "Generate Words Frequency",
      title: "Generate words frequency",
      action: () =>
        handleTextManipulation(
          "wordFreq",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Generate",
      optionName: "Generate Dummy Text",
      title: "Generate dummy text",
      action: () =>
        handleTextManipulation(
          "generateDummyText",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Generate",
      optionName: "Generate Random Characters",
      title: "Generate random characters",
      action: () =>
        handleTextManipulation(
          "generateRandomCharacters",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Generate",
      optionName: "Generate Random Words-Slug",
      title: "Generate random words-slug",
      action: () =>
        handleTextManipulation(
          "generateRandomSlagWords",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Generate",
      optionName: "Generate Random Nouns",
      title: "Generate random nouns",
      action: () =>
        handleTextManipulation(
          "generateRandomNouns",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Generate",
      optionName: "Generate Random Adjectives",
      title: "Generate random adjectives",
      action: () =>
        handleTextManipulation(
          "generateRandomAdjectives",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Generate",
      optionName: "Generate Numbers",
      title: "Generate numbers",
      action: () =>
        handleTextManipulation(
          "generateNumbersList",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
    {
      menuName: "Generate",
      optionName: "Generate Quote",
      title: "Generate a quote",
      action: () =>
        handleTextManipulation(
          "generateQuote",
          inputText,
          props,
          setOutputText,
          setInputText,
          transitionOutputTextarea
        ),
    },
  ];
};
