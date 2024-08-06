import React, { InputHTMLAttributes, useEffect, useState } from "react";
import cn from "classnames";
import Image from "next/image";

//Icons
import { FaPlus as PlusIcon } from "react-icons/fa";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  icon?: React.ReactElement | string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FileInputProps extends InputProps {
  fileName: string;
}
const FileInput = ({
  fileName,
  label,
  hasError,
  errorMessage,
  placeholder,
  icon,
  onChange,
  ...rest
}: FileInputProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
      if (onChange) onChange(e);
    }
  };

  useEffect(() => {
    fileName && setFileURL(fileName);
  }, [fileName]);

  return (
    <div className=" h-auto w-full">
      {label && (
        <label
          htmlFor={rest.name}
          className="mb-1 inline-flex items-center bg-white px-1 text-sm font-medium text-gray-700"
        >
          {label.includes("*") ? label.split("*")[0] : label}
          {label.includes("*") && <span className="text-red-400">*</span>}
        </label>
      )}{" "}
      <div className="flex gap-3">
        {fileURL && (
          <Image
            className="h-12 w-12 rounded-full"
            src={fileURL}
            alt="logo"
            width={56}
            height={56}
          />
        )}
        <div className="custom-file-upload	flex w-full items-center justify-center rounded-xl bg-indigo-50 ">
          <div className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4 text-indigo-500" />
            <div className="file-upload-container cursor-pointer">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                placeholder={placeholder}
                className={cn(
                  "block w-full flex-1 appearance-none border-0 px-0 py-2 text-sm outline-none focus:border-none focus:ring-0",
                  {
                    "placeholder-gray-500": !hasError,
                    "placeholder-red-300": hasError,
                  }
                )}
                onChange={handleFileChange}
                {...rest}
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="file-upload-label cursor-pointer"
              >
                <span id="file-name">{file ? file.name : "Dosya seçin"}</span>
              </label>
            </div>
          </div>
        </div>
        <span></span>
      </div>
    </div>
  );
};

export default FileInput;
