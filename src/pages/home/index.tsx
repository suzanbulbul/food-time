import React from "react";
import { useQuery } from "@tanstack/react-query";

//API
import { recipeApi } from "../../api/recipeApi";

//Components
import { Card, Loading } from "../../components";

//Type
import { RecipeType } from "../../util/type/recipe.type";

const Home = () => {
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
      <div className="grid grid-cols-1 gap-5 self-stretch md:grid-cols-2 xl:grid-cols-3">
        {data?.map((res, i) => {
          return (
            <Card
              key={i}
              title={res.name}
              desc={res.summary}
              category={res.category}
              img={res?.img || null}
              url={`/home/${res.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
