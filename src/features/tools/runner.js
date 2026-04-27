import { getToolById } from "./registry";

function formatDropdownSuccessMessage(actionId) {
  return `${String(actionId).replace(/([A-Z])/g, " $1").trim()}!`;
}

const DEFAULT_MAX_INPUT_CHARS = 500_000;
const DEFAULT_MAX_OUTPUT_CHARS = 1_000_000;

function coerceText(value) {
  if (value === null || typeof value === "undefined") return "";
  if (typeof value === "string") return value;
  return String(value);
}

function createSafeRuntime(runtime) {
  const safe = runtime ?? {};
  return {
    ...safe,
    showAlert: typeof safe.showAlert === "function" ? safe.showAlert : () => {},
    prompt: typeof safe.prompt === "function" ? safe.prompt : window.prompt,
    transitionInputTextarea:
      typeof safe.transitionInputTextarea === "function"
        ? safe.transitionInputTextarea
        : () => {},
    transitionOutputTextarea:
      typeof safe.transitionOutputTextarea === "function"
        ? safe.transitionOutputTextarea
        : () => {},
  };
}

export async function runToolById(toolId, state, runtime) {
  const tool = getToolById(toolId);
  if (!tool) return { nextStatePatch: null };

  const safeState = {
    inputText: coerceText(state?.inputText),
    outputText: coerceText(state?.outputText),
  };

  const safeRuntime = createSafeRuntime(runtime);

  if (tool.requiresInput && !safeState.inputText.trim()) {
    safeRuntime.showAlert("Please enter some text first.", "info");
    return { nextStatePatch: null };
  }

  const shouldLimitInput =
    tool.requiresInput ||
    tool.kind === "dropdown" ||
    typeof tool.maxInputChars === "number";
  if (shouldLimitInput) {
    const maxInputChars =
      typeof tool.maxInputChars === "number" ? tool.maxInputChars : null;
    const effectiveMaxInputChars = maxInputChars ?? DEFAULT_MAX_INPUT_CHARS;
    if (safeState.inputText.length > effectiveMaxInputChars) {
      safeRuntime.showAlert(
        `Input is too large for "${tool.name ?? tool.id}". Max ${effectiveMaxInputChars.toLocaleString()} characters.`,
        "warning"
      );
      return { nextStatePatch: null };
    }
  }

  let result;
  try {
    result = await tool.execute(safeState, safeRuntime);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[tools] execute failed for ${tool.id}`, err);
    safeRuntime.showAlert(
      `Something went wrong while running "${tool.name ?? tool.id}".`,
      "error"
    );
    return { nextStatePatch: null };
  }
  if (result === null || typeof result === "undefined") {
    return { nextStatePatch: null };
  }

  const nextText = coerceText(result);

  const maxOutputChars =
    typeof tool.maxOutputChars === "number" ? tool.maxOutputChars : null;
  const effectiveMaxOutputChars = maxOutputChars ?? DEFAULT_MAX_OUTPUT_CHARS;
  if (nextText.length > effectiveMaxOutputChars) {
    safeRuntime.showAlert(
      `Output is too large to display (${nextText.length.toLocaleString()} chars).`,
      "warning"
    );
    return { nextStatePatch: null };
  }

  const nextStatePatch =
    tool.applyTo === "both"
      ? { inputText: nextText, outputText: nextText }
      : { outputText: nextText };

  if (tool.kind === "dropdown" && nextText) {
    safeRuntime.showAlert(formatDropdownSuccessMessage(tool.id), "success");
  }

  if (tool.transitions?.input) safeRuntime.transitionInputTextarea();
  if (tool.transitions?.output) safeRuntime.transitionOutputTextarea();

  return { nextStatePatch };
}
