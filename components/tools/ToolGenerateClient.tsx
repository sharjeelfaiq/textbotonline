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

export default function ToolGenerateClient({
  toolId,
  title,
}: {
  toolId: string;
  title: string;
}) {
  const tool = useMemo(() => getToolById(toolId), [toolId]);
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const outputStats = useMemo(
    () => getPrimaryTextStats(outputText),
    [outputText]
  );

  const run = useCallback(async () => {
    if (!tool) {
      setError(`Unknown tool: ${toolId}`);
      return;
    }

    setError(null);
    try {
      const result = await tool.execute(
        { inputText: "", outputText },
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
    } catch (_) {
      setError("Tool execution failed.");
    }
  }, [outputText, tool, toolId]);

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
          Generate
        </button>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </div>
      )}

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

        <label htmlFor="generate-output" className="sr-only">
          Output text
        </label>
        <textarea
          id="generate-output"
          className="tbo-textarea min-h-80"
          value={outputText}
          placeholder="Generated output will appear here."
          rows={14}
          readOnly
        />
        <TextStatsOverlay stats={outputStats} />
      </section>
    </div>
  );
}
