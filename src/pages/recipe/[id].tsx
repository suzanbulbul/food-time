import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

//API
import { recipeApi } from "../../api/recipeApi";

//Components
import { Loading, Button } from "../../components";

//Type
import { RecipeType, TabType } from "../../util/type/recipe.type";

//Helper
import { aggregateIngredients } from "../../util/helper";
import toast from "react-hot-toast";

const RecipeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tab, setTab] = useState<TabType[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [letsStart, setLetsStart] = useState<boolean>(false);

  const { isFetching, data, refetch } = useQuery<RecipeType>({
    queryKey: ["recipe-detail", id],
    queryFn: async () => {
      return await recipeApi.getRecipeById(id);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
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
  }, [data]);

  if (isFetching || !data || tab.length === 0) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-[calc(100vh-116px)] flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        <span className="mr-auto rounded-full bg-indigo-200 px-3 py-1 text-sm font-semibold text-indigo-700">
          {data.category}
        </span>
        <div className="flex flex-col gap-2.5">
          <h1 className="text-xl font-semibold text-indigo-700">
            {data.name}
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
              setLetsStart(true);
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
  );
};

export default RecipeDetail;
