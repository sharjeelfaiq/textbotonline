import {
  downloadTextFile,
  clearTextarea,
  copyToClipboard,
  pasteToTextarea,
} from "./actionButton.js";

export const actionButtonProps = (
  inputText,
  outputText,
  setInputText,
  setOutputText,
  props,
  transitionInputTextarea,
  transitionOutputTextarea
) => {
  return [
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
};
