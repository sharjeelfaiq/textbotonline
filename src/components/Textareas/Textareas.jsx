// Textareas.jsx

import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { motion } from "framer-motion";
import TextManipulationButton from "../TextManipulation/TextManipulationButton.jsx";
import { manipulationButtonsProps } from "../TextManipulation/ManipulationBtnsProps.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/TextareaAndStats.css";
import Statistics from "../Statistics/Statistics.jsx";
import ActionButton from "../ActionButton/ActionButton.jsx";
import {
  downloadTextFile,
  clearTextarea,
  copyToClipboard,
  pasteToTextarea,
} from "../ActionButton/ActionButton.js";

const TextareaAndStats = (props) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputDarkBackground, setInputDarkBackground] = useState("#242526");
  const [outputDarkBackground, setOutputDarkBackground] = useState("#242526");
  const [inputLightBackground, setInputLightBackground] = useState("white");
  const [outputLightBackground, setOutputLightBackground] = useState("white");

  const timeoutDuration = 280;

  let inputTimeouts = [];
  let outputTimeouts = [];

  function clearInputTimeouts() {
    inputTimeouts.forEach((timeout) => clearTimeout(timeout));
    inputTimeouts = [];
  }

  function clearOutputTimeouts() {
    outputTimeouts.forEach((timeout) => clearTimeout(timeout));
    outputTimeouts = [];
  }

  function transitionInputTextarea() {
    clearInputTimeouts();

    setInputDarkBackground("#CED4DA");
    inputTimeouts.push(
      setTimeout(() => {
        setInputDarkBackground("#242526");
      }, timeoutDuration)
    );

    setInputLightBackground("#CED4DA");
    inputTimeouts.push(
      setTimeout(() => {
        setInputLightBackground("white");
      }, timeoutDuration)
    );
  }

  function transitionOutputTextarea() {
    clearOutputTimeouts();

    setOutputDarkBackground("#CED4DA");
    outputTimeouts.push(
      setTimeout(() => {
        setOutputDarkBackground("#242526");
      }, timeoutDuration)
    );

    setOutputLightBackground("#CED4DA");
    outputTimeouts.push(
      setTimeout(() => {
        setOutputLightBackground("white");
      }, timeoutDuration)
    );
  }

  const inputTextAreaStyle = {
    width: "100%",
    backgroundColor:
      props.mode === "dark" ? inputDarkBackground : inputLightBackground,
    color: `${props.mode === "dark" ? "white" : "black"}`,
    textAlign: "left",
  };

  const outputTextAreaStyle = {
    width: "100%",
    backgroundColor:
      props.mode === "dark" ? outputDarkBackground : outputLightBackground,
    color: `${props.mode === "dark" ? "white" : "black"}`,
    textAlign: "left",
  };

  const actionButtonsProps = [
    [
      {
        action: () =>
          pasteToTextarea(
            setInputText,
            setOutputText,
            transitionInputTextarea,
            props
          ),
        className: "btn btn-secondary mx-1 btn-sm bottom-btns rounded",
        disabled: false,
        title: "Paste the text to text area",
        actionName: "Paste",
        iconClases: "bi bi-clipboard bottom-btns-icons",
      },
      {
        action: () =>
          clearTextarea(
            inputText,
            outputText,
            setInputText,
            setOutputText,
            props,
            transitionInputTextarea,
            transitionOutputTextarea
          ),
        className: "btn btn-danger mx-1 btn-sm bottom-btns rounded",
        disabled: inputText.length === 0,
        title: "Clear the text area",
        actionName: "Clear",
        iconClases: "bi bi-x-lg bottom-btns-icons",
      },
    ],
    [
      {
        action: () =>
          copyToClipboard(outputText, transitionOutputTextarea, props),
        className: "btn btn-warning mx-1 btn-sm bottom-btns rounded",
        disabled: inputText.length === 0,
        title: "Copy the text to clipboard",
        actionName: "Copy",
        iconClases: "bi bi-clipboard-check-fill bottom-btns-icons",
      },
      {
        action: () =>
          downloadTextFile(inputText, props, transitionOutputTextarea),
        className: `btn btn-${
          inputText.length === 0 ? "secondary" : "primary"
        } mx-1 btn-sm bottom-btns rounded`,
        disabled: inputText.length === 0,
        title: "Save the .txt file",
        actionName: "Save",
        iconClases: "bi bi-download bottom-btns-icons",
      },
    ],
  ];

  function uploadTextFile() {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput?.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setInputText(content);
        setOutputText(content);
        transitionInputTextarea();
        props.showAlert("File uploaded successfully!", "success");
      };
      reader.onerror = (error) => {
        props.showAlert("Error reading file: " + error, "error");
      };
      reader.readAsText(fileInput.files[0]);
    } else {
      props.showAlert("No file selected", "warning");
    }
  }

  const manipulationBtnsData = manipulationButtonsProps(
    inputText,
    props,
    setOutputText,
    setInputText,
    transitionOutputTextarea
  );

  const onTextChange = (e) => {
    setInputText(e.target.value);
    setOutputText(e.target.value);
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
        <div className="d-flex justify-content-between">
          <div>
            {actionButtonsProps[0].map((btnProp) => (
              <ActionButton
                action={btnProp.action}
                className={btnProp.className}
                disabled={btnProp.disabled}
                title={btnProp.title}
                actionName={btnProp.actionName}
                iconClases={btnProp.iconClases}
              />
            ))}
          </div>
          <div>
            {actionButtonsProps[1].map((btnProp) => (
              <ActionButton
                action={btnProp.action}
                className={btnProp.className}
                disabled={btnProp.disabled}
                title={btnProp.title}
                actionName={btnProp.actionName}
                iconClases={btnProp.iconClases}
              />
            ))}
          </div>
        </div>
        <div className="d-flex align-items-center mt-1 mb-2">
          <textarea
            className="form-control"
            id="floatingTextarea output"
            style={inputTextAreaStyle}
            onChange={onTextChange}
            value={inputText}
            placeholder="Enter text here."
            rows={12}
            required
          />
          <div className="mx-1"></div>
          <textarea
            className="form-control"
            id="floatingTextarea output"
            style={outputTextAreaStyle}
            value={outputText}
            placeholder="Nothing to preview!"
            rows={12}
            readOnly
          />
        </div>
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Upload
            </Dropdown.Toggle>
            <Dropdown.Menu variant={`${props.mode}`} className="menuName-opt">
              <input
                type="file"
                accept="text/plain"
                onChange={uploadTextFile}
                title="Open the text file"
                className="menuName-item"
              />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Edit
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="menuName-scroll"
              variant={`${props.mode}`}
            >
              {manipulationBtnsData.map((btnData) => {
                return (
                  btnData.menuName === "Edit" && (
                    <TextManipulationButton
                      isDisabled={inputText.length === 0}
                      className="menuName-item"
                      optionName={btnData.optionName}
                      title={btnData.title}
                      action={btnData.action}
                      key={manipulationBtnsData.indexOf(btnData)}
                    />
                  )
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Change Case
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="menuName-scroll"
              variant={`${props.mode}`}
            >
              {manipulationBtnsData.map((btnData) => {
                return (
                  btnData.menuName === "Change Case" && (
                    <TextManipulationButton
                      isDisabled={inputText.length === 0}
                      className="menuName-item"
                      optionName={btnData.optionName}
                      title={btnData.title}
                      action={btnData.action}
                      key={manipulationBtnsData.indexOf(btnData)}
                    />
                  )
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}
            >
              Generate
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="menuName-scroll"
              variant={`${props.mode}`}
            >
              {manipulationBtnsData.map((btnData) => {
                return (
                  btnData.menuName === "Generate" && (
                    <TextManipulationButton
                      isDisabled={false}
                      className="menuName-item"
                      optionName={btnData.optionName}
                      title={btnData.title}
                      action={btnData.action}
                      key={manipulationBtnsData.indexOf(btnData)}
                    />
                  )
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <hr className={`text-${props.mode === "dark" ? "light" : "dark"}`} />
      <Statistics mode={props.mode} outputText={outputText} />
    </>
  );
};

export default TextareaAndStats;
