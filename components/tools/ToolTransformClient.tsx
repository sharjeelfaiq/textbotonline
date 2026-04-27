"use client";

import { useCallback, useMemo, useState } from "react";
import { BsClipboard, BsDownload } from "react-icons/bs";
import TextStatsOverlay from "@/src/components/Utils/TextStatsOverlay";
import { getPrimaryTextStats } from "@/src/utils/text/getPrimaryTextStats";
import { getToolById } from "@/src/features/tools/registry";
import { useUndoRedoReducer } from "@/src/hooks/useUndoRedoReducer";
import InputTextarea from "@/components/ui/input-textarea";

type TransformState = { inputText: string; outputText: string };

type TransformAction =
  | { type: "SET_INPUT"; value: string }
  | { type: "SET_OUTPUT"; value: string }
  | { type: "SET_BOTH"; value: string }
  | { type: "CLEAR" };

function transformReducer(prev: TransformState, action: TransformAction): TransformState {
  switch (action.type) {
    case "SET_INPUT":
      return { ...prev, inputText: action.value };
    case "SET_OUTPUT":
      return { ...prev, outputText: action.value };
    case "SET_BOTH":
      return { inputText: action.value, outputText: action.value };
    case "CLEAR":
      return { inputText: "", outputText: "" };
    default:
      return prev;
  }
}

function downloadTextFile(text: string, filename = "output.txt") {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ToolTransformClient({
  toolId,
  title,
}: {
  toolId: string;
  title: string;
}) {
  const tool = useMemo(() => getToolById(toolId), [toolId]);
  const [error, setError] = useState<string | null>(null);

  const { state, dispatch, undo, redo, canUndo, canRedo } = useUndoRedoReducer(
    transformReducer,
    undefined,
    () => ({ inputText: "", outputText: "" } as TransformState),
    { maxHistory: 50 }
  );

  const inputText = state.inputText;
  const outputText = state.outputText;

  const inputStats = useMemo(() => getPrimaryTextStats(inputText), [inputText]);
  const outputStats = useMemo(
    () => getPrimaryTextStats(outputText),
    [outputText]
  );

  const run = useCallback(async () => {
    if (!tool) {
      setError(`Unknown tool: ${toolId}`);
      return;
    }

    if (tool.requiresInput && !inputText.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setError(null);

    try {
      const result = await tool.execute(
        { inputText, outputText },
        {
          prompt: (message: string) => window.prompt(message),
          showAlert: () => {},
          clipboard: navigator.clipboard,
          transitionInputTextarea: () => {},
          transitionOutputTextarea: () => {},
        }
      );

      if (result === null || typeof result === "undefined") return;
      const nextText = typeof result === "string" ? result : String(result);
      dispatch({ type: "SET_OUTPUT", value: nextText });
    } catch (e) {
      setError("Tool execution failed.");
    }
  }, [dispatch, inputText, outputText, tool, toolId]);

  const copyOutput = useCallback(async () => {
    if (!outputText.trim()) return;
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (_) {}
  }, [outputText]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-tbo-text">
          {title}
        </h1>
        <button
          type="button"
          className="tbo-btn"
          onClick={run}
        >
          Run
        </button>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputTextarea
          id="tool-input"
          ariaLabel="Input panel"
          value={inputText}
          onValueChange={(nextValue) =>
            dispatch({ type: "SET_INPUT", value: nextValue })
          }
          placeholder="Enter text here."
          rows={12}
          bottomOverlay={<TextStatsOverlay stats={inputStats} />}
          canUndo={canUndo}
          canRedo={canRedo}
          clearDisabled={inputText.length === 0 && outputText.length === 0}
          onUndo={undo}
          onRedo={redo}
          onClear={() => dispatch({ type: "CLEAR" })}
          onPasteText={(text) => dispatch({ type: "SET_BOTH", value: text })}
          onUploadText={(text) => dispatch({ type: "SET_BOTH", value: text })}
        />

        <section
          className="tbo-surface group relative"
          aria-label="Output panel"
        >
          <div className="absolute right-2 top-2 flex items-center gap-2">
            <button
              type="button"
              className="tbo-icon-btn"
              aria-label="Copy output"
              title="Copy output"
              onClick={copyOutput}
              disabled={!outputText}
            >
              <BsClipboard aria-hidden="true" />
            </button>
            <button
              type="button"
              className="tbo-icon-btn"
              aria-label="Download output"
              title="Download output"
              onClick={() => downloadTextFile(outputText)}
              disabled={!outputText}
            >
              <BsDownload aria-hidden="true" />
            </button>
          </div>

          <label htmlFor="tool-output" className="sr-only">
            Output text
          </label>
          <textarea
            id="tool-output"
            className="tbo-textarea min-h-64"
            value={outputText}
            placeholder="Output will appear here."
            rows={12}
            readOnly
          />
          <TextStatsOverlay stats={outputStats} />
        </section>
      </div>
    </div>
  );
}
