import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

//API
import { recipeApi } from "../../api/recipeApi";

//Redux
import { selectRecipe } from "../../redux/Slice/recipeSlice";

//Library
import toast from "react-hot-toast";

//Components
import { Button, ComboBox, Input, TextArea, WhiteBox } from "../../components";
import Accordion from "../../components/Accordion";

//Icons
import { CiCirclePlus as Plus } from "react-icons/ci";
import { BsTrash3 as Delete } from "react-icons/bs";

//Type
import { RecipeType, RecipInformationType } from "../../util/type/recipe.type";
import { Option } from "../../util/type/global.type";

//Constants
import { foodCategoryList } from "../../util/constants/recipe.constants";

const AddRecipe = () => {
  const router = useRouter();
  const recipeInfo = useSelector(selectRecipe);

  const defaultValues = {
    name: recipeInfo?.name || "",
    summary: recipeInfo?.summary || "",
    category: recipeInfo?.category || "",
    img: recipeInfo?.img || undefined,
    step: recipeInfo?.step?.length
      ? recipeInfo.step.map((step: RecipInformationType) => ({
          name: step.name || "",
          materials: step.materials || "",
          stepRecipe: step.stepRecipe || "",
          time: step.time || "",
          imageUrl: step.imageUrl || undefined,
        }))
      : [
          {
            name: "",
            materials: "",
            stepRecipe: "",
            time: "",
            imageUrl: undefined,
          },
        ],
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RecipeType>({
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "step",
  });

  const onSubmit = async (formData: RecipeType) => {
    toast.loading("Loading...");
    recipeInfo
      ? await recipeApi.editRecipeById(recipeInfo.id, formData)
      : await recipeApi.addRecipe(formData);

    toast.dismiss();
    toast.success(`${recipeInfo ? "Edit" : "Add New"} Recipe Successfully`);
    router.push("/recipe");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-9 md:p-16"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-3xl font-semibold text-indigo-500">
          {recipeInfo ? "Edit" : "Add"} Recipe
        </h1>

        <WhiteBox className="flex flex-col gap-2">
          <h1 className="text-lg font-medium text-indigo-900">
            Recipe Information
          </h1>
          <div className="flex items-start gap-2">
            <div className="w-full">
              <Input
                type="text"
                label="Food Name*"
                placeholder="Food Name"
                {...register("name", {
                  required: "Please enter a name",
                })}
                hasError={!!errors?.name}
                errorMessage={errors?.name?.message}
              />
            </div>

            <div className="w-full">
              <ComboBox
                {...register("category", {
                  required: "Please enter a category",
                })}
                label="Food Category*"
                placeholder="Food Category"
                setValue={(option: Option) => {
                  setValue("category", option?.value), clearErrors("category");
                }}
                getValue={foodCategoryList.find(
                  (option: Option) => option?.value === getValues("category")
                )}
                options={foodCategoryList}
                hasError={!!errors?.category}
                errorMessage={errors?.category?.message}
              />
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-full">
              <TextArea
                label="Food Summary"
                placeholder="Food Summary"
                {...register(`summary`)}
              />
            </div>

            <div className="w-full">
              <Input label="Food Img" type="file" {...register(`img`)} />
            </div>
          </div>
        </WhiteBox>
        <div className="flex flex-col gap-2.5">
          {fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-4">
              <Accordion title={`Step ${i + 1}`}>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <div className="w-full">
                      <Input
                        label="Step Name*"
                        type="text"
                        placeholder="Name"
                        {...register(`step.${i}.name`, {
                          required: "Please enter a name",
                        })}
                        hasError={!!errors?.step?.[i]?.name}
                        errorMessage={errors?.step?.[i]?.name?.message}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="Step Materials*"
                        type="text"
                        placeholder="Materials"
                        {...register(`step.${i}.materials`, {
                          required: "Please enter materials",
                        })}
                        hasError={!!errors?.step?.[i]?.materials}
                        errorMessage={errors?.step?.[i]?.materials?.message}
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-full">
                      <Input
                        label="Step Img"
                        type="file"
                        {...register(`step.${i}.imageUrl`)}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="Step Minute*"
                        type="number"
                        placeholder="Minute Recipe"
                        {...register(`step.${i}.time`, {
                          required: "Please enter a minute",
                          min: {
                            value: 1,
                            message: "Please enter a valid minute",
                          },
                          pattern: {
                            value: /^[1-9]\d*$/,
                            message: "Please enter a valid minute",
                          },
                        })}
                        hasError={!!errors?.step?.[i]?.time}
                        errorMessage={errors?.step?.[i]?.time?.message}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <TextArea
                      label="Step Recipe"
                      placeholder="Step Recipe"
                      {...register(`step.${i}.stepRecipe`)}
                    />
                  </div>
                </div>
              </Accordion>
              {i > 0 && (
                <Delete
                  onClick={() => remove(i)}
                  className="h-5 w-5 text-red-500"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mx-auto">
          <Button
            onClick={() =>
              append({
                name: "",
                materials: "",
                stepRecipe: "",
                time: "",
                imageUrl: undefined,
              })
            }
            type="button"
            variant="success"
            className="max-w-max text-center"
          >
            <Plus className="h-6 w-6" />
            Add New Step
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-end gap-2.5 sm:flex-row md:px-16">
        <Button
          className="w-full px-8 sm:w-auto"
          onClick={() => router.push("/recipe")}
          variant="base"
          type="button"
        >
          Cancel
        </Button>
        <Button
          disabled={isSubmitting}
          className="w-full px-8 sm:w-auto"
          variant="primary"
          type="submit"
        >
          {recipeInfo ? "Edit" : "Add"} Recipe
        </Button>
      </div>
    </form>
  );
};

export default AddRecipe;
