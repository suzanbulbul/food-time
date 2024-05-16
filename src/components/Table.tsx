import React, { useState } from "react";
import cn from "classnames";

//Components
import WhiteBox from "./WhiteBox";

//Icons
import { HiOutlineDotsVertical } from "react-icons/hi";
import Link from "next/link";

interface TablePrpos {
  data: any[];
  columns: {
    title: any;
    cell: any;
  }[];
  tableAction?: {
    onClick: (rowData: any) => void;
    text: string;
  }[];
  select?: boolean;
  setSelect?: Function;
  className?: string;
}

const Table = ({
  data,
  columns,
  tableAction,
  select = false,
  setSelect,
  className,
}: TablePrpos) => {
  const [selectAll, setSelectAll] = useState(false);
  const [action, setAction] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <WhiteBox className={cn("relative", className)}>
      <table className="w-full">
        <thead className="border-b">
          <tr>
            {select && (
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 "
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            )}

            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 py-3 text-left font-light text-xs text-gray-400 min-w-28"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item: any) => (
            <tr key={item.id} className="bg-white ">
              {select && (
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${item.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 "
                    />
                    <label
                      htmlFor={`checkbox-table-search-${item.id}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
              )}
              {columns.map((column, index) => (
                <td
                  key={index}
                  className="px-4 py-3 text-left text-sm min-w-28"
                >
                  {column.cell(item)}
                </td>
              ))}
              {tableAction && (
                <td className="px-4 py-3 text-right">
                  <div className="relative">
                    <button onClick={() => setAction(!action)}>
                      <HiOutlineDotsVertical />
                    </button>
                    {action && (
                      <ul className="overflow-scroll absolute right-0 z-10 mt-2 origin-top-right border rounded-lg bg-white shadow-lg ">
                        {tableAction.map((item, index) => (
                          <li
                            key={index}
                            className="px-6 py-2 text-sm font-normal text-center text-gray-600 hover:text-indigo-600 hover:bg-indigo-100"
                          >
                            <button key={index} onClick={item.onClick}>
                              {item.text}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </WhiteBox>
  );
};

export default Table;
