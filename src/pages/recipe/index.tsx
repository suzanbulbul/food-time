import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import router from "next/router";
import { useQuery } from "@tanstack/react-query";

//Redux
import { clearRecipeDetail } from "../../redux/Slice/recipeSlice";

//API
import { recipeApi } from "../../api/recipeApi";

//Components
import { Button, Card, Loading, DropDown } from "../../components";

//Type
import { RecipeType } from "../../util/type/recipe.type";
import { DropdownAction } from "../../components/DropDown";

//Constant
import { foodCategoryList } from "../../util/constants/recipe.constants";

const Recipe = () => {
  const dispatch = useDispatch();
  const [filterList, setFilterList] = useState<DropdownAction[]>([]);
  const [recipeData, setRecipeData] = useState<RecipeType[]>([]);

  //Normalde getRecipeList'e BE'nin query eklemesi gerekiyror fakat firebasede bu işlemi göremediğim için elimle filtreledim
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
    setRecipeData(filteredRecipes ? filteredRecipes : []);
  };

  useEffect(() => {
    const dropdownAction = [
      {
        label: "HEPSİ",
        onClick: () => setRecipeData(data as any),
      },
      ...foodCategoryList.map((f: any) => ({
        label: f.label,
        onClick: () => handleFilterClick(f.value),
      })),
    ];
    setFilterList(dropdownAction);
  }, []);

  useEffect(() => {
    data && setRecipeData(data);
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <DropDown
          filter
          title="Yemek Kategorisi"
          actions={filterList}
        ></DropDown>
        <Button
          onClick={() => {
            dispatch(clearRecipeDetail()), router.push("recipe/add-edit");
          }}
        >
          Yeni Tarif Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 self-stretch md:grid-cols-2 xl:grid-cols-3">
        {recipeData?.length > 0 ? (
          recipeData?.map((res, i) => {
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
          })
        ) : (
          <h1>Recipe Listesi Boş</h1>
        )}
      </div>
    </div>
  );
};

export default Recipe;
