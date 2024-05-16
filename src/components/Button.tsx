import React, { ReactNode } from "react";
import cn from "classnames";

interface ButtonProps {
  children?: ReactNode;
  variant?: "success" | "warning" | "error" | "primary";
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

const VARIANTS = {
  success: "bg-green-500 hover:bg-green-800",
  warning: "bg-yellow-500 hover:bg-yellow-800",
  error: "bg-red-500 hover:bg-red-800",
  primary: "bg-indigo-500 hover:bg-indigo-800",
};

const Button = ({
  children,
  variant = "primary",
  className,
  disabled,
  onClick,
  ...rest
}: ButtonProps) => {
  const colorPrimary = VARIANTS[variant];

  return (
    <button
      {...rest}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-white p-2 shadow rounded-xl",
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
