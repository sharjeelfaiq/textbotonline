const ActionButton = ({ buttons }) => {
  const baseClassName =
    "transition-colors transition-transform duration-150 ease-out active:scale-[0.98] disabled:active:scale-100 motion-reduce:transition-none";

  return (
    <>
      {buttons.map((btnProp) => (
        <button
          onClick={btnProp.action}
          className={`${btnProp.className ?? ""} ${baseClassName}`.trim()}
          disabled={btnProp.disabled}
          title={btnProp.title}
          key={btnProp.title ?? btnProp.actionName}
        >
          <span>{btnProp.actionName}</span>
          {btnProp.icon ? (
            <btnProp.icon className="text-sm opacity-90" aria-hidden="true" />
          ) : btnProp.iconClasses ? (
            <i className={btnProp.iconClasses} aria-hidden="true" />
          ) : null}
        </button>
      ))}
    </>
  );
};

export default ActionButton;
