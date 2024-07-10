import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";

//Redux
import { userInfo, logoutHandle } from "../redux/Slice/authSlice";

//Components
import { Button, WhiteBox } from ".";

//Icons
import { TbWorld } from "react-icons/tb";
import { AiOutlineAppstore } from "react-icons/ai";
import { PiBellRinging } from "react-icons/pi";

//Type
import { User } from "../util/type/user.type";
import { getInitials } from "../util/helper/getInitials";

export type actionsType = {
  label: string;
  onClick: () => void;
};

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);
  const [openSettingMenu, setOpenSettingMenu] = useState<boolean>(false);
  const [selectInfo, setSelectInfo] = useState<User>(undefined);

  const settingActions: actionsType[] = [
    {
      label: "Your Profile",
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      label: "Settings",
      onClick: () => {
        router.push("/setting");
      },
    },
    {
      label: "Logout",
      onClick: () => {
        dispatch(logoutHandle());
        router.push("/");
      },
    },
  ];

  useEffect(() => {
    setSelectInfo(user);
  }, [user]);

  return (
    <WhiteBox>
      <nav className="flex items-center justify-between">
        <h1>Welcome {selectInfo ? selectInfo?.displayName : "Dear Geuest"}</h1>
        {selectInfo ? (
          <div className="ggrid-rows-4 grid grid-flow-col items-center gap-5">
            {/* <Link href="#" passHref className="row-span-1">
              <TbWorld className="h-5 w-5 text-gray-600 hover:text-indigo-600" />
            </Link>
            <Link href="#" passHref className="row-span-1">
              <AiOutlineAppstore className="h-5 w-5 text-gray-600 hover:text-indigo-600" />
            </Link>

            <Link href="#" passHref className="row-span-1">
              <PiBellRinging className="h-5 w-5 text-gray-600 hover:text-indigo-600" />
            </Link> */}

            <div className="relative row-span-1">
              <div className="">
                <div>
                  <button
                    onClick={() => setOpenSettingMenu(!openSettingMenu)}
                    className="flex  h-9 w-9 items-center justify-center rounded-full bg-indigo-200 text-sm text-indigo-600 shadow hover:ring-2"
                  >
                    {getInitials(selectInfo?.displayName as any)}
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
                    {settingActions.map((item, index) => (
                      <a
                        key={index}
                        onClick={item.onClick}
                        className="block cursor-pointer px-4 py-2 text-center text-sm font-normal text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 "
                        role="menuitem"
                        tabIndex={-1}
                        id={`user-menu-item-${index}`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Button onClick={() => router.push("/login")}>Register Now</Button>
        )}
      </nav>
    </WhiteBox>
  );
};

export default Navbar;
