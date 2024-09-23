import React from "react";
import { aboutText, metrics } from "./About.js";
import AccordionItems from "./AccordionItem";

function About(props) {
  return (
    <>
      <h1
        className={`text-center mb-4 text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >
        <span className="text-uppercase font-monospace">about</span>
      </h1>
      <p
        className={`lh-lg text-justify text-${
          props.mode === "light" ? "dark" : "light"
        }`}
        dangerouslySetInnerHTML={{ __html: aboutText }}
      />
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
              <AccordionItems menu={"Edit"} />
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
              <AccordionItems menu={"Change Case"} />
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
              <AccordionItems menu={"Generate"} />
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
                  <li key={index} style={{ width: "80%", borderRadius: "5px" }}>
                    <small>{metric.description}</small>
                  </li>
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
