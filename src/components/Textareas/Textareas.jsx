import React, { useState, useMemo, useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { motion } from "framer-motion";
import DropdownMenu from "../Dropdown/DropdownMenu.jsx";
import ActionButton from "../ActionButton/ActionButton.jsx";
import Statistics from "../Statistics/Statistics.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/TextareaAndStats.css";

const TextareaAndStats = React.memo((props) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputDarkBackground, setInputDarkBackground] = useState("#242526");
  const [outputDarkBackground, setOutputDarkBackground] = useState("#242526");
  const [inputLightBackground, setInputLightBackground] = useState("white");
  const [outputLightBackground, setOutputLightBackground] = useState("white");

  const { mode } = props;

  const timeoutDuration = 280;

  let inputTimeouts = [];
  let outputTimeouts = [];

  const clearInputTimeouts = useCallback(() => {
    inputTimeouts.forEach((timeout) => clearTimeout(timeout));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    inputTimeouts = [];
  }, []);

  const clearOutputTimeouts = useCallback(() => {
    outputTimeouts.forEach((timeout) => clearTimeout(timeout));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    outputTimeouts = [];
  }, []);

  const transitionInputTextarea = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearInputTimeouts]);

  const transitionOutputTextarea = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearOutputTimeouts]);

  const createTextAreaStyle = useCallback(
    (isDark, darkBackgroundColor, lightBackgroundColor) => ({
      width: "100%",
      backgroundColor: isDark ? darkBackgroundColor : lightBackgroundColor,
      color: isDark ? "white" : "black",
      textAlign: "left",
    }),
    []
  );

  const isDarkMode = mode === "dark";

  const inputTextAreaStyle = useMemo(
    () =>
      createTextAreaStyle(
        isDarkMode,
        inputDarkBackground,
        inputLightBackground
      ),
    [isDarkMode, inputDarkBackground, inputLightBackground, createTextAreaStyle]
  );

  const outputTextAreaStyle = useMemo(
    () =>
      createTextAreaStyle(
        isDarkMode,
        outputDarkBackground,
        outputLightBackground
      ),
    [
      isDarkMode,
      outputDarkBackground,
      outputLightBackground,
      createTextAreaStyle,
    ]
  );

  const uploadTextFile = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showAlert, transitionInputTextarea]);

  const onTextChange = useCallback((e) => {
    setInputText(e.target.value);
    setOutputText(e.target.value);
  }, []);

  return (
    <>
      <motion.h1
        className={`text-center text-${mode === "light" ? "dark" : "light"}`}
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
          className={`text-center text-${mode === "light" ? "dark" : "light"}`}
        >
          Just copy/paste or upload your text here and hit the desired button
        </p>
      </small>
      <div className="form-floating mb-3">
        <div className="d-flex justify-content-between">
          <div>
            <ActionButton
              index={0}
              inputText={inputText}
              outputText={outputText}
              setInputText={setInputText}
              setOutputText={setOutputText}
              props={props}
              transitionInputTextarea={transitionInputTextarea}
              transitionOutputTextarea={transitionOutputTextarea}
            />
          </div>
          <div>
            <ActionButton
              index={1}
              inputText={inputText}
              outputText={outputText}
              setInputText={setInputText}
              setOutputText={setOutputText}
              props={props}
              transitionInputTextarea={transitionInputTextarea}
              transitionOutputTextarea={transitionOutputTextarea}
            />
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
            <Dropdown.Toggle className={`btn btn-sm top-btns mx-1 btn-${mode}`}>
              Upload
            </Dropdown.Toggle>
            <Dropdown.Menu variant={`${mode}`} className="menuName-opt">
              <input
                type="file"
                accept="text/plain"
                onChange={uploadTextFile}
                title="Open the text file"
                className="menuName-item"
              />
            </Dropdown.Menu>
          </Dropdown>
          <DropdownMenu
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            setOutputText={setOutputText}
            transitionOutputTextarea={transitionOutputTextarea}
            mode={mode}
            props={props}
            menu={"Edit"}
          />
          <DropdownMenu
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            setOutputText={setOutputText}
            transitionOutputTextarea={transitionOutputTextarea}
            mode={mode}
            props={props}
            menu={"Change Case"}
          />
          <DropdownMenu
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            setOutputText={setOutputText}
            transitionOutputTextarea={transitionOutputTextarea}
            mode={mode}
            props={props}
            menu={"Generate"}
          />
        </div>
      </div>
      <hr className={`text-${mode === "dark" ? "light" : "dark"}`} />
      <Statistics mode={mode} outputText={outputText} />
    </>
  );
});

export default TextareaAndStats;
