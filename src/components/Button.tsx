import React, { ReactNode } from "react";
import cn from "classnames";

interface ButtonProps {
  children?: ReactNode;
  variant?: "success" | "warning" | "error" | "primary" | "base";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const VARIANTS = {
  success: "text-white bg-green-500 hover:bg-green-800",
  warning: "text-white bg-yellow-500 hover:bg-yellow-800",
  error: "text-white bg-red-500 hover:bg-red-800",
  primary: "text-white bg-indigo-500 hover:bg-indigo-800",
  base: "shadow border text-gray-900  bg-white  hover:bg-gray-50",
};

const Button = ({
  children,
  variant = "primary",
  className,
  disabled,
  onClick,
  type = "button",
  ...rest
}: ButtonProps) => {
  const colorPrimary = VARIANTS[variant];

  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      className={cn(
        "flex justify-center items-center gap-2 p-2 shadow rounded-xl",
        colorPrimary,
        className,
        disabled && "disabled:bg-gray-400 cursor-not-allowed "
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
