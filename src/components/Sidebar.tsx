import React, { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";

//Redux
import { userInfo } from "../redux/Slice/authSlice";
import { useSelector } from "react-redux";

//Compopnents
import Button from "./Button";

//Icons
import { IoHomeOutline } from "react-icons/io5";
import { PiBowlFoodLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineFavoriteBorder } from "react-icons/md";

//Type
import { User } from "../util/type/user.type";
import { TooltipContent } from "./Tooltip";

export type actionItemType = {
  id: number;
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disable: boolean;
  tooltip?: TooltipContent;
  hidden: boolean;
};

export type actionsType = {
  id: number;
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
  attributes?: actionItemType[];
  disable?: boolean;
  tooltip?: TooltipContent;
  hidden?: boolean;
};

const Sidebar = () => {
  const user = useSelector(userInfo);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [selectInfo, setSelectInfo] = useState<User>(undefined);

  const toggleSubMenu = (itemId: any) => {
    setActiveMenu(activeMenu === itemId ? 0 : itemId);
  };

  const asideData: actionsType[] = [
    {
      id: 1,
      name: "Home",
      icon: <IoHomeOutline className="h-5 w-5" />,
      onClick: () => {
        router.push("/home");
      },
      disable: false,
    },
    {
      id: 2,
      name: "Add Recipe",
      icon: <PiBowlFoodLight className="h-5 w-5" />,
      onClick: () => {
        router.push("/recipe");
      },
      disable: selectInfo ? false : true,
      tooltip: {
        message: "Need to Login for feature",
      },
    },
    {
      id: 3,
      name: "Favorite Recipes",
      icon: <MdOutlineFavoriteBorder className="h-5 w-5" />,
      onClick: () => {
        router.push("/favorite-recipe");
      },
      disable: selectInfo ? false : true,
      tooltip: {
        message: "Need to Login for feature",
      },
    },
    {
      id: 4,
      name: "Settings",
      icon: <CiSettings className="h-5 w-5" />,
      onClick: () => {
        router.push("/settings");
      },
      hidden: selectInfo ? false : true,
      tooltip: {
        message: "You need to Login for feature",
      },
    },
    // {
    //   id: 3,
    //   name: "Item 2",
    //   icon: <FaRegUser className="h-4 w-4" />,
    //   attributes: [
    //     {
    //       id: 1,
    //       name: "Sub Item 1",
    //       onClick: () => {
    //         router.push("/sub-item-1");
    //       },
    //       disable: selectInfo ? false : true,
    //     },
    //     {
    //       id: 2,
    //       name: "Sub Item 2",
    //       onClick: () => {
    //         router.push("/sub-item-2");
    //       },
    //       disable: selectInfo ? false : true,
    //     },
    //   ],
    // },
  ];

  useEffect(() => {
    setSelectInfo(user);
  }, [user]);

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
        {asideData.map(
          (item) =>
            !item.hidden && (
              <div key={item.id}>
                {item.onClick ? (
                  <Button
                    tooltip={item.disable ? item.tooltip : undefined}
                    justify={isSidebarOpen ? "start" : "center"}
                    variant="transparent"
                    disabled={item?.disable}
                    onClick={item.onClick}
                    className={`h-11 w-full gap-4 text-gray-600 duration-300 hover:bg-indigo-100 hover:text-indigo-600`}
                  >
                    {item.icon}

                    {isSidebarOpen && (
                      <span className="text-base font-normal">{item.name}</span>
                    )}
                  </Button>
                ) : (
                  <div>
                    <Button
                      variant="transparent"
                      justify={isSidebarOpen ? "start" : "center"}
                      className={`h-11 w-full gap-4 text-gray-600 duration-300 hover:bg-indigo-100 hover:text-indigo-600`}
                      onClick={() => toggleSubMenu(item.id)}
                    >
                      {item.icon}
                      {isSidebarOpen && (
                        <>
                          <span className="text-base font-normal">
                            {item.name}
                          </span>
                          <IoIosArrowForward
                            className={`ml-auto text-indigo-600 duration-300 ${
                              activeMenu === item.id ? "rotate-90" : ""
                            }`}
                          />
                        </>
                      )}
                    </Button>
                    <div
                      className={`${activeMenu === item.id ? "" : "hidden"}`}
                    >
                      {item?.attributes?.map((subItem) => (
                        <Button
                          tooltip={
                            subItem.disable ? subItem.tooltip : undefined
                          }
                          justify={isSidebarOpen ? "start" : "center"}
                          variant="transparent"
                          disabled={subItem?.disable}
                          onClick={item.onClick}
                          key={subItem.id}
                          className="h-10 gap-4  text-gray-600 duration-300 hover:bg-indigo-100 hover:text-indigo-600"
                        >
                          <span className="h-4 w-4"></span>
                          {isSidebarOpen && (
                            <span className="text-sm font-normal">
                              {subItem.name}
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
