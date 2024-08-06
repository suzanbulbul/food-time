import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//Compopnents
import { Sidebar, Navbar } from "./index";
import { useSelector } from "react-redux";
import { userInfo } from "../redux/Slice/authSlice";
import { User } from "../util/type/user.type";

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
    </div>
  );
};

export default Layout;
