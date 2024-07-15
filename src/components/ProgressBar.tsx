import React from "react";

interface PropsType {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: PropsType) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="h-5 w-full rounded-lg bg-gray-200">
      <div
        className="rounded-lg bg-indigo-500 py-1 text-center text-xs leading-none text-white"
        style={{
          width: `${progress}%`,
          transition: "width 0.5s ease-in-out",
        }}
      >
        {progress !== 100 && progress > 0 && `${Math.round(progress)}%`}
        {progress === 100 && `Tebrikler`}
      </div>
    </div>
  );
};

export default ProgressBar;
