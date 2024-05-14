import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-neutral-100 h-screen flex ">
      <Sidebar />
      <main className="p-3 w-full ">{children}</main>
    </div>
  );
};

export default Layout;
