import { getDropdownToolsByMenu } from "../../features/tools/registry";

const AccordionItems = ({ menu }) => {
  const filteredItems = getDropdownToolsByMenu(menu);

  return (
    <ul className="list-disc space-y-1 pl-5">
      {filteredItems.map((item) => (
        <li key={item.id}>
          <span className="font-semibold">{item.optionName}</span>
          <span className="opacity-80"> — {item.optionDescription}</span>
        </li>
      ))}
    </ul>
  );
};

export default AccordionItems;
