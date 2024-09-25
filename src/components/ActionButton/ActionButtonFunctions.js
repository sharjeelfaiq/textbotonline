export function downloadTextFile(inputText, props, transitionOutputTextarea) {
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

export function clearTextarea(
  inputText,
  outputText,
  setInputText,
  setOutputText,
  props,
  transitionInputTextarea,
  transitionOutputTextarea
) {
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

export async function copyToClipboard(outputText, transitionOutputTextarea, props) {
  try {
    await navigator.clipboard.writeText(outputText);
    transitionOutputTextarea();
    props.showAlert("COPIED!", "success");
  } catch (err) {
    props.showAlert("Failed to copy: " + err, "error");
  }
}

export async function pasteToTextarea(
  setInputText,
  setOutputText,
  transitionInputTextarea,
  props
) {
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
