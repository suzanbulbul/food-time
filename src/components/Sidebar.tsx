import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";

//Redux
import { settingClickHandle } from "../redux/Slice/authSlice";

// Components
import Button from "./Button";

// Icons
import { IoHomeOutline } from "react-icons/io5";
import { PiBowlFoodLight } from "react-icons/pi";
import { CiSettings as Settings } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineFavoriteBorder } from "react-icons/md";

// Type
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
  id: number | string;
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
  attributes?: actionItemType[];
  disable?: boolean;
  tooltip?: TooltipContent;
  hidden?: boolean;
};

const Sidebar = ({ user }: { user: User }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [path, setPath] = useState<string>("home");

  const toggleSubMenu = (itemId: any) => {
    setActiveMenu(activeMenu === itemId ? 0 : itemId);
  };

  const asideData: actionsType[] = [
    {
      id: "home",
      name: "Ana Sayfa",
      icon: <IoHomeOutline className="h-5 w-5" />,
      onClick: () => {
        router.push("/home");
      },
      disable: false,
    },
    {
      id: "recipe",
      name: "Tariflerim",
      icon: <PiBowlFoodLight className="h-5 w-5" />,
      onClick: () => {
        router.push("/recipe");
      },
      disable: user ? false : true,
      tooltip: {
        message: "Bu özellik için giriş yapmanız gerekiyor.",
      },
    },
    {
      id: "fav-recipe",
      name: "Favori Tariflerim",
      icon: <MdOutlineFavoriteBorder className="h-5 w-5" />,
      onClick: () => {
        router.push("/fav-recipe");
      },
      disable: user ? false : true,
      tooltip: {
        message: "Bu özellik için giriş yapmanız gerekiyor.",
      },
    },
    {
      id: "settings",
      name: "Ayarlar",
      icon: <Settings className="h-5 w-5" />,
      onClick: () => {
        dispatch(settingClickHandle(true));
      },
      hidden: user ? false : true,
      tooltip: {
        message: "Bu özellik için giriş yapmanız gerekiyor.",
      },
    },
  ];

  useEffect(() => {
    setPath(router.pathname.slice(1));
  }, [router, router.pathname]);

  return (
    <div
      className={`relative pr-3 transition-all duration-500 ease-in-out ${
        isSidebarOpen ? "w-72" : "w-24"
      }`}
    >
      <div className={`h-screen bg-white p-2 shadow-md`}>
        <div className="mb-3 text-2xl font-bold text-gray-100">
          <Link href="/" className="flex justify-center">
            {isSidebarOpen && (
              <Image
                className="h-14 w-auto rounded-full"
                src="/img/logo.svg"
                alt="logo"
                width={56}
                height={56}
              />
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
                    className={`
                      h-11 w-full gap-4 text-gray-600 duration-300 hover:bg-indigo-100 hover:text-indigo-600
                      ${
                        path === item.id || path.includes(`${item?.id}/` as any)
                          ? " text-indigo-600"
                          : ""
                      }
                    `}
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
                          className={`
                            h-11 w-full gap-4 text-gray-600 duration-300 hover:bg-indigo-100 hover:text-indigo-600
                            ${path === item.id ? " text-indigo-600" : ""}
                          `}
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
