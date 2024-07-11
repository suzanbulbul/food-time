import React from "react";
import cn from "classnames";

const WhiteBox = ({
  children,
  className,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      {...rest}
      onClick={onClick}
      className={cn("w-full rounded-xl bg-white p-4 shadow", className)}
    >
      {children}
    </div>
  );
};
export default WhiteBox;
