import { Option } from "../util/type/global.type";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import cn from "classnames";

//Icons
import { MdKeyboardArrowDown as Arrow } from "react-icons/md";

export type ComboBoxType = {
  placeholder?: string;
  getValue: any;
  setValue: any;
  options: Option[];
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  multiple?: boolean;
};

const ComboBox = ({
  options,
  getValue,
  setValue,
  label,
  placeholder,
  errorMessage,
  hasError,
  ...rest
}: ComboBoxType) => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredItem =
    query === ""
      ? options
      : options.filter((item) =>
          item?.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="h-auto w-full">
      <Combobox
        value={getValue}
        onChange={(e: any) => {
          setValue(e);
          setIsOpen(!isOpen);
        }}
      >
        <div className="relative w-full">
          {label && (
            <label className="mb-1 inline-flex items-center bg-white px-1 text-sm font-medium text-gray-700">
              {label.includes("*") ? label.split("*")[0] : label}
              {label.includes("*") && <span className="text-red-400">*</span>}
            </label>
          )}

          <div
            className={cn(
              "relative flex items-center rounded-md border px-3 shadow-sm hover:border-gray-400",
              {
                "border-gray-300 focus-within:border-gray-500": !hasError,
                "border-red-300 text-red-900 hover:border-red-500 focus:border-red-500 focus:outline-none":
                  hasError,
              }
            )}
          >
            <ComboboxButton
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="inset-0 flex w-full flex-row items-center gap-2"
            >
              <ComboboxInput
                autoComplete="off"
                {...rest}
                placeholder={placeholder}
                className={cn(
                  "block w-full flex-1 appearance-none border-0 px-0 py-2 text-sm outline-none focus:border-none focus:ring-0",
                  {
                    "placeholder-gray-500": !hasError,
                    "placeholder-red-300": hasError,
                  }
                )}
                displayValue={(item: any) => item?.label}
                onChange={(event: any) => setQuery(event.target.value)}
              />

              <span className="pointer-events-none">
                <Arrow
                  aria-hidden="true"
                  className={`text-icon-soft-400 h-5 w-5 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </ComboboxButton>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white px-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItem.length === 0 && query !== "" ? (
                <div className="cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItem.map((item, index) => (
                  <ComboboxOption
                    data-value={item.value}
                    data-test-id={
                      getValue === item.value
                        ? "selected-item"
                        : "un-selected-item"
                    }
                    key={index}
                    value={item}
                    className="relative w-full cursor-pointer px-4 py-3 text-sm font-normal text-gray-500 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {item?.label}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
        {hasError && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </Combobox>
    </div>
  );
};

export default ComboBox;
