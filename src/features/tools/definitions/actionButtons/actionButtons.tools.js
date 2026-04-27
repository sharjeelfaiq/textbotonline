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
        "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900",
      iconClasses: "bi bi-clipboard text-base opacity-80",
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
        "inline-flex items-center gap-2 rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50",
      iconClasses: "bi bi-x-lg text-base opacity-90",
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
      iconClasses: "bi bi-download text-base opacity-90",
      getClassName: ({ inputText }) =>
        inputText.length === 0
          ? "inline-flex items-center gap-2 rounded-md bg-slate-200 px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-300"
          : "inline-flex items-center gap-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50",
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
