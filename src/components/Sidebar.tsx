import React, { useState } from "react";
import Link from "next/link";

//Icons
import { IoHomeOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<number>(0);

  const toggleSubMenu = (itemId: any) => {
    setActiveMenu(activeMenu === itemId ? 0 : itemId);
  };

  const asideData = [
    {
      id: 1,
      name: "Home",
      icon: <IoHomeOutline className="h-4 w-4" />,
      url: "/home",
    },
    {
      id: 2,
      name: "Item 1",
      icon: <FaRegCalendarAlt className="h-4 w-4" />,
      url: "/item-1",
    },
    {
      id: 3,
      name: "Item 2",
      icon: <FaRegUser className="h-4 w-4" />,
      attributes: [
        {
          id: 1,
          name: "Sub Item 1",
          url: "/sub-item-1",
        },
        {
          id: 2,
          name: "Sub Item 2",
          url: "/sub-item-2",
        },
      ],
    },
  ];

  return (
    <div
      className={`relative pr-3 transition-all duration-500 ease-in-out ${
        isSidebarOpen ? "w-72" : "w-24"
      }`}
    >
      <div className={`h-screen bg-white p-2 shadow-md`}>
        <div className="mb-3 text-2xl font-bold text-gray-100">
          <Link className="flex items-center justify-start p-2.5" href="/">
            {isSidebarOpen && (
              <h1 className="text-2xl font-bold text-indigo-500">Food Time</h1>
            )}
          </Link>
          <IoIosArrowForward
            className={`absolute right-0 top-6 rounded-full bg-indigo-500 p-1 ${
              isSidebarOpen ? "rotate-180 duration-300" : ""
            }`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        {asideData.map((item) => (
          <div key={item.id}>
            {item.url ? (
              <Link
                href={item.url}
                className={`flex h-11 cursor-pointer items-center gap-4 rounded-md px-4 text-gray-600 duration-300 hover:bg-indigo-100 hover:text-indigo-600 ${
                  isSidebarOpen ? "" : "justify-center"
                }`}
              >
                {item.icon}

                {isSidebarOpen && (
                  <span className="text-base font-normal">{item.name}</span>
                )}
              </Link>
            ) : (
              <div>
                <div
                  className={`flex h-11 cursor-pointer items-center gap-4 rounded-md px-4 text-gray-600 duration-300 hover:bg-indigo-100 hover:text-indigo-600 ${
                    isSidebarOpen ? "" : "justify-center"
                  }`}
                  onClick={() => toggleSubMenu(item.id)}
                >
                  {item.icon}
                  {isSidebarOpen && (
                    <>
                      <span className="text-base font-normal">{item.name}</span>
                      <IoIosArrowForward
                        className={`ml-auto text-indigo-600 duration-300 ${
                          activeMenu === item.id ? "rotate-90" : ""
                        }`}
                      />
                    </>
                  )}
                </div>
                <div className={`${activeMenu === item.id ? "" : "hidden"}`}>
                  {item?.attributes?.map((subItem) => (
                    <Link
                      href={subItem.url}
                      key={subItem.id}
                      className="flex h-10 cursor-pointer items-center gap-4 rounded-md px-4 text-gray-600 duration-300 hover:bg-indigo-100 hover:text-indigo-600"
                    >
                      <span className="h-4 w-4"></span>
                      {isSidebarOpen && (
                        <span className="text-sm font-normal">
                          {subItem.name}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
