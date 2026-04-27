"use client";

import { useCallback, useRef } from "react";

type NotifyType = "success" | "warning" | "error";

type UseInputActionsParams = {
  maxUploadBytes: number;
  onNotify?: (message: string, type?: NotifyType) => void;
  onValueChange: (nextValue: string) => void;
  onPaste?: () => void | Promise<void>;
  onPasteText?: (text: string) => void;
  onUploadText?: (text: string) => void;
};

export function useInputActions({
  maxUploadBytes,
  onNotify,
  onValueChange,
  onPaste,
  onPasteText,
  onUploadText,
}: UseInputActionsParams) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleUploadChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;

      if (file.size > maxUploadBytes) {
        onNotify?.(
          `File is too large (${file.size.toLocaleString()} bytes). Please upload a smaller file.`,
          "warning"
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (readEvent) => {
        const content = String(readEvent.target?.result ?? "");
        if (onUploadText) {
          onUploadText(content);
        } else {
          onValueChange(content);
        }
        onNotify?.("File uploaded successfully!", "success");
      };
      reader.onerror = (error) => {
        onNotify?.("Error reading file: " + String(error), "error");
      };
      reader.readAsText(file);
    },
    [maxUploadBytes, onNotify, onUploadText, onValueChange]
  );

  const fallbackPaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (typeof text !== "string") return;
      if (onPasteText) {
        onPasteText(text);
      } else {
        onValueChange(text);
      }
      onNotify?.("Pasted from clipboard.", "success");
    } catch (_) {
      onNotify?.("Clipboard paste failed. Please paste manually.", "warning");
    }
  }, [onNotify, onPasteText, onValueChange]);

  const handlePaste = useCallback(() => {
    if (onPaste) return onPaste();
    return fallbackPaste();
  }, [fallbackPaste, onPaste]);

  return {
    fileInputRef,
    handleUploadClick,
    handleUploadChange,
    handlePaste,
  };
}
