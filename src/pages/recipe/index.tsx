import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import { useQuery } from "@tanstack/react-query";

//Redux
import { clearRecipeDetail } from "../../redux/Slice/recipeSlice";

//API
import { recipeApi } from "../../api/recipeApi";

//Components
import { Button, Card, Loading, DropDown, EmptyArea } from "../../components";

//Type
import { RecipeType } from "../../util/type/recipe.type";
import { DropdownAction } from "../../components/DropDown";

//Constant
import { foodCategoryList } from "../../util/constants/recipe.constants";
import { userInfo } from "../../redux/Slice/authSlice";

const Recipe = () => {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);

  const [filterList, setFilterList] = useState<DropdownAction[]>([]);
  const [recipeData, setRecipeData] = useState<RecipeType[]>([]);

  const { data } = useQuery<RecipeType[]>({
    queryKey: ["recipe-list", user],
    queryFn: async () => {
      return await recipeApi.getRecipeList(user?.uid || "");
    },
    enabled: !!user,
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
        {recipeData.length > 0 && (
          <DropDown
            filter
            title="Yemek Kategorisi"
            actions={filterList}
          ></DropDown>
        )}

        <Button
          className="ml-auto"
          onClick={() => {
            dispatch(clearRecipeDetail()), router.push("recipe/add-edit");
          }}
        >
          Yeni Tarif Ekle
        </Button>
      </div>

      {recipeData.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 self-stretch md:grid-cols-2 xl:grid-cols-3">
          {recipeData?.map((res: any, i: any) => {
            return <Card key={i} data={res} url={`/recipe/${res.id}`} />;
          })}
        </div>
      ) : (
        <EmptyArea />
      )}
    </div>
  );
};

export default Recipe;
