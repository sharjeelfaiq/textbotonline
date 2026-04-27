export const TOOL_STATE_ACTIONS = Object.freeze({
  TEXT_CHANGED: "TEXT_CHANGED",
  APPLY_PATCH: "APPLY_PATCH",
  SET_BOTH: "SET_BOTH",
});

export function createToolState(initialText = "") {
  return { inputText: initialText, outputText: initialText };
}

function normalizePatch(patch) {
  if (!patch || typeof patch !== "object") return null;
  const nextPatch = {};
  if (Object.prototype.hasOwnProperty.call(patch, "inputText")) {
    nextPatch.inputText = String(patch.inputText);
  }
  if (Object.prototype.hasOwnProperty.call(patch, "outputText")) {
    nextPatch.outputText = String(patch.outputText);
  }
  return Object.keys(nextPatch).length > 0 ? nextPatch : null;
}

export function toolStateReducer(state, action) {
  switch (action?.type) {
    case TOOL_STATE_ACTIONS.TEXT_CHANGED: {
      const nextText = String(action.value ?? "");
      if (state.inputText === nextText && state.outputText === nextText) {
        return state;
      }
      return { inputText: nextText, outputText: nextText };
    }
    case TOOL_STATE_ACTIONS.SET_BOTH: {
      const nextText = String(action.text ?? "");
      if (state.inputText === nextText && state.outputText === nextText) {
        return state;
      }
      return { inputText: nextText, outputText: nextText };
    }
    case TOOL_STATE_ACTIONS.APPLY_PATCH: {
      const patch = normalizePatch(action.patch);
      if (!patch) return state;
      const nextState = { ...state, ...patch };
      if (
        nextState.inputText === state.inputText &&
        nextState.outputText === state.outputText
      ) {
        return state;
      }
      return nextState;
    }
    default:
      return state;
  }
}

