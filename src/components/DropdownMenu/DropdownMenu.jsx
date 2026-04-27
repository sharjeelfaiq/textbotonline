"use client";

import { useRef } from "react";
import { BsChevronDown } from "react-icons/bs";

const DropdownMenu = ({ menu, items, onSelect }) => {
  const detailsRef = useRef(null);

  return (
    <details className="group relative" ref={detailsRef}>
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-sm border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition-colors duration-fast ease-out hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-400 motion-reduce:transition-none dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:shadow-tbo-inset dark:hover:bg-tbo-panel">
        <span>{menu}</span>
        <BsChevronDown
          className="text-[10px] opacity-80 transition-transform duration-fast ease-out motion-reduce:transition-none group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="absolute left-0 z-20 mt-2 w-64 origin-top-left overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg motion-reduce:animate-none group-open:animate-in group-open:fade-in-0 group-open:zoom-in-95 duration-normal ease-out dark:border-tbo-border dark:bg-tbo-panel dark:shadow-tbo">
        <div className="max-h-72 overflow-auto p-1">
          {items.map(({ id, title, optionName, disabled }) => (
            <button
              key={id}
              type="button"
              className="w-full rounded px-3 py-2 text-left text-sm text-slate-900 transition-colors duration-fast ease-out hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:text-tbo-text dark:hover:bg-tbo-panelSoft"
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
