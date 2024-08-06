import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logoutHandle } from "../redux/Slice/authSlice";
import { Button, WhiteBox } from ".";
import { User } from "../util/type/user.type";
import { getInitials } from "../util/helper/getInitials";

export type actionsType = {
  label: string;
  onClick: () => void;
};

const Navbar = ({ user }: { user: User }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [openSettingMenu, setOpenSettingMenu] = useState<boolean>(false);
  const [path, setPath] = useState<string>("");

  const settingActions: actionsType[] = [
    {
      label: "Profilem",
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      label: "Ayarlar",
      onClick: () => {
        router.push("/setting");
      },
    },
    {
      label: "Çıkış Yap",
      onClick: () => {
        dispatch(logoutHandle());
        router.push("/");
      },
    },
  ];
  useEffect(() => {
    setPath(router.pathname);
  }, [router.pathname]);
  return (
    <WhiteBox>
      <nav className="flex items-center justify-between">
        {path === "/home" && (
          <h1>Hoşgeldin {user ? user.displayName : "Dear Guest"}</h1>
        )}
        {user ? (
          <div className="ggrid-rows-4 ml-auto grid grid-flow-col items-center gap-5">
            <div className="relative row-span-1">
              <div className="">
                <div>
                  <button
                    onClick={() => setOpenSettingMenu(!openSettingMenu)}
                    className="flex  h-9 w-9 items-center justify-center rounded-full bg-indigo-200 text-sm text-indigo-600 shadow hover:ring-2"
                  >
                    {getInitials(user.displayName as any)}
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
          <Button className="ml-auto" onClick={() => router.push("/login")}>
            Kaydol veya Griş Yap
          </Button>
        )}
      </nav>
    </WhiteBox>
  );
};

export default Navbar;
