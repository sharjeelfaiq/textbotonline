function downloadTextFile(text) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "myFile.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const tools = [
  {
    id: "pasteToTextarea",
    kind: "actionButton",
    actionName: "Paste",
    title: "Paste the text to text area",
    order: 10,
    applyTo: "both",
    transitions: { input: true },
    ui: {
      buttonGroup: 0,
      className: "btn btn-secondary mx-1 btn-sm bottom-btns rounded",
      iconClasses: "bi bi-clipboard bottom-btns-icons",
    },
    isDisabled: () => false,
    execute: async (_state, runtime) => {
      try {
        const newText = await runtime.clipboard.readText();
        if (newText.trim() === "") {
          runtime.showAlert("Clipboard is empty. Nothing to paste.", "warning");
          return null;
        }
        runtime.showAlert("PASTED!", "success");
        return newText;
      } catch (err) {
        runtime.showAlert("Failed to paste: " + err, "error");
        return null;
      }
    },
  },
  {
    id: "clearTextarea",
    kind: "actionButton",
    actionName: "Clear",
    title: "Clear the text area",
    order: 20,
    applyTo: "both",
    transitions: { input: true, output: true },
    ui: {
      buttonGroup: 0,
      className: "btn btn-danger mx-1 btn-sm bottom-btns rounded",
      iconClasses: "bi bi-x-lg bottom-btns-icons",
    },
    isDisabled: ({ inputText }) => inputText.length === 0,
    execute: ({ inputText, outputText }, runtime) => {
      if (!inputText.trim() && !outputText.trim()) {
        runtime.showAlert("Textareas are already empty", "info");
        return null;
      }
      runtime.showAlert("Cleared!", "success");
      return "";
    },
  },
  {
    id: "downloadTextFile",
    kind: "actionButton",
    actionName: "Save",
    title: "Save the .txt file",
    order: 20,
    applyTo: "outputOnly",
    transitions: { output: true },
    ui: {
      buttonGroup: 1,
      iconClasses: "bi bi-download bottom-btns-icons",
      getClassName: ({ inputText }) =>
        `btn btn-${inputText.length === 0 ? "secondary" : "primary"} mx-1 btn-sm bottom-btns rounded`,
    },
    isDisabled: ({ inputText }) => inputText.length === 0,
    execute: ({ inputText }, runtime) => {
      if (!inputText.trim()) {
        runtime.showAlert("No text to download", "warning");
        return null;
      }
      downloadTextFile(inputText);
      runtime.showAlert("File downloaded successfully!", "success");
      return inputText;
    },
  },
];

export default tools;
