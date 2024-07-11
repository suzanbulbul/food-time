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
      <main className="flex h-screen items-center justify-center">
        {children}
      </main>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-100 ">
      <Sidebar />
      <main className="flex w-full flex-col gap-6 p-3">
        <Navbar />
        <div className="h-full overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
