import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

//Components
import { WhiteBox } from "../../components";

//Icons
import { TbWorld } from "react-icons/tb";
import { AiOutlineAppstore } from "react-icons/ai";
import { PiBellRinging } from "react-icons/pi";

const Dashboard = () => {
  const [openSettingMenu, setOpenSettingMenu] = useState<boolean>(false);

  const settingData = [
    {
      label: "Your Profile",
      url: "/profile",
    },
    {
      label: "Settings",
      url: "/setting",
    },
    {
      label: "Sign out",
      url: "/",
    },
  ];

  return (
    <WhiteBox>
      <nav className="flex justify-between items-center">
        <input type="text" placeholder="Search" />
        <div className="grid ggrid-rows-4 grid-flow-col gap-5 items-center">
          <Link href="#" className="row-span-1">
            <TbWorld className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
          </Link>
          <Link href="#" className="row-span-1">
            <AiOutlineAppstore className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
          </Link>

          <Link href="#" className="row-span-1">
            <PiBellRinging className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
          </Link>

          <div className="row-span-1 relative">
            <div className="">
              <div>
                <button
                  onClick={() => setOpenSettingMenu(!openSettingMenu)}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                >
                  <Image
                    width={32}
                    height={32}
                    className="rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
              {openSettingMenu && (
                <div
                  className="absolute right-0 top-14 z-10 w-44 rounded-lg bg-white shadow-lg"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  {settingData.map((item, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="block text-center px-4 py-2 text-sm font-normal text-gray-600 hover:text-indigo-600 hover:bg-indigo-100"
                      role="menuitem"
                      tabIndex={-1}
                      id={`user-menu-item-${index}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </WhiteBox>
  );
};

export default Dashboard;
