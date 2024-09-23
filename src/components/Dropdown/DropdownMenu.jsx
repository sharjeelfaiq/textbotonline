import React, { useMemo } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../../css/Textareas.css";
import { Dropdown } from "react-bootstrap";
import { dropdownOptionsProps } from "./DropdownOptionProps";

const DropdownMenu = ({
  mode,
  inputText,
  setOutputText,
  setInputText,
  transitionOutputTextarea,
  props,
  menu,
}) => {
  const manipulationBtnsData = useMemo(
    () =>
      dropdownOptionsProps(
        inputText,
        props,
        setOutputText,
        setInputText,
        transitionOutputTextarea
      ),
    [inputText, props, setInputText, setOutputText, transitionOutputTextarea]
  );
  const isDisabled = menu === "Generate" ? false : inputText.length === 0;

  return (
    <Dropdown>
      <Dropdown.Toggle className={`btn btn-sm top-btns mx-1 btn-${props.mode}`}>
        {menu}
      </Dropdown.Toggle>
      <Dropdown.Menu className="menuName-scroll menu-scroll" variant={mode}>
        {manipulationBtnsData.map(
          ({ title, action, optionName, menuName }) =>
            menuName === menu && (
              <Dropdown.Item
                title={title}
                onClick={action}
                disabled={isDisabled}
                className="menu-item"
                key={optionName}
              >
                {optionName}
              </Dropdown.Item>
            )
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
