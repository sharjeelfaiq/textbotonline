import React from "react";
import { motion } from "framer-motion";

const ActionButton = ({ action, className, disabled, title, actionName, iconClases }) => {
  return (
    <motion.button
      whileTap={{
        scale: 0.5,
      }}
      onClick={action}
      className={className}
      disabled={disabled}
      title={title}
    >
      {actionName} <i className={`${iconClases}`}></i>
    </motion.button>
  );
};

export default ActionButton;
