import React, { useState } from "react";
import classNames from "classnames";

export type TooltipContent = {
  message: string;
  direction?: "top" | "bottom" | "left" | "right" | "topRight" | "bottomRight";
  variant?: "primary" | "secondary" | "danger" | "warning";
};

type TooltipProps = {
  children: React.ReactNode;
  content: TooltipContent;
};

const VARIANTS = {
  primary: "z-50 rounded-lg bg-white text-gray-700",
  secondary: "bg-gray-700 text-white",
  danger: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-black",
};

const DIRECTIONS = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2",
  left: "right-full mr-2",
  right: "left-full ml-2",
  topRight: "bottom-full right-0 mb-2",
  bottomRight: "top-full right-0 mb-2",
};

const Tooltip = ({
  children,
  content: { message = "", direction = "bottom", variant = "primary" },
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  const colorPrimary = VARIANTS[variant];
  const directionPrimary = DIRECTIONS[direction];

  const tooltipClasses = classNames(
    "absolute p-2 text-sm rounded shadow-lg",
    colorPrimary,
    directionPrimary
  );

  return (
    <div className="relative inline-block w-full">
      <div
        className="cursor-pointer"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      {visible && message && <div className={tooltipClasses}>{message}</div>}
    </div>
  );
};

export default Tooltip;
