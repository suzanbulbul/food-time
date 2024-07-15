import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import cn from "classnames";

//Redux
import { userInfo } from "../redux/Slice/authSlice";
import {
  addFavorite,
  removeFavorite,
  favoriteList,
} from "../redux/Slice/recipeSlice";

// Library
import toast from "react-hot-toast";

//Components
import { Button, WhiteBox } from ".";

//Helper
import { truncateDescription, getCategoryByValue } from "../util/helper";

//Type
import { User } from "../util/type/user.type";

import { RecipeType } from "../util/type/recipe.type";

// Icons
import { FaHeart as Like } from "react-icons/fa6";

interface CardType {
  data: RecipeType;
  url?: string | undefined;
  favActive?: boolean;
}

const Card = ({ data, url, favActive = false }: CardType) => {
  const dispatch = useDispatch();
  const [clickFav, setClickFav] = useState<boolean>(false);
  const [selectInfo, setSelectInfo] = useState<User>(undefined);

  const favorites = useSelector(favoriteList);
  const user = useSelector(userInfo);

  const handleClick = () => {
    if (url) {
      router.push(url);
    }
  };

  const handleToggleFavorite = () => {
    if (!clickFav) {
      dispatch(addFavorite(data));
      toast.success("Favorilere eklendi");
    } else {
      dispatch(removeFavorite(data?.id));
      toast.success("Favorilerden çıkarıldı");
    }
  };

  useEffect(() => {
    setSelectInfo(user);
  }, [user]);

  useEffect(() => {
    favActive &&
      setClickFav(favorites.some((item: any) => item.id === data?.id));
  }, []);

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
          src={
            data.img ? data.img : "https://v1.tailwindcss.com/img/card-top.jpg"
          }
          alt={data.img ? data.name : "dummy-img"}
        />
      </div>
      <div className="flex h-20 flex-col gap-1 ">
        <h1 className="text-xl font-bold">{data.name}</h1>
        {data.summary ? truncateDescription(data.summary, 60) : "-"}
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-block rounded-full bg-indigo-200 px-3 py-1 text-sm font-semibold text-indigo-700">
          {getCategoryByValue(data.category)}
        </span>
        {favActive && (
          <span>
            {selectInfo ? (
              <Button
                variant="transparent"
                padding="10px"
                onClick={(e: any) => {
                  e.preventDefault();
                  handleToggleFavorite;
                }}
                className="flex h-9  w-9 cursor-pointer items-center justify-center rounded-full border bg-white"
              >
                <Like
                  className={cn(
                    "h-5 w-5  hover:text-red-500 focus:text-red-500",
                    clickFav && "text-red-500"
                  )}
                />
              </Button>
            ) : (
              <Button
                variant="transparent"
                padding="10px"
                disabled={!selectInfo}
                tooltip={{
                  message: !selectInfo
                    ? "Bu özellik için giriş yapmanız gerekiyor."
                    : "test",
                }}
                onClick={handleToggleFavorite}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-white"
              >
                <Like
                  className={cn("h-5 w-5  text-gray-500 hover:text-gray-500")}
                />
              </Button>
            )}
          </span>
        )}
      </div>
    </WhiteBox>
  );
};

export default Card;
