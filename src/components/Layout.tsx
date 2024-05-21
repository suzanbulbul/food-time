import React from "react";
import { useRouter } from "next/router";

//Compopnents
import { Sidebar, Navbar } from "./index";

const Layout = ({ children }: any) => {
  const router = useRouter();

  if (
    router.pathname === "/404" ||
    router.pathname === "/login" ||
    router.pathname === "/register"
  ) {
    return (
      <main className="h-screen flex justify-center items-center">
        {children}
      </main>
    );
  }

  return (
    <div className="bg-neutral-100 h-screen flex ">
      <Sidebar />
      <main className="p-3 w-full flex flex-col gap-6">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
