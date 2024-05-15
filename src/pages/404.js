import React from 'react';
import Head from "next/head";

//Library
import Lottie from 'lottie-react';
import ComingSonn from '../util/animation/coming-coon.json'
// import NotFound from '../util/animation/not-found.json';

const Custom404 = () => {
  return (
    <div className='not-found'>
      <Head >
          <title>Coming Soon</title>
      </Head>
      <div className="h-screen flex justify-center items-center">
      <Lottie className="h-2/6" animationData={ComingSonn} />
    </div>
    </div>
  );
};

export default Custom404;

  