import { motion } from "framer-motion";

const ActionButton = ({ buttons }) => {
  return (
    <>
      {buttons.map((btnProp) => (
        <motion.button
          whileTap={{
            scale: 0.5,
          }}
          onClick={btnProp.action}
          className={btnProp.className}
          disabled={btnProp.disabled}
          title={btnProp.title}
          key={btnProp.title}
        >
          {btnProp.actionName} <i className={`${btnProp.iconClasses}`}></i>
        </motion.button>
      ))}
    </>
  );
};

export default ActionButton;
