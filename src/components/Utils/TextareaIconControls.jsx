"use client";

import React, { useMemo, useRef } from "react";

function IconButton({ icon: Icon, label, onClick, disabled, title }) {
  return (
    <button
      type="button"
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white/80 text-slate-900 shadow-sm backdrop-blur-sm transition-colors duration-fast ease-out hover:bg-white focus-visible:ring-2 focus-visible:ring-sky-400 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none dark:border-tbo-border dark:bg-tbo-panelSoft/80 dark:text-tbo-text dark:hover:bg-tbo-panel"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={title ?? label}
    >
      {Icon ? <Icon className="h-4 w-4 opacity-90" aria-hidden="true" /> : null}
    </button>
  );
}

function IconDropdown({ icon: Icon, label, items, onSelect, disabled }) {
  const detailsRef = useRef(null);

  const menuItems = useMemo(() => items ?? [], [items]);

  return (
    <details className="group relative" ref={detailsRef}>
      <summary
        className={[
          "inline-flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-md border border-slate-200 bg-white/80 text-slate-900 shadow-sm backdrop-blur-sm transition-colors duration-fast ease-out hover:bg-white focus-visible:ring-2 focus-visible:ring-sky-400 motion-reduce:transition-none dark:border-tbo-border dark:bg-tbo-panelSoft/80 dark:text-tbo-text dark:hover:bg-tbo-panel",
          disabled ? "pointer-events-none opacity-50" : null,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={label}
        title={label}
      >
        {Icon ? (
          <Icon className="h-4 w-4 opacity-90" aria-hidden="true" />
        ) : null}
      </summary>
      <div className="absolute bottom-full right-0 z-30 mb-2 w-64 origin-bottom-right overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg motion-reduce:animate-none group-open:animate-in group-open:fade-in-0 group-open:zoom-in-95 duration-normal ease-out dark:border-tbo-border dark:bg-tbo-panel dark:shadow-tbo">
        <div className="max-h-72 overflow-auto p-1">
          {menuItems.map(({ id, title, optionName, disabled: itemDisabled }) => (
            <button
              key={id}
              type="button"
              className="w-full rounded px-3 py-2 text-left text-sm text-slate-900 transition-colors duration-fast ease-out hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:text-tbo-text dark:hover:bg-tbo-panelSoft"
              title={title}
              disabled={Boolean(disabled) || Boolean(itemDisabled)}
              onClick={() => {
                onSelect?.(id);
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
}

const TextareaIconControls = React.memo(function TextareaIconControls({
  actions,
  dropdowns,
  position,
  alwaysVisible,
}) {
  const actionItems = useMemo(() => actions ?? [], [actions]);
  const dropdownItems = useMemo(() => dropdowns ?? [], [dropdowns]);
  const isTop = position === "top";
  const isAlwaysVisible = Boolean(alwaysVisible);

  return (
    <div
      className={[
        "absolute right-2 z-20 flex flex-col gap-1 rounded-lg bg-white/50 p-1 shadow-sm backdrop-blur-sm transition-opacity duration-fast ease-out motion-reduce:transition-none dark:bg-tbo-panelSoft/50",
        isAlwaysVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100",
        isTop ? "top-2" : "bottom-2",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {dropdownItems.length > 0 ? (
        <div className="flex flex-col items-center gap-1">
          {dropdownItems.map((menu) => (
            <IconDropdown
              key={menu.key ?? menu.label}
              icon={menu.icon}
              label={menu.label}
              items={menu.items}
              onSelect={menu.onSelect}
              disabled={menu.disabled}
            />
          ))}
        </div>
      ) : null}

      {actionItems.length > 0 ? (
        <div className="flex flex-col items-center gap-1">
          {actionItems.map((action) => (
            <IconButton
              key={action.key ?? action.label}
              icon={action.icon}
              label={action.label}
              title={action.title}
              onClick={action.onClick}
              disabled={action.disabled}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
});

export default TextareaIconControls;
