// Textareas.jsx

import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { motion } from "framer-motion";
import TextManipulationButton from "../TextManipulation/TextManipulationButton.jsx";
import { manipulationButtonsData } from "../TextManipulation/ManipulationBtnsData.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/TextareaAndStats.css";
import Statistics from "../Statistics/Statistics.jsx";

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

  function downloadTextFile() {
    if (!inputText.trim()) {
      props.showAlert("No text to download", "warning");
      return;
    }
    const blob = new Blob([inputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myFile.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    transitionOutputTextarea();
    props.showAlert("File downloaded successfully!", "success");
  }

  function clearTextarea() {
    if (!inputText.trim() && !outputText.trim()) {
      props.showAlert("Textareas are already empty", "info");

      return;
    }
    setInputText("");
    setOutputText("");
    transitionInputTextarea("clearTextarea");
    transitionOutputTextarea("clearTextarea");
    props.showAlert("Cleared!", "success");
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(outputText);
      transitionOutputTextarea();
      props.showAlert("COPIED!", "success");
    } catch (err) {
      props.showAlert("Failed to copy: " + err, "error");
    }
  }

  async function pasteToTextarea() {
    try {
      const newText = await navigator.clipboard.readText();
      setInputText(newText);
      setOutputText(newText);
      transitionInputTextarea();
      props.showAlert("PASTED!", "success");
    } catch (err) {
      props.showAlert("Failed to paste: " + err, "error");
    }
  }

  const manipulationBtnsData = manipulationButtonsData(
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
            <motion.button
              onClick={clearTextarea}
              disabled={inputText.length === 0}
              title="Clear the text area"
              className="btn btn-danger mx-1 btn-sm bottom-btns rounded"
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
                inputText.length === 0 ? "secondary" : "primary"
              } mx-1 btn-sm bottom-btns rounded`}
              onClick={downloadTextFile}
              title="Save the .txt file"
              disabled={inputText.length === 0}
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
              disabled={inputText.length === 0}
            >
              Copy{" "}
              <i className="bi bi-clipboard-check-fill bottom-btns-icons"></i>
            </motion.button>
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
          ></textarea>
          <div className="mx-1"></div>
          <textarea
            className="form-control"
            id="floatingTextarea output"
            style={outputTextAreaStyle}
            value={outputText}
            placeholder="Nothing to preview!"
            rows={12}
            readOnly
          ></textarea>
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
        </div>
      </div>
      <hr className={`text-${props.mode === "dark" ? "light" : "dark"}`} />
      <Statistics mode={props.mode} outputText={outputText} />
      <hr className={`text-${props.mode === "dark" ? "light" : "dark"}`} />
    </>
  );
};

export default TextareaAndStats;
