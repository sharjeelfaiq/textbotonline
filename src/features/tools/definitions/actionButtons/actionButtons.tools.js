import { BsClipboard, BsDownload, BsXLg } from "react-icons/bs";

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
      className:
        "inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:shadow-tbo-inset dark:hover:bg-tbo-panel",
      icon: BsClipboard,
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
      className:
        "inline-flex items-center gap-2 rounded-sm bg-tbo-danger px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50",
      icon: BsXLg,
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
      icon: BsDownload,
      getClassName: ({ inputText }) =>
        inputText.length === 0
          ? "inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 dark:border-tbo-border dark:bg-tbo-panelSoft/60 dark:text-tbo-muted"
          : "inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:shadow-tbo-inset dark:hover:bg-tbo-panel",
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
