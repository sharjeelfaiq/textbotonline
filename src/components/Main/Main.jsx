"use client";

import React, { useEffect, useMemo, useCallback, useRef } from "react";
import { siteData } from "../About/AboutData";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Statistics from "../Statistics/Statistics";
import TextStatsOverlay from "../Utils/TextStatsOverlay";
import TextareaIconControls from "../Utils/TextareaIconControls";
import {
  BsArrowClockwise,
  BsArrowCounterclockwise,
  BsClipboard,
  BsDownload,
  BsUpload,
  BsXLg,
} from "react-icons/bs";
import { useTextareaTransitions } from "../../hooks/useTextareaTransitions";
import { useUndoRedoReducer } from "../../hooks/useUndoRedoReducer";
import {
  getDropdownToolsByMenu,
  getDropdownMenuNames,
} from "../../features/tools/registry";
import { runToolById } from "../../features/tools/runner";
import {
  TOOL_STATE_ACTIONS,
  createToolState,
  toolStateReducer,
} from "../../features/tools/state/toolState";
import { getPrimaryTextStats } from "../../utils/text/getPrimaryTextStats";

const appName = siteData.name;
const tagLine = siteData.tagLine;

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const SESSION_STORAGE_KEY = "tbo_textareas_v1";
const AUTOSAVE_DEBOUNCE_MS = 400;

