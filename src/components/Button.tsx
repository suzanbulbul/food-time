import React, { ReactNode } from "react";
import cn from "classnames";
import Tooltip, { TooltipContent } from "./Tooltip";

interface ButtonProps {
  children?: ReactNode;
  variant?:
    | "success"
    | "warning"
    | "error"
    | "primary"
    | "base"
    | "transparent";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  justify?: "end" | "start" | "center";
  tooltip?: TooltipContent;
  padding?: string;
}

const VARIANTS = {
  success: "text-white bg-green-400 hover:bg-green-500",
  warning: "text-white bg-yellow-500 hover:bg-yellow-800",
  error: "text-white bg-red-500 hover:bg-red-800",
  primary: "text-white bg-indigo-500 hover:bg-indigo-800",
  base: "shadow border text-gray-900 bg-white hover:bg-gray-50",
  transparent: "bg-transparent shadow-none",
};

const JUSTIFY = {
  end: "justify-end",
  start: "justify-start",
  center: "justify-center",
};

const Button = ({
  children,
  variant = "primary",
  className,
  disabled,
  onClick,
  type = "button",
  justify = "center",
  tooltip,
  padding = "px-5 py-2",
  ...rest
}: ButtonProps) => {
  const colorPrimary = VARIANTS[variant];
  const justifyPrimary = JUSTIFY[justify];

  const buttonContent = (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl shadow",
        justifyPrimary,
        colorPrimary,
        padding,
        className,
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        disabled && colorPrimary !== "transparent"
          ? "disabled:bg-transparent disabled:text-gray-400 disabled:hover:text-gray-400"
          : "disabled:bg-gray-400 disabled:hover:text-gray-900"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );

  return tooltip ? (
    <Tooltip
      content={{
        message: tooltip.message,
        direction: tooltip.direction,
        variant: tooltip.variant,
      }}
    >
      {buttonContent}
    </Tooltip>
  ) : (
    buttonContent
  );
};

export default Button;
