import React from "react";

//Library
import Lottie from "lottie-react";
import animationData from "../util/animation/loading.json";

const Loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
      <Lottie className="h-2/6" animationData={animationData} />
    </div>
  );
};

export default Loading;
