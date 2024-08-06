import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
      <Lottie animationData={require("../util/animation/loading.json")} />
    </div>
  );
};

export default Loading;
