
import { dropdownData } from "../DropdownMenu/DropdownMenuData";

const AccordionItems = ({ menu }) => {
  const manipulationBtnsProps = dropdownData();

  const filteredItems = manipulationBtnsProps.filter(
    (item) => item.menuName === menu
  );

  return (
    <ul style={{ listStyleType: "none" }} className="lh-lg">
      {filteredItems.map((item, index) => (
        <li key={index} style={{ width: "80%", borderRadius: "5px" }}>
          <small>
            <strong>{item.optionName} - </strong>
            {item.optionDescription}
          </small>
        </li>
      ))}
    </ul>
  );
};

export default AccordionItems;
