import React from "react";
import cn from "classnames";
import Button from "./Button";

export const ModalVariant = {
  SUCCESS: {
    bgLight: "bg-green-100",
    bgColor: "bg-green-500  hover:bg-green-800",
  },
  WARNING: {
    bgLight: "bg-yellow-100",
    bgColor: "bg-yellow-500  hover:bg-yellow-800",
  },
  ERROR: {
    bgLight: "bg-red-100",
    bgColor: "bg-red-500  hover:bg-red-800",
  },
  DISABLED: {
    bgLight: "bg-gray-100",
    bgColor: "bg-gray-500  hover:bg-gray-800",
  },
  DEFAULT: {
    bgLight: "bg-indigo-100",
    bgColor: "bg-indigo-500  hover:bg-indigo-800",
  },
};

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
  closeTitle?: string;
  saveTitle?: string;
  children: React.ReactNode;
  variant?: "SUCCESS" | "WARNING" | "ERROR" | "DEFAULT" | "DISABLED";
}

const Modal = ({
  show,
  onSave,
  onClose,
  icon,
  title,
  desc,
  closeTitle,
  saveTitle,
  children,
  variant = "DEFAULT",
}: ModalProps) => {
  if (!show) {
    return;
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden bg-white text-left  p-2 shadow rounded-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-fullsm:mx-0 sm:h-10 sm:w-10">
                  <div
                    className={cn(
                      "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10",
                      `${ModalVariant[variant].bgLight}`
                    )}
                  >
                    {icon}
                  </div>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-4">{children}</div>
            <div className="flex w-full gap-3 border-t px-5 py-4 ">
              <Button variant="base" className="w-full" onClick={onClose}>
                {closeTitle ? closeTitle : "Cancel"}
              </Button>

              <Button
                type="submit"
                className={cn(" w-full ", `${ModalVariant[variant].bgColor}`)}
                onClick={onSave}
              >
                {saveTitle ? saveTitle : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
