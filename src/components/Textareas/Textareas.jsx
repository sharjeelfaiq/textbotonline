import React, { useReducer, useMemo, useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { textareaData } from "./TextareasData";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ActionButton from "../ActionButton/ActionButton";
import Statistics from "../Statistics/Statistics";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Textareas.css";
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

const appName = textareaData.appName;
const tagLine = textareaData.tagLine;

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const Textareas = React.memo((props) => {
  const [state, dispatch] = useReducer(
    toolStateReducer,
    undefined,
    () => createToolState("")
  );
  const { inputText, outputText } = state;

  const { mode } = props;

  const {
    inputTextAreaStyle,
    outputTextAreaStyle,
    transitionInputTextarea,
    transitionOutputTextarea,
  } = useTextareaTransitions(mode);

  const runtime = useMemo(
    () => ({
      prompt: (message) => window.prompt(message),
      showAlert: props.showAlert,
      clipboard: navigator.clipboard,
      transitionInputTextarea,
      transitionOutputTextarea,
    }),
    [props.showAlert, transitionInputTextarea, transitionOutputTextarea]
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
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput?.files.length > 0) {
      const file = fileInput.files[0];
      if (file.size > MAX_UPLOAD_BYTES) {
        props.showAlert(
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
        props.showAlert("File uploaded successfully!", "success");
      };
      reader.onerror = (error) => {
        props.showAlert("Error reading file: " + error, "error");
      };
      reader.readAsText(fileInput.files[0]);
    } else {
      props.showAlert("No file selected", "warning");
    }
  }, [props, transitionInputTextarea]);

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
    <>
      <h1 className={`text-center text-${mode === "light" ? "dark" : "light"}`}>
        <span
          className="text-uppercase font-monospace"
          dangerouslySetInnerHTML={{ __html: appName }}
        />
      </h1>
      <small>
        <p
          className={`text-center text-${mode === "light" ? "dark" : "light"}`}
        >
          {tagLine}
        </p>
      </small>
      <div className="form-floating mb-3">
        <div className="d-flex justify-content-between">
          {actionButtonGroups.map(({ groupId, buttons }) => (
            <div key={groupId}>
              <ActionButton buttons={buttons} />
            </div>
          ))}
        </div>
        <div className="d-flex align-items-center mt-1 mb-2">
          <textarea
            className="form-control"
            id="floatingTextarea input"
            style={inputTextAreaStyle}
            onChange={onTextChange}
            value={inputText}
            placeholder="Enter text here."
            rows={12}
            required
          />
          <div className="mx-1"></div>
          <textarea
            className="form-control"
            id="floatingTextarea output"
            style={outputTextAreaStyle}
            value={outputText}
            placeholder="Nothing to preview!"
            rows={12}
            readOnly
          />
        </div>
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle className={`btn btn-sm top-btns mx-1 btn-${mode}`}>
              Upload
            </Dropdown.Toggle>
            <Dropdown.Menu variant={`${mode}`} className="menuName-opt">
              <input
                type="file"
                accept="text/plain"
                onChange={uploadTextFile}
                title="Open the text file"
                className="menuName-item"
              />
            </Dropdown.Menu>
          </Dropdown>
          {dropdownMenus.map(({ menuName, items }) => (
            <DropdownMenu
              key={menuName}
              mode={mode}
              menu={menuName}
              items={items}
              onSelect={runTool}
            />
          ))}
        </div>
      </div>
      <hr className={`text-${mode === "dark" ? "light" : "dark"}`} />
      <Statistics mode={mode} outputText={outputText} />
      <hr className={`text-${mode === "dark" ? "light" : "dark"}`} />
    </>
  );
});

export default Textareas;
