import React, { useReducer, useMemo, useCallback, useRef } from "react";
import { siteData } from "../About/AboutData";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ActionButton from "../ActionButton/ActionButton";
import Statistics from "../Statistics/Statistics";
import { useTextareaTransitions } from "../../hooks/useTextareaTransitions";
import {
  getActionButtonGroupIds,
  getActionButtonToolsByGroup,
  getDropdownToolsByMenu,
  getDropdownMenuNames,
} from "../../features/tools/registry";
import { runToolById } from "../../features/tools/runner";
import {
  TOOL_STATE_ACTIONS,
  createToolState,
  toolStateReducer,
} from "../../features/tools/state/toolState";

const appName = siteData.name;
const tagLine = siteData.tagLine;

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const Main = React.memo((props) => {
  const fileInputRef = useRef(null);
  const [state, dispatch] = useReducer(
    toolStateReducer,
    undefined,
    () => createToolState("")
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
  }, []);

  const dropdownMenus = useMemo(() => {
    return getDropdownMenuNames().map((menuName) => {
      const items = getDropdownToolsByMenu(menuName).map((tool) => ({
        id: tool.id,
        optionName: tool.optionName ?? tool.name,
        title: tool.title ?? tool.description,
        disabled: Boolean(tool.requiresInput) && inputText.length === 0,
      }));
      return { menuName, items };
    });
  }, [inputText.length]);

  const actionButtonGroups = useMemo(() => {
    return getActionButtonGroupIds().map((groupId) => {
      const tools = getActionButtonToolsByGroup(groupId);
      const buttons = tools.map((tool) => ({
        action: () => runTool(tool.id),
        className: tool.ui?.getClassName
          ? tool.ui.getClassName({ inputText, outputText })
          : tool.ui?.className,
        disabled: tool.isDisabled
          ? tool.isDisabled({ inputText, outputText })
          : false,
        title: tool.title ?? tool.description,
        actionName: tool.actionName ?? tool.name,
        iconClasses: tool.ui?.iconClasses,
      }));
      return { groupId, buttons };
    });
  }, [inputText, outputText, runTool]);

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 sm:text-4xl">
          <span
            className="font-mono uppercase"
            dangerouslySetInnerHTML={{ __html: appName }}
          />
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-300 sm:text-base">
          {tagLine}
        </p>
      </header>

      {/* Tools dropdown always above the input textarea */}
      <div className="flex flex-wrap items-center gap-2" aria-label="Tools">
        <input
          ref={fileInputRef}
          type="file"
          accept="text/plain"
          className="hidden"
          onChange={uploadTextFile}
        />
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-sky-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          onClick={() => fileInputRef.current?.click()}
          title="Open a .txt file"
        >
          <i className="bi bi-upload text-base opacity-90" aria-hidden="true" />
          Upload
        </button>

        {dropdownMenus.map(({ menuName, items }) => (
          <DropdownMenu
            key={menuName}
            menu={menuName}
            items={items}
            onSelect={runTool}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <section
          className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          aria-label="Input panel"
        >
          <label htmlFor="tb-input" className="sr-only">
            Input text
          </label>
          <textarea
            id="tb-input"
            className="min-h-64 w-full resize-y bg-transparent px-4 py-3 font-mono text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            style={inputTextAreaStyle}
            onChange={onTextChange}
            value={inputText}
            placeholder="Enter text here."
            rows={12}
            required
          />
        </section>

        <section
          className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          aria-label="Output panel"
        >
          <label htmlFor="tb-output" className="sr-only">
            Output text
          </label>
          <textarea
            id="tb-output"
            className="min-h-64 w-full resize-y bg-transparent px-4 py-3 font-mono text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            style={outputTextAreaStyle}
            value={outputText}
            placeholder="Nothing to preview!"
            rows={12}
            readOnly
          />
        </section>
      </div>

      {/* Action buttons always below the input textarea */}
      <div
        className="flex flex-wrap items-center justify-between gap-2"
        aria-label="Actions"
      >
        {actionButtonGroups.map(({ groupId, buttons }) => (
          <div className="flex flex-wrap gap-2" key={groupId}>
            <ActionButton buttons={buttons} />
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 pt-6 dark:border-zinc-800">
        <Statistics mode={mode} outputText={outputText} />
      </div>
    </div>
  );
});

export default Main;
