import React from "react";
import { useRouter } from "next/router";

//Compopnents
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  const router = useRouter();

  if (router.pathname === "/404") {
    return <main>{children}</main>;
  }

  return (
    <div className="bg-neutral-100 h-screen flex ">
      <Sidebar />
      <main className="p-3 w-full ">{children}</main>
    </div>
  );
};

export default Layout;
