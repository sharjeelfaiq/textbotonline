import React from "react";
import { dropdownOptionsProps } from "../DropdownMenu/DropdownOptionProps.js";

const AccordionItems = ({ menu }) => {
  const manipulationBtnsProps = dropdownOptionsProps();

  return (
    <ul style={{ listStyleType: "none" }} className="lh-lg">
      {manipulationBtnsProps.map(
        (item, index) =>
          item.menuName === menu && (
            <li key={index} style={{ width: "80%", borderRadius: "5px" }}>
              <small>
                <strong>{item.optionName} - </strong>
                {item.description}
              </small>
            </li>
          )
      )}
    </ul>
  );
};

export default AccordionItems;
