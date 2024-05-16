import React from "react";
import cn from "classnames";

const WhiteBox = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      {...rest}
      className={cn("w-full bg-white p-4 shadow rounded-xl", className)}
    >
      {children}
    </div>
  );
};
export default WhiteBox;
