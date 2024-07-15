import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import router from "next/router";

//Redux
import { userInfo } from "../../redux/Slice/authSlice";

//API
import { recipeApi } from "../../api/recipeApi";

//Components
import { Card, Loading, DropDown, EmptyArea } from "../../components";

//Type
import { RecipeType } from "../../util/type/recipe.type";
import { DropdownAction } from "../../components/DropDown";
import { User } from "../../util/type/user.type";

//Constants
import { foodCategoryList } from "../../util/constants/recipe.constants";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector(userInfo);

  const [selectInfo, setSelectInfo] = useState<User>(undefined);
  const [filterList, setFilterList] = useState<DropdownAction[]>([]);
  const [homeData, setHomeData] = useState<RecipeType[]>([]);

  useEffect(() => {
    setSelectInfo(user);
  }, [user]);

  const { data } = useQuery<RecipeType[]>({
    queryKey: ["home-list"],
    queryFn: async () => {
      return await recipeApi.getRecipeList();
    },
  });
  
  // Normalde getRecipeList'e BE'nin query eklemesi gerekiyror fakat firebasede bu işlemi göremediğim için js ile filtreledim
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
              <Card key={i} data={res} url={`/home/${res.id}`} favActive />
            );
          })
        ) : (
          <EmptyArea buttonTitle="Tarif Ekle" />
        )}
      </div>
    </div>
  );
};

export default Home;
