"use client";

import { useCallback } from "react";
import {
  BsArrowClockwise,
  BsArrowCounterclockwise,
  BsClipboard,
  BsUpload,
  BsDownload,
  BsXLg,
} from "react-icons/bs";
import TextareaIconControls from "@/src/components/Utils/TextareaIconControls";

export type InputToolbarProps = {
  canUndo?: boolean;
  canRedo?: boolean;
  pasteDisabled?: boolean;
  uploadDisabled?: boolean;
  clearDisabled?: boolean;
  copyDisabled?: boolean;
  downloadDisabled?: boolean;
  alwaysVisible?: boolean;
  onPaste?: () => void | Promise<void>;
  onUpload?: () => void;
  onCopy?: () => void | Promise<void>;
  onDownload?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onClear?: () => void;
};

export default function InputToolbar({
  canUndo,
  canRedo,
  pasteDisabled,
  uploadDisabled,
  clearDisabled,
  copyDisabled,
  downloadDisabled,
  alwaysVisible,
  onPaste,
  onUpload,
  onCopy,
  onDownload,
  onUndo,
  onRedo,
  onClear,
}: InputToolbarProps) {
  const handlePaste = useCallback(() => {
    void onPaste?.();
  }, [onPaste]);

  const handleCopy = useCallback(() => {
    void onCopy?.();
  }, [onCopy]);

  const actions = [
    {
      key: "upload",
      label: "Upload .txt",
      icon: BsUpload,
      title: "Open a .txt file",
      disabled: uploadDisabled,
      onClick: onUpload,
    },
    {
      key: "paste",
      label: "Paste",
      icon: BsClipboard,
      title: "Paste from clipboard",
      disabled: pasteDisabled,
      onClick: handlePaste,
    },
  ];

  if (onCopy) {
    actions.push({
      key: "copy",
      label: "Copy",
      icon: BsClipboard,
      title: "Copy text to clipboard",
      disabled: copyDisabled,
      onClick: handleCopy,
    });
  }

  if (onDownload) {
    actions.push({
      key: "download",
      label: "Download",
      icon: BsDownload,
      title: "Download as .txt",
      disabled: downloadDisabled,
      onClick: onDownload,
    });
  }

  actions.push(
    {
      key: "undo",
      label: "Undo",
      icon: BsArrowCounterclockwise,
      title: "Undo (Ctrl+Z / Cmd+Z)",
      disabled: !canUndo,
      onClick: onUndo,
    },
    {
      key: "redo",
      label: "Redo",
      icon: BsArrowClockwise,
      title: "Redo (Ctrl+Y / Cmd+Shift+Z)",
      disabled: !canRedo,
      onClick: onRedo,
    },
    {
      key: "clear",
      label: "Clear",
      icon: BsXLg,
      title: "Clear text",
      disabled: clearDisabled,
      onClick: onClear,
    }
  );

  return (
    <TextareaIconControls
      position="top"
      alwaysVisible={alwaysVisible}
      actions={actions}
    />
  );
}
