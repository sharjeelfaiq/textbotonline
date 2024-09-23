import { handleTextManipulation } from "./ManipulationFunctions";

const createOption = (menuName, optionName, title, description, type) => ({
  menuName,
  optionName,
  title,
  description,
  action:
    (inputText, props, setOutputText, setInputText, transitionOutputTextarea) =>
    () =>
      handleTextManipulation(
        type,
        inputText,
        props,
        setOutputText,
        setInputText,
        transitionOutputTextarea
      ),
});

const createMenuOptions = (menuName, options) =>
  options.map(([optionName, title, description, type]) =>
    createOption(menuName, optionName, title, description, type)
  );

export const dropdownOptionsProps = (
  inputText,
  props,
  setOutputText,
  setInputText,
  transitionOutputTextarea
) =>
  [
    ...createMenuOptions("Edit", [
      [
        "Split Text",
        "Split all words to new lines.",
        "This option splits each word of the given text on a new line.",
        "splitInput",
      ],
      [
        "Join Text",
        "Join all the text to a single line.",
        "This option joins all of the words in separate lines to a single string.",
        "joinInput",
      ],
      [
        "Remove Extra Spaces",
        "Removes extra spaces, new lines, tab spaces",
        "This option removes any extra space present in the text.",
        "removeExtraSpaces",
      ],
      [
        "Remove All Spaces",
        "Removes all the spaces, new lines, tab spaces",
        "This option removes all the spaces, new lines, tab spaces.",
        "removeAllSpaces",
      ],
      [
        "Remove All Symbols",
        "Removes all the symbols",
        "This option removes all the symbols.",
        "removeAllSymbols",
      ],
      [
        "Duplicate",
        "Duplicate text",
        "This option duplicates the given text.",
        "duplicate",
      ],
      [
        "Reverse",
        "Reverse text",
        "This option reverses the given text.",
        "reverse",
      ],
      [
        "Slugify",
        "Slugify text",
        "This option converts the given text to a slug.",
        "slugify",
      ],
      [
        "Truncate",
        "Truncate the text up to desired length",
        "This option truncates the given text up to the desired length.",
        "truncate",
      ],
      [
        "Paragraph to single line",
        "Convert paragraphs to single line",
        "This option converts paragraphs to a single line.",
        "paragraphToSingleLine",
      ],
      [
        "Alphabetize Text",
        "Change the order of words in text as A-Z",
        "This option changes the order of words in the given text as A-Z.",
        "alphabetize",
      ],
      [
        "Zalgo",
        "Apply Zalgo effect",
        "This option applies the Zalgo effect to the given text.",
        "zalgo",
      ],
      [
        "Rotate 13",
        "Rotate 13 decoder",
        "This option rotates the given text by 13 places.",
        "rotate13",
      ],
      [
        "Add Line Number",
        "Add line number to each line",
        "This option adds line number to each line of the given text.",
        "addLineNum",
      ],
      [
        "Encode URL",
        "Encode to URL",
        "This option encodes the given text to a URL.",
        "encodeUri",
      ],
      [
        "Decode the URL",
        "Decode the URL",
        "This option decodes the given URL.",
        "decodeUri",
      ],
      [
        "Base64 Encode",
        "Encode to Base64",
        "This option encodes the given text to Base64.",
        "base64Encode",
      ],
      [
        "Base64 Decode",
        "Decode the Base64",
        "This option decodes the given Base64 text.",
        "base64Decode",
      ],
      [
        "UNIX to Date",
        "Convert from Unix to date",
        "This option converts the given Unix timestamp to a date.",
        "unixToDate",
      ],
      [
        "UNIX to Time",
        "Convert from Unix to time",
        "This option converts the given Unix timestamp to a time.",
        "unixToTime",
      ],
      [
        "Format Numbers",
        "Adds comma to numbers after every three digits",
        "This option adds a comma to numbers after every three digits.",
        "formatNumbers",
      ],
      [
        "Extract Text",
        "Extract the text from the given string",
        "This option extracts the text from the given string.",
        "extractText",
      ],
      [
        "Extract Numbers",
        "Extract the numbers from the given string",
        "This option extracts the numbers from the given string.",
        "extractNumbers",
      ],
      [
        "Add Prefix",
        "Add prefix to each line",
        "This option adds a prefix to each line of the given text.",
        "addPrefix",
      ],
      [
        "Add Suffix",
        "Add suffix to each line",
        "This option adds a suffix to each line of the given text.",
        "addSuffix",
      ],
      [
        "Sort Lines SENS",
        "Sort lines in the alphabetical order",
        "This option sorts the lines of the given text in alphabetical order.",
        "sortLinesSENS",
      ],
      [
        "Sort Lines INSENS",
        "Sort lines in the alphabetical order (case insensitive)",
        "This option sorts the lines of the given text in alphabetical order.",
        "sortLinesINSENS",
      ],
      [
        "Sort Lines Reverse SENS",
        "Sort lines in the reverse alphabetical order",
        "This option sorts the lines of the given text in reverse alphabetical order.",
        "sortLinesReverseSENS",
      ],
      [
        "Sort Lines Reverse INSENS",
        "Sort lines in the reverse alphabetical order (case insensitive)",
        "This option sorts the lines of the given text in reverse alphabetical order.",
        "sortLinesReverseINSENS",
      ],
      [
        "Convert Decimal to Roman",
        "Converts Decimal to Roman numbers.",
        "This option converts the given decimal number to a Roman numeral.",
        "convertDecimalToRoman",
      ],
      [
        "Convert Roman to Decimal",
        "Converts Roman numbers to Decimal.",
        "This option converts the given Roman numeral to a decimal number.",
        "convertRomanToDecimal",
      ],
      [
        "Convert to Hash Code",
        "Convert to Hash Code.",
        "This option converts the given text to a hash code.",
        "convertToHashCode",
      ],
    ]),
    ...createMenuOptions("Change Case", [
      [
        "Uppercase",
        "Convert to Uppercase",
        "This option converts the given text to uppercase.",
        "uppercase",
      ],
      [
        "Lowercase",
        "Convert to Lowercase",
        "This option converts the given text to lowercase.",
        "lowercase",
      ],
      [
        "Titlecase",
        "Convert to Titlecase",
        "This option converts the given text to titlecase.",
        "titlecase",
      ],
      [
        "Reverse Titlecase",
        "Convert to Reverse Titlecase",
        "This option converts the given text to reverse titlecase.",
        "reverseTitleCase",
      ],
      [
        "Invert Case",
        "Convert to Invert Case",
        "This option converts the given text to invert case.",
        "invertcase",
      ],
      [
        "Sentence Case",
        "Convert to Sentence Case",
        "This option converts the given text to sentence case.",
        "sentencecase",
      ],
      [
        "Toggle Case",
        "Convert to Toggle Case",
        "This option converts the given text to toggle case.",
        "togglecase",
      ],
      [
        "Random Case",
        "Convert to Random Case",
        "This option converts the given text to random case.",
        "randomcase",
      ],
      [
        "Camel Case",
        "Convert to Camel Case",
        "This option converts the given text to camel case.",
        "camelcase",
      ],
      [
        "Pascal Case",
        "Convert to Pascal Case",
        "This option converts the given text to pascal case.",
        "pascalcase",
      ],
      [
        "Kebab Case",
        "Convert to Kebab Case",
        "This option converts the given text to kebab case.",
        "kebabcase",
      ],
      [
        "Snake Case",
        "Convert to Snake Case",
        "This option converts the given text to snake case.",
        "snakecase",
      ],
      [
        "Constant Case",
        "Convert to Constant Case",
        "This option converts the given text to constant case.",
        "constantcase",
      ],
      [
        "Dot Case",
        "Convert to Dot Case",
        "This option converts the given text to dot case.",
        "dotcase",
      ],
      [
        "No Case",
        "Convert to No Case",
        "This option converts the given text to no case.",
        "nocase",
      ],
      [
        "Alternate Case 1",
        "Convert to Alternate Case 1",
        "This option converts the given text to alternate case 1.",
        "alternatecase1",
      ],
      [
        "Path Case",
        "Convert to Path Case",
        "This option converts the given text to path case.",
        "pathcase",
      ],
      [
        "Train Case",
        "Convert to Train Case",
        "This option converts the given text to train case.",
        "traincase",
      ],
      [
        "Alternate Case 2",
        "Convert to Alternate Case 2",
        "This option converts the given text to alternate case 2.",
        "alternatecase2",
      ],
    ]),
    ...createMenuOptions("Generate", [
      [
        "Generate Characters Frequency",
        "Generate characters frequency",
        "This option generates the frequency of characters in the given text.",
        "charFreqStr",
      ],
      [
        "Generate Words Frequency",
        "Generate words frequency",
        "This option generates the frequency of words in the given text.",
        "wordFreq",
      ],
      [
        "Generate Dummy Text",
        "Generate dummy text",
        "This option generates dummy text based on the given text.",
        "generateDummyText",
      ],
      [
        "Generate Random Characters",
        "Generate random characters",
        "This option generates random characters based on the given text.",
        "generateRandomCharacters",
      ],
      [
        "Generate Random Words-Slug",
        "Generate random words-slug",
        "This option generates random words-slug based on the given text.",
        "generateRandomSlagWords",
      ],
      [
        "Generate Random Nouns",
        "Generate random nouns",
        "This option generates random nouns based on the given text.",
        "generateRandomNouns",
      ],
      [
        "Generate Random Adjectives",
        "Generate random adjectives",
        "This option generates random adjectives based on the given text.",
        "generateRandomAdjectives",
      ],
      [
        "Generate Numbers",
        "Generate numbers",
        "This option generates random numbers based on the given text.",
        "generateNumbersList",
      ],
      [
        "Generate Quote",
        "Generate a quote",
        "This option generates a quote based on the given text.",
        "generateQuote",
      ],
    ]),
  ].map((option) => ({
    ...option,
    action: option.action(
      inputText,
      props,
      setOutputText,
      setInputText,
      transitionOutputTextarea
    ),
  }));
