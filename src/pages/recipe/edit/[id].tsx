import React from "react";
import { GetServerSideProps } from "next";

//API
import { recipeApi } from "../../../api/recipeApi";

//Common
import CommonAddEdit from "../common/add-edit";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const data = await recipeApi.getRecipeById(id);
    return { props: { data } };
  } catch (error) {
    return { props: { data: [] } };
  }
};

const EditRecipe = ({ data }: { data: any }) => {
  return <CommonAddEdit recipeInfo={data} />;
};

export default EditRecipe;
