

function Alert(props) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toBootstrapVariant = (type) => {
    if (!type) return "info";
    if (type === "error") return "danger";
    return type;
  };

  const variant = toBootstrapVariant(props.alert?.type);
  const closeButtonClass =
    variant === "warning" || variant === "light" ? "btn-close" : "btn-close btn-close-white";

  return (
    <div className="alert-div tb-toastShell" aria-live="polite" aria-atomic="true">
      {props.alert && (
        <div
          className={`toast show align-items-center text-bg-${variant} border-0 tb-toast`}
          role="status"
        >
          <div className="d-flex">
            <div className="toast-body">
              <strong className="me-1">
                {capitalizeFirstLetter(props.alert.type)}
              </strong>
              {props.alert.msg}
            </div>
            <button
              type="button"
              className={`${closeButtonClass} me-2 m-auto`}
              aria-label="Dismiss notification"
              onClick={props.onDismiss}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Alert;
