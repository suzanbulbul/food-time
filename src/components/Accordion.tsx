import React, { useState } from "react";
import WhiteBox from "./WhiteBox";
import { MdKeyboardArrowDown as Arrow } from "react-icons/md";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <WhiteBox className="flex flex-col gap-1">
      <div
        className="relative flex cursor-pointer items-center justify-between"
        onClick={toggleAccordion}
      >
        <h1 className="ext-lg font-medium text-indigo-900">{title}</h1>
        <Arrow
          className={`absolute right-0 h-7 w-7 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && <div>{children}</div>}
    </WhiteBox>
  );
};

export default Accordion;
