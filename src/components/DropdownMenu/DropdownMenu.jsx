import { useRef } from "react";

const DropdownMenu = ({ menu, items, onSelect }) => {
  const detailsRef = useRef(null);

  return (
    <details className="relative" ref={detailsRef}>
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900">
        <span>{menu}</span>
        <i className="bi bi-chevron-down text-xs opacity-70" aria-hidden="true" />
      </summary>
      <div className="absolute left-0 z-20 mt-2 w-64 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
        <div className="max-h-72 overflow-auto p-1">
          {items.map(({ id, title, optionName, disabled }) => (
            <button
              key={id}
              type="button"
              className="w-full rounded px-3 py-2 text-left text-sm text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100 dark:hover:bg-zinc-900"
              title={title}
              disabled={disabled}
              onClick={() => {
                onSelect(id);
                if (detailsRef.current) detailsRef.current.open = false;
              }}
            >
              {optionName}
            </button>
          ))}
        </div>
      </div>
    </details>
  );
};

export default DropdownMenu;
