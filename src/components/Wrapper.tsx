import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//Compopnents
import { Sidebar, Navbar, Loading } from "./index";
import { useSelector } from "react-redux";
import { userInfo } from "../redux/Slice/authSlice";
import { User } from "../util/type/user.type";

const Wrapper = ({ children }: any) => {
  const router = useRouter();
  const [selectInfo, setSelectInfo] = useState<User | null>(null);
  const user = useSelector(userInfo);

  useEffect(() => {
    setSelectInfo(user);
  }, [user]);

  useEffect(() => {
    if (router.pathname === "/404") {
      router.push("/404");
    } else if (
      selectInfo === null &&
      !["/login", "/register", "/home", "/home/[id]"].includes(router.pathname)
    ) {
      router.push("/login");
    } else if (
      selectInfo !== null &&
      ["/login", "/register"].includes(router.pathname)
    ) {
      router.push("/home");
    }
  }, [selectInfo, router]);

  return <div>{children}</div>;
};

export default Wrapper;
