import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import cn from "classnames";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipeDetail,
  addFavorite,
  removeFavorite,
  favoriteList,
} from "../../redux/Slice/recipeSlice";

// API
import { recipeApi } from "../../api/recipeApi";

// Library
import toast from "react-hot-toast";

// Components
import { Loading, Button } from "../../components";

// Type
import { RecipeType, TabType } from "../../util/type/recipe.type";

// Icons
import { FaHeart as Like } from "react-icons/fa6";

//Helper
import { aggregateIngredients, getCategoryByValue } from "../../util/helper";

const RecipeDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [tab, setTab] = useState<TabType[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [clickFav, setClickFav] = useState<boolean>(false);

  const favorites = useSelector(favoriteList);

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

      const tabs = [
        {
          id: 0,
          summary: data.summary,
          materials: aggregateIngredients(data.step),
          img: data.img,
        },
        ...data.step.map((step, index) => ({
          id: index + 1,
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

  if (isFetching || !data || tab.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-116px)] flex-col justify-between gap-4 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-indigo-200 px-3 py-1 text-sm font-semibold text-indigo-700">
              {getCategoryByValue(data.category)}
            </span>
            <div
              onClick={handleToggleFavorite}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-white"
            >
              <Like
                className={cn(
                  "h-5 w-5  hover:text-red-500 focus:text-red-500",
                  clickFav && "text-red-500"
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <h1 className="text-xl font-semibold text-indigo-700">
              {tab[currentTab].name && ` -  ${tab[currentTab].name}`}
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
                ? "All Recipe Materials"
                : "Recipe Materials"}
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
                if (currentTab > 0) {
                  setCurrentTab((prevTab) => prevTab - 1);
                }
              }}
            >
              Back
            </Button>
          )}

          <Button
            onClick={() => {
              if (tab[currentTab]?.id === 0) {
                setCurrentTab(1);
              } else if (currentTab < tab.length - 1) {
                if (currentTab < tab.length - 1) {
                  setCurrentTab((prevTab) => prevTab + 1);
                }
              } else {
                toast.success("All steps completed");
              }
            }}
            variant="success"
            className="ml-auto"
          >
            {tab[currentTab].id === 0
              ? "Hemen Başla"
              : currentTab < tab.length - 1
              ? "Next"
              : "Tamamlandı"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;