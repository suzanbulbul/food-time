import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//API
import { recipeApi } from "../../api/recipeApi";

//Components
import { Card, Loading, DropDown } from "../../components";

//Type
import { RecipeType } from "../../util/type/recipe.type";
import { DropdownAction } from "../../components/DropDown";

//Constants
import { foodCategoryList } from "../../util/constants/recipe.constants";

const Home = () => {
  const [filterList, setFilterList] = useState<DropdownAction[]>([]);
  const [homeData, setHomeData] = useState<RecipeType[]>([]);

  // BE'nin tüm recipelerin olduğu bir endpoind vermesi gerekiyor. Bunu sağlayamayacağım için getRecipeList çektim.
  // Normalde getRecipeList'e BE'nin query eklemesi gerekiyror fakat firebasede bu işlemi göremediğim için elimle filtreledim
  const { data } = useQuery<RecipeType[]>({
    queryKey: ["recipe-list"],
    queryFn: async () => {
      return await recipeApi.getRecipeList();
    },
  });

  const handleFilterClick = async (category: string) => {
    const filteredRecipes = data?.filter(
      (recipe) => recipe.category === category
    );
    setHomeData(filteredRecipes ? filteredRecipes : []);
  };

  useEffect(() => {
    const dropdownAction = [
      {
        label: "HEPSİ",
        onClick: () => setHomeData(data as any),
      },
      ...foodCategoryList.map((f: any) => ({
        label: f.label,
        onClick: () => handleFilterClick(f.value),
      })),
    ];
    setFilterList(dropdownAction);
  }, []);

  useEffect(() => {
    data && setHomeData(data);
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <DropDown
        className="mr-auto"
        filter
        title="Yemek Kategorisi"
        actions={filterList}
      ></DropDown>
      <div className="grid grid-cols-1 gap-5 self-stretch md:grid-cols-2 xl:grid-cols-3">
        {homeData?.length > 0 ? (
          homeData?.map((res, i) => {
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
          })
        ) : (
          <h1>Recipe Listesi Boş</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
