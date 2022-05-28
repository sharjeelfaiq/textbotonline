import React from "react";
import { motion } from "framer-motion";

function About(props) {
  return (
    <>
      <h1
        className={`mt-5 mb-4 text-center text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        <span className="text-uppercase font-monospace">about</span>
      </h1>
      <h6
        className={`lh-lg text-justify text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        Welcome to{" "}
        <a href="http://textbotonline.com" style={{ textDecoration: "none" }}>
          http://www.textbotonline.com
        </a>{" "}
        - the most comprehensive text tool website on internet today.
      </h6>
      <p
        className={`lh-lg text-justify text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        Textbotonline is a{" "}
        <span className="text-uppercase">
          <strong>free online text utility web application or a website</strong>
        </span>{" "}
        that allow you to edit your text online or generate different kinds of
        text online. Moreover, it tells you the statistics or summary of your
        text. Textbotonline tells you the average time to read your text. Also,
        you can know about the number of paragraphs, sentences, words, unique
        wourds, spaces, characters with empty spaces and new lines and
        characters without empty spaces and new lines in your text.
      </p>
      <div
        className="accordion my-4"
        id="accordionPanelsStayOpenExample"
        style={{
          backgroundColor: `${props.mode === "dark" ? "#242526" : "white"}`,
          color: `${props.mode === "dark" ? "white" : "black"}`,
        }}
      >
        <div
          className="accordion-item"
          style={{
            backgroundColor: `${props.mode === "dark" ? "#242526" : "white"}`,
            color: `${props.mode === "dark" ? "white" : "black"}`,
          }}
        >
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
              style={{
                backgroundColor: `${
                  props.mode === "dark" ? "#242526" : "white"
                }`,
                color: `${props.mode === "dark" ? "white" : "black"}`,
              }}
              title="Click to see all available options"
            >
              <strong>Edit Your Text</strong>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <ul style={{ listStyleType: "none" }}>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Split Text : </strong>
                    Splits each word of the given text on a new line.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Join Text : </strong>
                    Joins all of the words in separate lines to a single string.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Remove Extra Spaces : </strong>
                    Removes any extra space present in the text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Remove All Spaces : </strong>
                    Removes all spaces from the text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Remove All Symbols : </strong>
                    Removes all symbols from the text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Duplicate Text : </strong>
                    Duplicates the text the number of times you need.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Reverse Text : </strong>
                    Reverses the text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Slugify Text : </strong>
                    Slugifies the text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Truncate Text : </strong>
                    Shorts the text content to the desired length.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Change Paragraphs to Single-line Text : </strong>
                    Converts all paragraphs to a single-line text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Alphabetize Text : </strong>
                    Arranges the words in your text in alphabetic order.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Rotate 13 : </strong>
                    Obscures text by replacing each letter with the letter
                    thirteen places down the alphabet.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Zalgo Effect : </strong>
                    Converts normal text into zalgo text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Add Line Number : </strong>
                    Adds line numbers to all the lines in the given text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Encode URL : </strong>
                    Encodes the given string into a url.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Decode URL : </strong>
                    Decodes the URL into a text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Base64 Encode : </strong>
                    Creates a Base64-encoded ASCII string from a binary string.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Base64 Decode : </strong>
                    Decodes a string of data which has been encoded using Base64
                    encoding.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>UNIX Timestamp to Date : </strong>
                    Converts unix timestamp to date.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>UNIX Timestamp to Time : </strong>
                    Converts unix timestamp to time.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Format Numbers : </strong>
                    Adds comma to numbers after every three digits.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Extract Text : </strong>
                    Extract all the text from the given text along with{" "}
                    <em>
                      <b>"/" (forward slash)</b>
                    </em>
                    .
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Extract Numbers : </strong>
                    Extract all the numbers from the given text along with{" "}
                    <em>
                      <b>"/" (forward slash)</b>
                    </em>
                    .
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Sort Lines - 1 : </strong>
                    Sort lines of the given text in the alphabetical order
                    <b>
                      -<em>Case Sensitive</em>
                    </b>
                    .
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Sort Lines - 2 : </strong>
                    Sort lines of the given text in the alphabetical order
                    <b>
                      -<em>Case Insensitive</em>
                    </b>
                    .
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Reverse Sort Lines - 1 : </strong>
                    Sort lines of the given text in the reverse alphabetical
                    order
                    <b>
                      -<em>Case Sensitive</em>
                    </b>
                    .
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Reverse Sort Lines - 2 : </strong>
                    Sort lines of the given text in the reverse alphabetical
                    order
                    <b>
                      -<em>Case Insensitive</em>
                    </b>
                    .
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Decimal To Roman : </strong>
                    Converts any entered decimal to a corresponding roman
                    number.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Roman To Decimal : </strong>
                    Converts any entered roman number to a corresponding
                    decimal.
                  </small>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="accordion-item"
          style={{
            backgroundColor: `${props.mode === "dark" ? "#242526" : "white"}`,
            color: `${props.mode === "dark" ? "white" : "black"}`,
          }}
        >
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
              style={{
                backgroundColor: `${
                  props.mode === "dark" ? "#242526" : "white"
                }`,
                color: `${props.mode === "dark" ? "white" : "black"}`,
              }}
              title="Click to see all available options"
            >
              <strong>Change The Case Of Your Text</strong>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="accordion-body">
              <ul style={{ listStyleType: "none" }}>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Uppercase : </strong>
                    Capitalizes letters as opposed to small letters (lower
                    case).
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Lowercase : </strong>
                    Decapitalizes letters as opposed to capital letters (upper
                    case).
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Title case : </strong>
                    Capitalizes the first letter of each word.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Reverse Title case : </strong>
                    Capitalizes the last letter of each word.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Invert case : </strong>
                    The opposite case will be selected (instead of uppercase -
                    lowercase, instead of lowercase - uppercase).
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Sentence case : </strong>
                    Capitalizes the first letter of each sentence.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Toggle case : </strong>
                    Decapitalizes the first letter of all words and capitalizes
                    the rest.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Random case : </strong>
                    Capitalizes and decapitalizes all letters in the text in a
                    random sequence.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>camelCase : </strong>
                    CamelCase Words are written without spaces, and the first
                    letter of each word is capitalized while the first letter of
                    the inital word is small.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>PascalCase : </strong>
                    The first letter of each word is capitalized.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>kebab-case : </strong>
                    The spaces between words are replaced with a dash.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>snake_case : </strong>
                    Snake case is basically a style of writing strings by
                    replacing the spaces with '_' and converting the first
                    letter of each word to lowercase.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Alternative case - 1 : </strong>
                    Capitalizes the initial letter and from there on the cases
                    alternate between uppercase and lowercase.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Alternative case - 2 : </strong>
                    Decapitalizes the initial letter and from there on the cases
                    alternate between uppercase and lowercase.
                  </small>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="accordion-item"
          style={{
            backgroundColor: `${props.mode === "dark" ? "#242526" : "white"}`,
            color: `${props.mode === "dark" ? "white" : "black"}`,
          }}
        >
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
              style={{
                backgroundColor: `${
                  props.mode === "dark" ? "#242526" : "white"
                }`,
                color: `${props.mode === "dark" ? "white" : "black"}`,
              }}
              title="Click to see all available options"
            >
              <strong>Generate Different Kinds Of Text</strong>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              <ul style={{ listStyleType: "none" }}>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Characters Frequency : </strong>Calculates the
                    occurrences of all characters in a text document.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Words Frequency : </strong>Calculates the
                    occurrences of all words in a text document.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Characters Frequency : </strong>Calculates the
                    occurrences of all characters in a text document.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Dummy Text : </strong>Generates the dummy text.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Random Characters : </strong>Generates random
                    characters of your desired length.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Random Words : </strong>Generates random words of
                    your desired length.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Random-Words-Slug : </strong>Generates
                    random-words-slug of your desired length.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Random Nouns : </strong>Generates random nouns of
                    your desired length.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Random Adjectives : </strong>Generates random
                    adjectives of your desired length.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Numbers : </strong>Generates numbers in sequence of
                    your desired length.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Hash Code : </strong>Generates the hash code
                    corresponding to the given string.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    <strong>Random Quotes Online : </strong>Generates a new
                    quote every single time.
                  </small>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>{" "}
        <div
          className="accordion-item"
          style={{
            backgroundColor: `${props.mode === "dark" ? "#242526" : "white"}`,
            color: `${props.mode === "dark" ? "white" : "black"}`,
          }}
        >
          <h2 className="accordion-header" id="panelsStayOpen-headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseFour"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseFour"
              style={{
                backgroundColor: `${
                  props.mode === "dark" ? "#242526" : "white"
                }`,
                color: `${props.mode === "dark" ? "white" : "black"}`,
              }}
              title="Click to see all available options"
            >
              <strong>Know The Statistics/Summary of Your Text</strong>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingFour"
          >
            <div className="accordion-body">
              <ul style={{ listStyleType: "none" }}>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>Average reading time of your text.</small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>Paragraphs count.</small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>Sentences count.</small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>Words count.</small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>Unique Words count.</small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>Spaces count.</small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    Characters with empty spaces and new lines count.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>
                    Characters without empty spaces and new lines count.
                  </small>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  style={{ width: "80%", borderRadius: "5px" }}
                >
                  <small>Average characters per word.</small>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>{" "}
      </div>
      <p
        className={`lh-lg text-justify text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        Here, you can upload your text file if your file is too big or download
        the converted text file if you don't want or wish to copy the converted
        text.
      </p>
      <p
        className={`lh-lg text-justify text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        Moreover, you can choose to work in{" "}
        <span className="text-uppercase">
          <strong>Dark Mode</strong>
        </span>{" "}
        that releases the stress on your eyes while working for a longer time.
      </p>
      <p
        className={`lh-lg text-justify text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        Never forget to share this online text tool which is totally free to
        use.
      </p>
    </>
  );
}

export default About;
