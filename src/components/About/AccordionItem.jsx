
import { getDropdownToolsByMenu } from "../../features/tools/registry";

const AccordionItems = ({ menu }) => {
  const filteredItems = getDropdownToolsByMenu(menu);

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
