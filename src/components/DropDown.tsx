import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";

//Icons
import { MdKeyboardArrowDown as Arrow } from "react-icons/md";

interface PropsType {
  actions: DropdownAction[];
  title?: string;
}

export interface DropdownAction {
  label: string;
  onClick: () => void;
}
const DropDown = ({ actions, title }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex min-w-24 items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          title={title ? title : "Action"}
        >
          <span className="flex items-center">
            {title}
            <Arrow
              aria-hidden="true"
              className={`text-icon-soft-400 h-5 w-5 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-auto min-w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div>
          {actions.map((action, index) => (
            <MenuItem key={index}>
              <button
                type="button"
                onClick={action.onClick}
                className="block w-full cursor-pointer truncate px-4 py-2 text-center text-sm font-normal text-gray-700 data-[focus]:bg-indigo-100 data-[focus]:text-indigo-600"
              >
                {action.label}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropDown;
