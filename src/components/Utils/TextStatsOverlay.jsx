import React from "react";

const TextStatsOverlay = React.memo(function TextStatsOverlay({ stats }) {
  if (!stats) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-2 left-3 inline-flex items-center gap-2 rounded-md border border-slate-900/10 bg-white/60 px-2 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur-sm tabular-nums dark:border-white/10 dark:bg-black/20 dark:text-tbo-muted"
    >
      <span>Chars: {stats.characters.toLocaleString()}</span>
      <span className="opacity-60">·</span>
      <span>Words: {stats.words.toLocaleString()}</span>
      <span className="opacity-60">·</span>
      <span>Lines: {stats.lines.toLocaleString()}</span>
    </div>
  );
});

export default TextStatsOverlay;

