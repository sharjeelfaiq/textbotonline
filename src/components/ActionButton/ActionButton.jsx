import { useMemo } from "react";
import { actionButtonProps } from "../ActionButton/ActionButtonProps.js";
import { motion } from "framer-motion";

const ActionButton = ({
  inputText,
  outputText,
  setInputText,
  setOutputText,
  props,
  transitionInputTextarea,
  transitionOutputTextarea,
  index,
}) => {
  const actionBtnsData = useMemo(
    () =>
      actionButtonProps(
        inputText,
        outputText,
        setInputText,
        setOutputText,
        props,
        transitionInputTextarea,
        transitionOutputTextarea
      ),
    [
      inputText,
      outputText,
      props,
      setInputText,
      setOutputText,
      transitionInputTextarea,
      transitionOutputTextarea,
    ]
  );

  return (
    <>
      {actionBtnsData[index].map((btnProp) => (
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
