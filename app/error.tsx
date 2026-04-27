"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-slate-900 dark:bg-tbo-bg dark:text-tbo-text">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-tbo-border dark:bg-tbo-panel">
        <h1 className="text-base font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-tbo-muted">
          Please try again. If this keeps happening, refresh the page.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-tbo-accent dark:text-slate-950 dark:hover:brightness-110"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

