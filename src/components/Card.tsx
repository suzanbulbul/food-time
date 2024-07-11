import React from "react";
import Image from "next/image";
import WhiteBox from "./WhiteBox";
import router from "next/router";
import cn from "classnames";
import { truncateDescription } from "../util/helper/truncateDescription";

interface CardType {
  title: string;
  desc?: string;
  img?: string | null;
  category?: string;
  url?: string | undefined;
}

const Card = ({ title, desc, img, category, url }: CardType) => {
  const handleClick = () => {
    if (url) {
      router.push(url);
    }
  };
  return (
    <WhiteBox
      onClick={handleClick}
      cursor-auto
      className={cn(
        "flex flex-col justify-between gap-2.5",
        url && "hover:cursor-pointer"
      )}
    >
      <div className="h-32 self-stretch overflow-hidden rounded-lg">
        <Image
          className="w-full object-cover"
          width={600}
          height={400}
          src={img ? img : "https://v1.tailwindcss.com/img/card-top.jpg"}
          alt={img ? title : "dummy-img"}
        />
      </div>
      <div className="flex h-20 flex-col gap-1 ">
        <h1 className="text-xl font-bold">{title}</h1>
        {desc ? truncateDescription(desc, 60) : "-"}
      </div>
      <div className="flex h-7 gap-2">
        <span className="inline-block rounded-full bg-indigo-200 px-3 py-1 text-sm font-semibold text-indigo-700">
          {category}
        </span>
      </div>
    </WhiteBox>
  );
};

export default Card;
