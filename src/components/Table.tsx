import React, { useState } from "react";
import cn from "classnames";

//Library
import dayjs from "dayjs";

//Icons
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import WhiteBox from "./WhiteBox";

interface TablePrpos {
  data: {
    name: string;
    email: string;
    owner: string;
    phone: string;
    createdAt: string;
    position: string;
    updatedAt: string;
  }[];
  columns: string[];
  select?: boolean;
  setSelect?: Function;
  className?: string;
}

const Table = ({
  data,
  columns,
  select = false,
  setSelect,
  className,
}: TablePrpos) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <WhiteBox className={cn("relative overflow-x-auto", className)}>
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

            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-3 text-left font-light text-xs text-gray-400 min-w-28"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((user: any) => (
            <tr key={user.id} className="bg-white ">
              {select && (
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${user.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 "
                    />
                    <label
                      htmlFor={`checkbox-table-search-${user.id}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
              )}

              <td className="px-4 py-3 text-left text-sm min-w-28">
                {" "}
                {user.name}
              </td>
              <td className="px-4 py-3 text-left text-sm min-w-28">
                {user.email}
              </td>
              <td className="px-4 py-3 text-left text-sm min-w-28">
                {user.owner}
              </td>
              <td className="px-4 py-3 text-left text-sm min-w-28">
                {user.phone}
              </td>
              <td className="px-4 py-3 text-left text-sm min-w-28">
                {dayjs(user.createdAt).format("DD.MM.YYYY")}
              </td>
              <td className="px-4 py-3 text-left text-sm min-w-28">
                {dayjs(user.updatedAt).format("DD.MM.YYYY")}
              </td>
              <td className="px-4 py-3 text-left text-sm min-w-28 flex items-center gap-4">
                <a href="#" className="font-medium ">
                  <FaEdit className="w-4 h-4 text-gray-600" />
                </a>
                <a href="#" className="font-medium">
                  <RiDeleteBin6Line className="w-4 h-4 text-red-600" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </WhiteBox>
  );
};

export default Table;
