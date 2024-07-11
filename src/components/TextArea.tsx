import React, { forwardRef } from "react";
import cn from "classnames";

interface TextAreaProps {
  label: string;
  hasError?: boolean;
  errorMessage?: string;
  placeholder: string;
  icon?: React.ReactElement;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { label, hasError, errorMessage, placeholder, className, icon, ...rest },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label.includes("*") ? label.split("*")[0] : label}
            {label.includes("*") && <span className="text-red-400">*</span>}
          </label>
        )}
        <div
          className={cn(
            "relative rounded-md border pl-3 pt-2 shadow-sm",
            {
              "border-gray-300 focus-within:border-gray-500": !hasError,
              "border-red-300 text-red-900 focus-within:border-red-500":
                hasError,
            },
            className
          )}
        >
          <textarea
            ref={ref}
            className={cn(
              "w-full text-sm placeholder-gray-500 outline-none focus:ring-0",
              {
                "border-gray-400": !hasError,
                "border-red-500 focus:border-red-500": hasError,
              }
            )}
            placeholder={placeholder}
            {...rest}
          />
        </div>
        {hasError && (
          <span className="mt-1 block text-sm text-red-600">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
