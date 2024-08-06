import React from "react";
import { GetServerSideProps } from "next";

//API
import { recipeApi } from "../../../api/recipeApi";

//Common
import CommonAddEdit from "../common/add-edit";

//Type
import { RecipeType } from "../../../util/type/recipe.type";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const data = await recipeApi.getRecipeById(id);
    return { props: { data } };
  } catch (error) {
    return { props: { data: [] } };
  }
};

const EditRecipe = ({ data }: { data: RecipeType }) => {
  return <CommonAddEdit recipeInfo={data} />;
};

export default EditRecipe;