const Main = React.memo((props) => {
  const fileInputRef = useRef(null);
  const hasHydratedFromStorageRef = useRef(false);
  const autosaveTimeoutRef = useRef(null);
  const autosaveWriteErrorRef = useRef(false);
  const { state, dispatch, undo, redo, canUndo, canRedo } = useUndoRedoReducer(
    toolStateReducer,
    undefined,
    () => createToolState(""),
    { maxHistory: 50 }
  );
  const { inputText, outputText } = state;

  const { mode, showAlert } = props;

  const {
    inputTextAreaStyle,
    outputTextAreaStyle,
    transitionInputTextarea,
    transitionOutputTextarea,
  } = useTextareaTransitions(mode);

  const runtime = useMemo(
    () => ({
      prompt: (message) => window.prompt(message),
      showAlert,
      clipboard: navigator.clipboard,
      transitionInputTextarea,
      transitionOutputTextarea,
    }),
    [showAlert, transitionInputTextarea, transitionOutputTextarea]
  );

  const runTool = useCallback(
    async (toolId) => {
      const { nextStatePatch } = await runToolById(
        toolId,
        { inputText, outputText },
        runtime
      );

      if (!nextStatePatch) return;
      dispatch({ type: TOOL_STATE_ACTIONS.APPLY_PATCH, patch: nextStatePatch });
    },
    [inputText, outputText, runtime]
  );

  const uploadTextFile = useCallback(() => {
    const fileInput = fileInputRef.current;
    if (fileInput?.files.length > 0) {
      const file = fileInput.files[0];
      if (file.size > MAX_UPLOAD_BYTES) {
        showAlert(
          `File is too large (${file.size.toLocaleString()} bytes). Please upload a smaller file.`,
          "warning"
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = String(event.target.result ?? "");
        dispatch({ type: TOOL_STATE_ACTIONS.SET_BOTH, text: content });
        transitionInputTextarea();
        showAlert("File uploaded successfully!", "success");
      };
      reader.onerror = (error) => {
        showAlert("Error reading file: " + error, "error");
      };
      reader.readAsText(fileInput.files[0]);
    } else {
      showAlert("No file selected", "warning");
    }
  }, [showAlert, transitionInputTextarea]);

  const onTextChange = useCallback((e) => {
    dispatch({ type: TOOL_STATE_ACTIONS.TEXT_CHANGED, value: e.target.value });
  }, [dispatch]);

  useEffect(() => {
    if (hasHydratedFromStorageRef.current) return;

    try {
      const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) {
        hasHydratedFromStorageRef.current = true;
        return;
      }

      const parsed = JSON.parse(raw);
      const nextInputText = String(parsed?.inputText ?? "");
      const nextOutputText = String(parsed?.outputText ?? "");

      if (nextInputText || nextOutputText) {
        dispatch({
          type: TOOL_STATE_ACTIONS.APPLY_PATCH,
          patch: { inputText: nextInputText, outputText: nextOutputText },
        });
      }
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
        if (!inputText && !outputText) {
          window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
          return;
        }

        const snapshot = JSON.stringify({
          inputText,
          outputText,
          updatedAt: Date.now(),
        });
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, snapshot);
      } catch (_) {
        autosaveWriteErrorRef.current = true;
      }
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
      autosaveTimeoutRef.current = null;
    };
  }, [inputText, outputText]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const isModifierPressed = event.ctrlKey || event.metaKey;
      if (!isModifierPressed) return;

      const key = String(event.key ?? "").toLowerCase();
      if (key === "z") {
        if (event.shiftKey) {
          if (!canRedo) return;
          event.preventDefault();
          redo();
          return;
        }
        if (!canUndo) return;
        event.preventDefault();
        undo();
        return;
      }

      if (key === "y") {
        if (!canRedo) return;
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canRedo, canUndo, redo, undo]);

  const dropdownMenus = useMemo(() => {
    const entries = getDropdownMenuNames().map((menuName) => {
      const items = getDropdownToolsByMenu(menuName).map((tool) => ({
        id: tool.id,
        optionName: tool.optionName ?? tool.name,
        title: tool.title ?? tool.description,
        disabled: Boolean(tool.requiresInput) && inputText.length === 0,
      }));
      return [menuName, items];
    });

    return Object.fromEntries(entries);
  }, [inputText.length]);

  const inputStats = useMemo(() => getPrimaryTextStats(inputText), [inputText]);
  const outputStats = useMemo(
    () => getPrimaryTextStats(outputText),
    [outputText]
  );


  const copyOutput = useCallback(async () => {
    if (!outputText.trim()) {
      showAlert("No output to copy", "warning");
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      showAlert("Copied!", "success");
    } catch (err) {
      showAlert("Failed to copy: " + err, "error");
    }
  }, [outputText, showAlert]);

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-4xl font-bold tracking-[0.12em] text-slate-900 dark:text-tbo-text sm:text-5xl">
          <span
            className="font-mono uppercase"
            dangerouslySetInnerHTML={{ __html: appName }}
          />
        </h1>
        <p className="text-sm text-slate-600 dark:text-tbo-muted sm:text-base">
          {tagLine}
        </p>
      </header>

      <input
        ref={fileInputRef}
        type="file"
        accept="text/plain"
        className="hidden"
        onChange={uploadTextFile}
      />

      <div className="flex flex-wrap items-center gap-2" aria-label="Tools">
        {[
          ["Change Case", dropdownMenus["Change Case"]],
          ["Edit", dropdownMenus["Edit"]],
          ["Generate", dropdownMenus["Generate"]],
        ].map(([menuName, items]) => (
          <DropdownMenu
            key={menuName}
            menu={menuName}
            items={items ?? []}
            onSelect={runTool}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <section
          className="group relative rounded-md border border-slate-200 bg-white shadow-sm dark:border-tbo-border dark:bg-tbo-panel dark:shadow-tbo dark:shadow-tbo-inset"
          aria-label="Input panel"
        >
          <label htmlFor="tb-input" className="sr-only">
            Input text
          </label>
          <textarea
            id="tb-input"
            className="min-h-64 w-full resize-none bg-transparent pb-14 pl-4 pr-24 pt-3 font-mono text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 dark:text-tbo-text dark:placeholder:text-tbo-muted/70"
            style={inputTextAreaStyle}
            onChange={onTextChange}
            value={inputText}
            placeholder="Enter text here."
            rows={12}
            required
          />
          <TextStatsOverlay stats={inputStats} />
          <TextareaIconControls
            position="top"
            alwaysVisible
            actions={[
              {
                key: "upload",
                label: "Upload .txt",
                icon: BsUpload,
                title: "Open a .txt file",
                onClick: () => fileInputRef.current?.click(),
              },
              {
                key: "paste",
                label: "Paste",
                icon: BsClipboard,
                title: "Paste from clipboard",
                onClick: () => runTool("pasteToTextarea"),
              },
              {
                key: "undo",
                label: "Undo",
                icon: BsArrowCounterclockwise,
                title: "Undo (Ctrl+Z / Cmd+Z)",
                disabled: !canUndo,
                onClick: undo,
              },
              {
                key: "redo",
                label: "Redo",
                icon: BsArrowClockwise,
                title: "Redo (Ctrl+Y / Cmd+Shift+Z)",
                disabled: !canRedo,
                onClick: redo,
              },
              {
                key: "clear",
                label: "Clear",
                icon: BsXLg,
                title: "Clear input + output",
                disabled: inputText.length === 0 && outputText.length === 0,
                onClick: () => runTool("clearTextarea"),
              },
            ]}
          />
        </section>

        <section
          className="group relative rounded-md border border-slate-200 bg-white shadow-sm dark:border-tbo-border dark:bg-tbo-panel dark:shadow-tbo dark:shadow-tbo-inset"
          aria-label="Output panel"
        >
          <label htmlFor="tb-output" className="sr-only">
            Output text
          </label>
          <textarea
            id="tb-output"
            className="min-h-64 w-full resize-none bg-transparent pb-14 pl-4 pr-16 pt-3 font-mono text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 dark:text-tbo-text dark:placeholder:text-tbo-muted/70"
            style={outputTextAreaStyle}
            value={outputText}
            placeholder="Nothing to preview!"
            rows={12}
            readOnly
          />
          <TextStatsOverlay stats={outputStats} />
          <TextareaIconControls
            actions={[
              {
                key: "copy",
                label: "Copy output",
                icon: BsClipboard,
                title: "Copy output to clipboard",
                disabled: outputText.length === 0,
                onClick: copyOutput,
              },
              {
                key: "save",
                label: "Save output",
                icon: BsDownload,
                title: "Save output as .txt",
                disabled: outputText.length === 0,
                onClick: () => runTool("downloadTextFile"),
              },
            ]}
          />
        </section>
      </div>

      <div className="relative py-8">
        <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200 dark:bg-tbo-border/80" />
        <div className="relative">
          <Statistics mode={mode} outputText={outputText} />
        </div>
      </div>
    </div>
  );
});

export default Main;
