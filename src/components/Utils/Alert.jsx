import { BsXLg } from "react-icons/bs";

function Alert(props) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const type = props.alert?.type || "info";

  const { tone, closeTone } = (() => {
    if (type === "success") {
      return {
        tone: "bg-emerald-600 text-white",
        closeTone:
          "bg-white/10 text-white/90 hover:bg-white/20 focus-visible:ring-white/60",
      };
    }
    if (type === "warning") {
      return {
        tone: "bg-amber-500 text-amber-950",
        closeTone:
          "bg-black/10 text-amber-950/90 hover:bg-black/15 focus-visible:ring-amber-950/30",
      };
    }
    if (type === "error") {
      return {
        tone: "bg-rose-600 text-white",
        closeTone:
          "bg-white/10 text-white/90 hover:bg-white/20 focus-visible:ring-white/60",
      };
    }
    return {
      tone: "bg-slate-900 text-white",
      closeTone:
        "bg-white/10 text-white/90 hover:bg-white/20 focus-visible:ring-white/60",
    };
  })();

  return (
    <div className="min-h-[3.5rem]" aria-live="polite" aria-atomic="true">
      {props.alert && (
        <div
          className={`mx-auto flex w-full max-w-2xl items-start justify-between gap-3 rounded-lg px-4 py-3 shadow-lg ${tone}`}
          role="status"
        >
          <div className="text-sm leading-6">
            <strong className="mr-1 font-semibold">
              {capitalizeFirstLetter(type)}
            </strong>
            <span>{props.alert.msg}</span>
          </div>
          <button
            type="button"
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md focus-visible:ring-2 ${closeTone}`}
            aria-label="Dismiss notification"
            onClick={props.onDismiss}
          >
            <BsXLg className="text-sm" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Alert;
