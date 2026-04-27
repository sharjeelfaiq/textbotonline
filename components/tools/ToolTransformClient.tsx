"use client";

import { useCallback, useMemo, useState } from "react";
import { BsClipboard, BsDownload } from "react-icons/bs";
import TextStatsOverlay from "@/src/components/Utils/TextStatsOverlay";
import { getPrimaryTextStats } from "@/src/utils/text/getPrimaryTextStats";
import { getToolById } from "@/src/features/tools/registry";

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
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);

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
      setOutputText(nextText);
    } catch (e) {
      setError("Tool execution failed.");
    }
  }, [inputText, outputText, tool, toolId]);

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
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors duration-fast ease-out hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 motion-reduce:transition-none dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:shadow-tbo-inset dark:hover:bg-tbo-panel"
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
        <section
          className="group relative rounded-md border border-slate-200 bg-white shadow-sm dark:border-tbo-border dark:bg-tbo-panel dark:shadow-tbo dark:shadow-tbo-inset"
          aria-label="Input panel"
        >
          <label htmlFor="tool-input" className="sr-only">
            Input text
          </label>
          <textarea
            id="tool-input"
            className="min-h-64 w-full resize-none bg-transparent pb-14 pl-4 pr-4 pt-3 font-mono text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 dark:text-tbo-text dark:placeholder:text-tbo-muted/70"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text here."
            rows={12}
          />
          <TextStatsOverlay stats={inputStats} />
        </section>

        <section
          className="group relative rounded-md border border-slate-200 bg-white shadow-sm dark:border-tbo-border dark:bg-tbo-panel dark:shadow-tbo dark:shadow-tbo-inset"
          aria-label="Output panel"
        >
          <div className="absolute right-2 top-2 flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors duration-fast ease-out hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 motion-reduce:transition-none disabled:opacity-50 dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:shadow-tbo-inset dark:hover:bg-tbo-panel"
              aria-label="Copy output"
              title="Copy output"
              onClick={copyOutput}
              disabled={!outputText}
            >
              <BsClipboard aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors duration-fast ease-out hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 motion-reduce:transition-none disabled:opacity-50 dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:shadow-tbo-inset dark:hover:bg-tbo-panel"
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
            className="min-h-64 w-full resize-none bg-transparent pb-14 pl-4 pr-4 pt-3 font-mono text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 dark:text-tbo-text dark:placeholder:text-tbo-muted/70"
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

