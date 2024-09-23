import React from "react";
import { motion } from "framer-motion";
import AccordionItems from "./AccordionItem";
import { manipulationButtonsProps } from "../TextManipulation/manipulationBtnsProps";

function About(props) {
  const manipulationBtnsProps = manipulationButtonsProps();

  const metrics = [
    {
      label: "Reading time (Slow)",
      description: "Average reading time of your text.",
    },
    {
      label: "Reading time (Average)",
      description: "Average reading time at a normal pace.",
    },
    {
      label: "Reading time (Fast)",
      description: "Average reading time for quick readers.",
    },
    { label: "Paragraphs", description: "Count of paragraphs in the text." },
    { label: "Sentences", description: "Count of sentences in the text." },
    { label: "Words", description: "Total number of words in the text." },
    {
      label: "Characters",
      description: "Total character count including spaces and new lines.",
    },
    {
      label: "Unique Words",
      description: "Count of distinct words in the text.",
    },
    {
      label: "Longest Word",
      description: "The word with the maximum length in the text.",
    },
    {
      label: "Shortest Word",
      description: "The word with the minimum length in the text.",
    },
    {
      label: "Average Word Length",
      description: "Average number of characters per word.",
    },
    {
      label: "Complex Words",
      description: "Count of words with more than three syllables.",
    },
    {
      label: "Lexical Density",
      description: "Percentage of unique words relative to total words.",
    },
    {
      label: "Passive Voice Sentences",
      description: "Count of sentences written in passive voice.",
    },
    {
      label: "Longest Sentence",
      description: "The sentence with the maximum length in words.",
    },
    {
      label: "Shortest Sentence",
      description: "The sentence with the minimum length in words.",
    },
    {
      label: "Complex Sentences (20+ words)",
      description: "Count of sentences with 20 or more words.",
    },
    {
      label: "Hapax Legomena",
      description: "Count of words that appear only once.",
    },
    {
      label: "Average Sentence Length",
      description: "Average number of words per sentence.",
    },
    {
      label: "Unique Word Ratio",
      description: "Percentage of unique words in relation to total words.",
    },
    {
      label: "Flesch-Kincaid Grade Level",
      description: "Readability score based on sentence and syllable count.",
    },
    {
      label: "Readability",
      description: "Qualitative assessment of the text's readability.",
    },
  ];
  return (
    <>
      <h1
        className={`text-center mb-4 text-${
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
        <a
          href="http://textbotonline.netlify.app"
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          http://textbotonline.netlify.app
        </a>{" "}
        - the most comprehensive all-in-one text tool website today.
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
        that allows you to edit your text online or generate different kinds of
        text online. Moreover, it tells you the statistics or summary of your
        text. Textbotonline tells you the average time to read your text. Also,
        you can know the number of paragraphs, sentences, words, unique words,
        spaces, characters with empty spaces and newlines, and characters
        without empty spaces and newlines in your text. You can visit the
        website to see all the features it has available.
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
              <ul style={{ listStyleType: "none" }} className="lh-lg">
                {manipulationBtnsProps.map(
                  (item, index) =>
                    item.menuName === "Edit" && (
                      <AccordionItems
                        key={index}
                        title={item.optionName}
                        description={item.description}
                      />
                    )
                )}
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
              <ul style={{ listStyleType: "none" }} className="lh-lg">
                {manipulationBtnsProps.map(
                  (item, index) =>
                    item.menuName === "Change Case" && (
                      <AccordionItems
                        key={index}
                        title={item.optionName}
                        description={item.description}
                      />
                    )
                )}
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
              <ul style={{ listStyleType: "none" }} className="lh-lg">
                {manipulationBtnsProps.map(
                  (item, index) =>
                    item.menuName === "Generate" && (
                      <AccordionItems
                        key={index}
                        title={item.optionName}
                        description={item.description}
                      />
                    )
                )}
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
              <ul style={{ listStyleType: "none" }} className="lh-lg">
                {metrics.map((metric, index) => (
                  <motion.li
                    key={index}
                    style={{ width: "80%", borderRadius: "5px" }}
                  >
                    <small>{metric.description}</small>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default About;
