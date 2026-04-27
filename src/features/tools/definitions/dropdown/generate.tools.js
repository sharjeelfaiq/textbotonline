import { generateSlug } from "random-word-slugs";
import { getNumbers } from "number-pro";
import { getDummyText, getRandomCharacters } from "superbstring";
import { getQuote } from "../../../../utils/quotes/getQuote";

const tools = [
  {
    id: "generateDummyText",
    kind: "dropdown",
    menuName: "Generate",
    optionName: "Generate Dummy Text",
    title: "Generate dummy text",
    optionDescription: "This option generates dummy text based on the given text.",
    order: 30,
    requiresInput: false,
    applyTo: "both",
    transitions: { output: true },
    execute: () => getDummyText(),
  },
  {
    id: "generateRandomCharacters",
    kind: "dropdown",
    menuName: "Generate",
    optionName: "Generate Random Characters",
    title: "Generate random characters",
    optionDescription:
      "This option generates random characters based on the given text.",
    order: 40,
    requiresInput: false,
    applyTo: "both",
    transitions: { output: true },
    execute: (_state, runtime) => {
      const totalChars = runtime.prompt(
        "What length of random characters do you need?"
      );
      return getRandomCharacters(totalChars);
    },
  },
  {
    id: "generateRandomSlagWords",
    kind: "dropdown",
    menuName: "Generate",
    optionName: "Generate Random Words-Slug",
    title: "Generate random words-slug",
    optionDescription:
      "This option generates random words-slug based on the given text.",
    order: 50,
    requiresInput: false,
    applyTo: "both",
    transitions: { output: true },
    execute: (_state, runtime) => {
      const totalSlugWords = Number(
        runtime.prompt(
          "How many random words slug do you need? Enter a number:"
        )
      );
      return generateSlug(totalSlugWords);
    },
  },
  {
    id: "generateRandomNouns",
    kind: "dropdown",
    menuName: "Generate",
    optionName: "Generate Random Nouns",
    title: "Generate random nouns",
    optionDescription:
      "This option generates random nouns based on the given text.",
    order: 60,
    requiresInput: false,
    applyTo: "both",
    transitions: { output: true },
    execute: (_state, runtime) => {
      const totalNouns = Number(
        runtime.prompt("How many random nouns do you need? Enter a number:")
      );
      return generateSlug(totalNouns, { format: "noun" });
    },
  },
  {
    id: "generateRandomAdjectives",
    kind: "dropdown",
    menuName: "Generate",
    optionName: "Generate Random Adjectives",
    title: "Generate random adjectives",
    optionDescription:
      "This option generates random adjectives based on the given text.",
    order: 70,
    requiresInput: false,
    applyTo: "both",
    transitions: { output: true },
    execute: (_state, runtime) => {
      const totalAdjectives = Number(
        runtime.prompt(
          "How many random adjectives do you need? Enter a number:"
        )
      );
      return generateSlug(totalAdjectives, { format: "adjective" });
    },
  },
  {
    id: "generateNumbersList",
    kind: "dropdown",
    menuName: "Generate",
    optionName: "Generate Numbers",
    title: "Generate numbers",
    optionDescription:
      "This option generates random numbers based on the given text.",
    order: 80,
    requiresInput: false,
    applyTo: "both",
    transitions: { output: true },
    execute: (_state, runtime) => {
      const startingNum = runtime.prompt(
        "The STARTING Number must be SMALLER than the ENDING Number\nEnter the starting number:"
      );
      const endingNum = runtime.prompt(
        "The ENDING Number must be GREATER than the STARTING Number\nEnter the ending number:"
      );
      return getNumbers(startingNum, endingNum);
    },
  },
  {
    id: "generateQuote",
    kind: "dropdown",
    menuName: "Generate",
    optionName: "Generate Quote",
    title: "Generate a quote",
    optionDescription:
      "This option generates a quote based on the given text.",
    order: 90,
    requiresInput: false,
    applyTo: "both",
    transitions: { output: true },
    execute: () => {
      const { statement, author } = getQuote();
      return `${statement}\n${author}`;
    },
  },
];

export default tools;
