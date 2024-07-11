import React from "react";
import Image from "next/image";

interface CardType {
  title: string;
  desc?: string;
  img: string;
}

const Card = ({ title, desc, img }: CardType) => {
  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      {/* <Image width={32} height={32} className="w-full" src={img} alt={title} /> */}
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <p className="text-base text-gray-700">{desc}</p>
      </div>
      <div className="px-6 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #photography
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #travel
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          #winter
        </span>
      </div>
    </div>
  );
};

export default Card;
