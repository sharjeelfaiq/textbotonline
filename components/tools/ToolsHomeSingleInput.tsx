"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { siteData } from "@/src/components/About/AboutData";
import { getToolById } from "@/src/features/tools/registry";
import { useUndoRedoReducer } from "@/src/hooks/useUndoRedoReducer";
import TextStatsOverlay from "@/src/components/Utils/TextStatsOverlay";
import Statistics from "@/src/components/Statistics/Statistics";
import { getPrimaryTextStats } from "@/src/utils/text/getPrimaryTextStats";
import InputTextarea from "@/components/ui/input-textarea";
import { useI18n } from "@/components/i18n/I18nProvider";

type NotifyType = "success" | "warning" | "error";

const appName = siteData.name;

const SESSION_STORAGE_KEY = "tbo_single_input_v1";
const AUTOSAVE_DEBOUNCE_MS = 400;

type TextAction =
  | { type: "SET"; value: string }
  | { type: "CLEAR" };

function textReducer(prev: string, action: TextAction) {
  switch (action.type) {
    case "SET":
      return action.value;
    case "CLEAR":
      return "";
    default:
      return prev;
  }
}

function downloadTextFile(text: string, filename = "textbotonline.txt") {
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

export default function ToolsHomeSingleInput({
  mode,
  showAlert,
}: {
  mode: string;
  showAlert: (message: string, type: string) => void;
}) {
  const autosaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasHydratedFromStorageRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  const { state: inputText, dispatch, undo, redo, canUndo, canRedo } =
    useUndoRedoReducer(textReducer, undefined, () => "", { maxHistory: 50 });

  const notify = useCallback(
    (message: string, type: NotifyType = "success") => {
      showAlert(message, type);
    },
    [showAlert]
  );

  useEffect(() => {
    if (hasHydratedFromStorageRef.current) return;

    try {
      const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) {
        hasHydratedFromStorageRef.current = true;
        return;
      }

      const parsed = JSON.parse(raw);
      const nextText = String(parsed?.inputText ?? "");
      if (nextText) dispatch({ type: "SET", value: nextText });
    } catch (_) {
      // Ignore session storage parse/access issues.
    } finally {
      hasHydratedFromStorageRef.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!hasHydratedFromStorageRef.current) return;

    if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
    autosaveTimeoutRef.current = setTimeout(() => {
      autosaveTimeoutRef.current = null;
      try {
        if (!inputText) {
          window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
          return;
        }

        const snapshot = JSON.stringify({ inputText, updatedAt: Date.now() });
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, snapshot);
      } catch (_) {}
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
      autosaveTimeoutRef.current = null;
    };
  }, [inputText]);

  const applyCase = useCallback(
    async (toolId: string) => {
      if (!inputText.trim()) {
        notify("Please enter some text first.", "warning");
        return;
      }

      const tool = getToolById(toolId);
      if (!tool) {
        setError(`Unknown tool: ${toolId}`);
        return;
      }

      setError(null);

      try {
        const result = await tool.execute(
          { inputText, outputText: "" },
          {
            prompt: (message: string) => window.prompt(message),
            showAlert,
            clipboard: navigator.clipboard,
            transitionInputTextarea: () => {},
            transitionOutputTextarea: () => {},
          }
        );

        if (result === null || typeof result === "undefined") return;
        dispatch({ type: "SET", value: String(result) });
      } catch (_) {
        setError("Tool execution failed.");
      }
    },
    [dispatch, inputText, notify, showAlert]
  );

  const buttons = useMemo(
    () => [
      { id: "sentencecase", label: "Sentence case" },
      { id: "lowercase", label: "Lowercase" },
      { id: "uppercase", label: "Uppercase" },
      { id: "titlecase", label: "Title case" },
      { id: "camelcase", label: "Camel case" },
    ],
    []
  );

  const inputStats = useMemo(() => getPrimaryTextStats(inputText), [inputText]);

  const copyText = useCallback(async () => {
    if (!inputText.trim()) return;
    try {
      await navigator.clipboard.writeText(inputText);
      notify("Copied!", "success");
    } catch (_) {
      notify("Failed to copy.", "warning");
    }
  }, [inputText, notify]);

  const downloadText = useCallback(() => {
    if (!inputText.trim()) return;
    downloadTextFile(inputText);
    notify("Downloaded.", "success");
  }, [inputText, notify]);

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-4xl font-bold tracking-[0.12em] text-slate-900 dark:text-tbo-text sm:text-5xl">
          <span className="font-mono uppercase">{appName}</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-tbo-muted sm:text-base">
          {t("home.tagline", siteData.tagLine)}
        </p>
      </header>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </div>
      )}

      <InputTextarea
        id="tbo-home-input"
        ariaLabel="Input panel"
        value={inputText}
        onValueChange={(nextValue) => dispatch({ type: "SET", value: nextValue })}
        placeholder="Enter text here."
        rows={12}
        bottomOverlay={<TextStatsOverlay stats={inputStats} />}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onClear={() => dispatch({ type: "CLEAR" })}
        onNotify={(message, type) => showAlert(message, type ?? "success")}
        onCopy={copyText}
        onDownload={downloadText}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-fast ease-out hover:scale-[1.01] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 motion-reduce:transition-none dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:shadow-tbo-inset dark:hover:bg-tbo-panel"
            onClick={() => applyCase(btn.id)}
            aria-label={`Convert to ${btn.label}`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="relative py-8">
        <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200 dark:bg-tbo-border/80" />
        <div className="relative">
          <Statistics mode={mode} outputText={inputText} />
        </div>
      </div>
    </div>
  );
}
