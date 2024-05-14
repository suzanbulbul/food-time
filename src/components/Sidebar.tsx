import React, { useState } from "react";
import Link from "next/link";

//Icon
import { IoHomeOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSubMenu = (itemId: any) => {
    setActiveMenu(activeMenu === itemId ? null : itemId);
  };

  const asideData = [
    {
      id: 1,
      name: "Dashboard",
      icon: <IoHomeOutline className="w-4 h-4" />,
      url: "/dashboard",
    },
    {
      id: 2,
      name: "Calendar",
      icon: <FaRegCalendarAlt className="w-4 h-4" />,
      url: "/calendar",
    },
    {
      id: 3,
      name: "Company",
      icon: <FaRegUser className="w-4 h-4" />,
      attributes: [
        {
          id: 1,
          name: "Company List",
          url: "/companies",
        },
        {
          id: 2,
          name: "Contract List",
          url: "/contractlist",
        },
      ],
    },
  ];

  return (
    <div
      className={`pr-3 relative duration-300 ${
        isSidebarOpen ? "w-60 " : "w-24"
      }`}
    >
      <div className={`bg-white h-screen p-2 shadow-md`}>
        <div className="text-gray-100 text-2xl font-bold mb-3">
          <Link className="p-2.5 flex items-center" href="/">
            <i className="w-16 h-16 text-blue-600">L</i>
            {isSidebarOpen && (
              <h1 className="font-bold text-2xl text-indigo-500">HiganTech</h1>
            )}
          </Link>
          <IoIosArrowForward
            className={`bg-indigo-500 rounded-full p-1 absolute top-9 right-0 ${
              isSidebarOpen ? "rotate-180 duration-300" : ""
            }`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        {asideData.map((item) => (
          <div key={item.id}>
            {item.url ? (
              <div
                className={`h-11 rounded-md flex gap-4 items-center px-4 duration-300 cursor-pointer text-gray-600 hover:text-indigo-600 hover:bg-indigo-100 ${
                  isSidebarOpen ? "" : "justify-center"
                }`}
              >
                {item.icon}

                {isSidebarOpen && (
                  <a href={item.url} className="text-base font-normal">
                    {item.name}
                  </a>
                )}
              </div>
            ) : (
              <div>
                <div
                  className={`h-11 gap-4 flex items-center rounded-md px-4 duration-300 cursor-pointer text-gray-600 hover:text-indigo-600 hover:bg-indigo-100 ${
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
                    <div
                      key={subItem.id}
                      className="h-10 gap-4 flex items-center rounded-md px-4 duration-300 cursor-pointer text-gray-600 hover:text-indigo-600 hover:bg-indigo-100"
                    >
                      <span className="w-4 h-4"></span>

                      {isSidebarOpen && (
                        <a href={subItem.url} className="text-sm font-normal">
                          {subItem.name}
                        </a>
                      )}
                    </div>
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
