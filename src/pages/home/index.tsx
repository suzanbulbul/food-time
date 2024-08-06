import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

//API
import { recipeApi } from "../../api/recipeApi";

//Components
import { Card, Loading, DropDown, EmptyArea } from "../../components";

//Type
import { RecipeType } from "../../util/type/recipe.type";
import { DropdownAction } from "../../components/DropDown";

//Constants
import { foodCategoryList } from "../../util/constants/recipe.constants";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await recipeApi.getRecipeList();
    return { props: { data } };
  } catch (error) {
    return { props: { data: [] } };
  }
};

const Home = ({ data }: { data: RecipeType[] }) => {
  const [filterList, setFilterList] = useState<DropdownAction[]>([]);
  const [homeData, setHomeData] = useState<RecipeType[]>([]);

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
