"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import InputToolbar from "@/components/ui/input-toolbar";
import { useInputActions } from "@/hooks/useInputActions";

type NotifyType = "success" | "warning" | "error";

export type InputTextareaProps = {
  id: string;
  value: string;
  onValueChange: (nextValue: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  textareaStyle?: React.CSSProperties;
  wrapperClassName?: string;
  textareaClassName?: string;
  ariaLabel?: string;
  bottomOverlay?: React.ReactNode;
  alwaysVisibleToolbar?: boolean;
  maxUploadBytes?: number;
  uploadAccept?: string;
  onNotify?: (message: string, type?: NotifyType) => void;
  onPaste?: () => void | Promise<void>;
  onPasteText?: (text: string) => void;
  onUploadText?: (text: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onClear?: () => void;
  onCopy?: () => void | Promise<void>;
  onDownload?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  pasteDisabled?: boolean;
  uploadDisabled?: boolean;
  clearDisabled?: boolean;
  copyDisabled?: boolean;
  downloadDisabled?: boolean;
};

const DEFAULT_MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export default function InputTextarea({
  id,
  value,
  onValueChange,
  placeholder,
  rows = 12,
  required,
  textareaStyle,
  wrapperClassName,
  textareaClassName,
  ariaLabel = "Input panel",
  bottomOverlay,
  alwaysVisibleToolbar = true,
  maxUploadBytes = DEFAULT_MAX_UPLOAD_BYTES,
  uploadAccept = "text/plain",
  onNotify,
  onPaste,
  onPasteText,
  onUploadText,
  onUndo,
  onRedo,
  onClear,
  onCopy,
  onDownload,
  canUndo,
  canRedo,
  pasteDisabled,
  uploadDisabled,
  clearDisabled,
  copyDisabled,
  downloadDisabled,
}: InputTextareaProps) {
  const { fileInputRef, handleUploadClick, handleUploadChange, handlePaste } =
    useInputActions({
      maxUploadBytes,
      onNotify,
      onValueChange,
      onPaste,
      onPasteText,
      onUploadText,
    });

  const resolvedClearDisabled = useMemo(() => {
    if (typeof clearDisabled === "boolean") return clearDisabled;
    return value.length === 0;
  }, [clearDisabled, value.length]);

  const resolvedCopyDisabled = useMemo(() => {
    if (typeof copyDisabled === "boolean") return copyDisabled;
    return value.trim().length === 0;
  }, [copyDisabled, value]);

  const resolvedDownloadDisabled = useMemo(() => {
    if (typeof downloadDisabled === "boolean") return downloadDisabled;
    return value.trim().length === 0;
  }, [downloadDisabled, value]);

  return (
    <section className={cn("tbo-surface group relative", wrapperClassName)} aria-label={ariaLabel}>
      <label htmlFor={id} className="sr-only">
        Input text
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept={uploadAccept}
        className="hidden"
        onChange={handleUploadChange}
      />

      <textarea
        id={id}
        className={cn("tbo-textarea min-h-64 pr-24", textareaClassName)}
        style={textareaStyle}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />

      {bottomOverlay}

      <InputToolbar
        alwaysVisible={alwaysVisibleToolbar}
        canUndo={canUndo}
        canRedo={canRedo}
        pasteDisabled={pasteDisabled}
        uploadDisabled={uploadDisabled}
        clearDisabled={resolvedClearDisabled}
        copyDisabled={resolvedCopyDisabled}
        downloadDisabled={resolvedDownloadDisabled}
        onPaste={handlePaste}
        onUpload={handleUploadClick}
        onCopy={onCopy}
        onDownload={onDownload}
        onUndo={onUndo}
        onRedo={onRedo}
        onClear={onClear}
      />
    </section>
  );
}
