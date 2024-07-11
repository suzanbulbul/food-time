import React, { useState } from "react";
import router from "next/router";
import { useQuery } from "@tanstack/react-query";

//API
import { recipeApi } from "../../api/recipeApi";

//Components
import { Button, Card, Loading } from "../../components";

//Type
import { RecipeType } from "./recipe.type";

const Recipe = () => {
  const { isFetching, data, refetch } = useQuery<RecipeType[]>({
    queryKey: ["recipe-list"],
    queryFn: async () => {
      return await recipeApi.getRecipeList();
    },
  });

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => router.push("recipe/add-recipe")}
        className="ml-auto"
      >
        Add New Recipe
      </Button>
      <div className="grid grid-cols-1 gap-5 self-stretch md:grid-cols-2 xl:grid-cols-3">
        {data?.map((res, i) => {
          console.log(res);
          return (
            <Card
              key={i}
              title={res.name}
              desc={res.summary}
              category={res.category}
              img={res?.img || null}
              url={`/recipe/${res.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Recipe;
