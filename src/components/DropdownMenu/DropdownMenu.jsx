import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from "react-bootstrap";

const DropdownMenu = ({
  mode,
  menu,
  items,
  onSelect,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className={`btn btn-sm top-btns btn-${mode}`}>
        {menu}
      </Dropdown.Toggle>
      <Dropdown.Menu className="menu-scroll" variant={mode}>
        {items.map(({ id, title, optionName, disabled }) => (
          <Dropdown.Item
            title={title}
            onClick={() => onSelect(id)}
            disabled={disabled}
            className="menu-item"
            key={id}
          >
            {optionName}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
