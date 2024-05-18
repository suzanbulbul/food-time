import cn from "classnames";
import React, {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";

//Icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  hasOverlapping?: boolean;
  placeholder?: string;
  icon?: React.ReactElement | string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "email" | "password" | "number" | "file";
}

const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      hasError,
      errorMessage,
      hasOverlapping,
      placeholder,
      icon,
      onChange,
      type,
      ...rest
    } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className="w-full h-auto">
        {label && (
          <label
            htmlFor={rest.name}
            className={cn(
              "mb-1 inline-flex items-center bg-white px-1 text-sm font-medium text-gray-700"
            )}
          >
            {label.includes("*") ? label.split("*")[0] : label}
            {label.includes("*") && <span className="text-red-400">*</span>}
          </label>
        )}
        <div
          className={cn(
            "relative flex items-center rounded-md border px-3 shadow-sm hover:border-gray-400",
            {
              "border-gray-300 focus-within:border-gray-500": !hasError,
              "border-red-300 text-red-900 hover:border-red-500 focus:border-red-500 focus:outline-none":
                hasError,
            }
          )}
        >
          {icon && (
            <div className="pointer-events-none inset-y-0 inline-flex cursor-pointer items-center pr-2">
              <span
                className={cn("sm:text-sm", {
                  "text-gray-400": !hasError,
                  "text-red-400": hasError,
                })}
              >
                {icon}
              </span>
            </div>
          )}

          {type === "file" ? (
            <input
              type="file"
              accept="image/*"
              placeholder={placeholder}
              className={cn(
                "block w-full flex-1 appearance-none border-0 px-0 py-2 text-sm outline-none focus:border-none focus:ring-0",
                {
                  "placeholder-gray-500": !hasError,
                  "placeholder-red-300": hasError,
                }
              )}
              onChange={onChange}
              ref={ref}
              {...rest}
            />
          ) : (
            <input
              autoComplete="off"
              placeholder={placeholder}
              type={type === "password" && showPassword ? "text" : type}
              className={cn(
                "block w-full flex-1 appearance-none border-0 px-0 py-2 text-sm outline-none focus:border-none focus:ring-0",
                {
                  "placeholder-gray-500": !hasError,
                  "placeholder-red-300": hasError,
                }
              )}
              ref={ref}
              {...rest}
            />
          )}

          {type === "password" && (
            <div className="flex items-center">
              {!showPassword ? (
                <FaRegEye
                  onClick={() => setShowPassword(true)}
                  className={cn("h-5 w-5 cursor-pointer", {
                    "text-gray-400": !hasError,
                    "text-red-400": hasError,
                  })}
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowPassword(false)}
                  className={cn("h-5 w-5 cursor-pointer", {
                    "text-gray-400": !hasError,
                    "text-red-400": hasError,
                  })}
                />
              )}
            </div>
          )}
        </div>
        {hasError && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
