import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import ComingSoon from "../util/animation/coming-coon.json";

const Custom404 = () => {
  return (
    <div className="not-found">
      <Head>
        <title>Coming Soon</title>
      </Head>
      <div className="flex h-screen items-center justify-center">
        <Lottie animationData={ComingSoon} />
      </div>
    </div>
  );
};

export default Custom404;
