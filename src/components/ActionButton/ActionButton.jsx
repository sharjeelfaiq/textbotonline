import { motion } from "framer-motion";

const ActionButton = ({ buttons }) => {
  return (
    <>
      {buttons.map((btnProp) => (
        <motion.button
          whileTap={{
            scale: 0.98,
          }}
          onClick={btnProp.action}
          className={btnProp.className}
          disabled={btnProp.disabled}
          title={btnProp.title}
          key={btnProp.title ?? btnProp.actionName}
        >
          <span>{btnProp.actionName}</span>
          {btnProp.iconClasses ? (
            <i className={btnProp.iconClasses} aria-hidden="true" />
          ) : null}
        </motion.button>
      ))}
    </>
  );
};

export default ActionButton;
