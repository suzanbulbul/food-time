import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

//Compopnents
import { Sidebar, Navbar } from "./index";

//Redux
import { userInfo } from "../redux/Slice/authSlice";

//Type
import { User } from "../util/type/user.type";

//Section
import SettingsModal from "../sections/SettingsModal";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const user = useSelector(userInfo);

  const [clientUser, setClientUser] = useState<User>(null);

  useEffect(() => {
    setClientUser(user);
  }, [user]);

  if (
    router.pathname === "/404" ||
    router.pathname === "/login" ||
    router.pathname === "/register"
  ) {
    return (
      <main className="flex h-screen items-center justify-center">
        {children}
      </main>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-100 ">
      <Sidebar user={clientUser} />
      <main className="flex w-full flex-col gap-6 p-3">
        <Navbar user={clientUser} />
        <div className="h-full overflow-auto">{children}</div>
      </main>
      <SettingsModal user={clientUser} />
    </div>
  );
};

export default Layout;
