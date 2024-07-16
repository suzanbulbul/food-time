import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

// Redux
import {
  setRecipeDetail,
  addFavorite,
  removeFavorite,
  favoriteList,
} from "../../redux/Slice/recipeSlice";

//Redux
import { userInfo } from "../../redux/Slice/authSlice";

// API
import { recipeApi } from "../../api/recipeApi";

// Library
import toast from "react-hot-toast";

// Components
import { Loading, Button, ProgressBar } from "../../components";

// Type
import { RecipeType, TabType } from "../../util/type/recipe.type";

// Icons
import { FaHeart as Like } from "react-icons/fa6";

//Helper
import { aggregateIngredients, getCategoryByValue } from "../../util/helper";
import { User } from "../../util/type/user.type";

const RecipeDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [tab, setTab] = useState<TabType[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [clickFav, setClickFav] = useState<boolean>(false);
  const [selectInfo, setSelectInfo] = useState<User | null>(null);

  const favorites = useSelector(favoriteList);
  const user = useSelector(userInfo);

  useEffect(() => {
    setSelectInfo(user);
  }, [user]);

  const { isFetching, data } = useQuery<RecipeType>({
    queryKey: ["recipe-detail", id],
    queryFn: async () => {
      return await recipeApi.getRecipeById(id);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setClickFav(favorites.some((item: any) => item.id === data?.id));

      // BE'nin endpoind vermesi gerekiyor.
      dispatch(setRecipeDetail(JSON.stringify(data)));

      const totalMinutes = data.step
        .map((step) => parseInt(step.time, 10))
        .reduce((total, time) => total + time, 0);

      const tabs = [
        {
          id: 0,
          minute: totalMinutes.toString(),
          name: data.name,
          summary: data.summary,
          materials: aggregateIngredients(data.step),
          img: data.img,
        },
        ...data.step.map((step, index) => ({
          id: index + 1,
          minute: step.time,
          name: step.name,
          summary: step.stepRecipe,
          materials: step.materials
            .split(",")
            .map((material) => material.trim()),
          time: step.materials,
          img: step.imageUrl,
        })),
      ];
      setTab(tabs);
    }
  }, [data, favorites, dispatch]);

  const handleToggleFavorite = () => {
    if (!clickFav) {
      dispatch(addFavorite(data));
      toast.success("Favorilere eklendi");
    } else {
      dispatch(removeFavorite(data?.id));
      toast.success("Favorilerden çıkarıldı");
    }
  };

  const handleStepChange = (increment: number) => {
    const newTab = currentTab + increment;
    if (newTab >= 0 && newTab < tab.length) {
      setCurrentTab(newTab);
    }
  };

  if (isFetching || !data || tab.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-120px)] flex-col justify-between gap-4 overflow-hidden">
        <div className="flex flex-col gap-3">
          <ProgressBar currentStep={currentTab} totalSteps={tab.length - 1} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-200 px-3 py-1 text-sm font-semibold text-indigo-700">
                {getCategoryByValue(data.category)}
              </span>
              <span className="text-base text-indigo-700">
                {tab[currentTab].minute} dakika
              </span>
            </div>
            <span>
              <Button
                variant="transparent"
                padding="10px"
                onClick={(e: any) => {
                  e.preventDefault();
                  handleToggleFavorite();
                }}
                disabled={!selectInfo}
                tooltip={{
                  message: !selectInfo
                    ? "Bu özellik için giriş yapmanız gerekiyor."
                    : (undefined as any),
                  direction: "bottomRight",
                }}
                className="flex h-9  w-9 cursor-pointer items-center justify-center rounded-full border bg-white"
              >
                <Like
                  className={cn(
                    "h-5 w-5 ",
                    selectInfo
                      ? "hover:text-red-500 focus:text-red-500"
                      : "text-gray-500 hover:text-gray-500",
                    clickFav && "text-red-500"
                  )}
                />{" "}
              </Button>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-indigo-700">
              {tab[0].name}
              {currentTab !== 0 && ` -  ${tab[currentTab].name}`}
            </h1>
            <div className="flex flex-col items-start justify-start gap-4 sm:flex-row">
              {tab[currentTab].img && (
                <img
                  className="h-32 w-[250px] rounded-lg object-cover"
                  src={
                    tab[currentTab].img ||
                    "https://v1.tailwindcss.com/img/card-top.jpg"
                  }
                  alt="detail-img"
                />
              )}
              <p className="text-base font-medium text-gray-700">
                {tab[currentTab].summary}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-base font-medium text-indigo-800">
              {tab[currentTab].id === 0
                ? "Tüm Malzemeleri"
                : `${tab[currentTab].name} İçin Gerekli Malzemeler`}
            </h1>
            <ul className="grid w-full grid-cols-2 gap-4 p-5">
              {tab[currentTab].materials.map((s, i) => (
                <li key={i}>
                  <p className="text-base font-medium capitalize text-gray-700">
                    {s}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {currentTab > 0 && (
            <Button
              variant="base"
              onClick={() => {
                handleStepChange(-1);
              }}
            >
              Önceki Adım
            </Button>
          )}

          <Button
            disabled={!selectInfo}
            tooltip={{
              message: !selectInfo
                ? "Bu özellik için giriş yapmanız gerekiyor."
                : (undefined as any),
              direction: "topRight",
            }}
            onClick={() => {
              if (tab[currentTab]?.id === 0) {
                setCurrentTab(1);
              } else if (currentTab < tab.length - 1) {
                if (currentTab < tab.length - 1) {
                  setCurrentTab((prevTab) => prevTab + 1);
                }
              } else {
                router.push("/home");
              }
            }}
            variant="success"
            className="ml-auto"
          >
            {tab[currentTab].id === 0
              ? "Hemen Başla"
              : currentTab < tab.length - 1
              ? " Sonra Adım"
              : "Diğer Tarihlere Göz At"}{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
