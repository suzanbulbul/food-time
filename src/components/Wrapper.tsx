import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { userInfo } from "../redux/Slice/authSlice";
import { User } from "../util/type/user.type";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useSelector(userInfo);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = router.pathname;

      if (
        user === null &&
        !["/login", "/register", "/home", "/home/[id]"].includes(pathname)
      ) {
        router.push("/login");
      } else if (user !== null && ["/login", "/register"].includes(pathname)) {
        router.push("/home");
      }
    }
  }, [user, router]);

  return <div>{children}</div>;
};

export default Wrapper;
