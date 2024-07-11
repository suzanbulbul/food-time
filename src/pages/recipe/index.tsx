import React, { useState } from "react";
import router from "next/router";
import { useQuery } from "@tanstack/react-query";

//API
import { recipeApi } from "../../api/recipeApi";

//Components
import { Button, Card } from "../../components";

//Type
import { RecipeType } from "./recipe.type";

const Recipe = () => {
  const { isFetching, data, refetch } = useQuery<RecipeType[]>({
    queryKey: ["recipe-list"],
    queryFn: async () => {
      return await recipeApi.getRecipeList();
    },
  });

  console.log(data);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <Button
          onClick={() => router.push("recipe/add-recipe")}
          className="ml-auto"
        >
          Add New Recipe
        </Button>
      </div>
      {data?.map((res, i) => {
        console.log(res);
        return <Card key={i} title={res.name} desc={"s"} img={"s"} />;
      })}
    </div>
  );
};

export default Recipe;
