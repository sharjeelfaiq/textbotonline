import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../../css/Textareas.css";
import { Dropdown } from "react-bootstrap";

const TextManipulationButton = ({ title, action, isDisabled, optionName }) => {
  return (
    <Dropdown.Item
      title={title}
      onClick={action}
      disabled={isDisabled}
      className="menu-item"
    >
      {optionName}
    </Dropdown.Item>
  );
};

export default TextManipulationButton;
