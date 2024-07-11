import React from "react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { useRouter } from "next/router";

//API
import { firebaseApi } from "../../api/firebase";

//Components
import { Button, Input, TextArea, WhiteBox } from "../../components";
import Accordion from "../../components/Accordion";

//Icons
import { CiCirclePlus as Plus } from "react-icons/ci";
import { BsTrash3 as Trash } from "react-icons/bs";

//Type
import { AddRecipeType } from "./recipe.type";
import toast from "react-hot-toast";

const AddRecipe = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddRecipeType>({
    defaultValues: {
      name: "",
      category: "",
      recipe: [
        { name: "", materials: "", stepRecipe: "", time: "", img: undefined },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipe",
  });

  const onSubmit = async (formData: AddRecipeType) => {
    toast.loading("Loading...");

    await firebaseApi.addRecipe(formData).then((res: any) => {
      if (res?.success) {
        toast.dismiss();
        toast.success("Add New Recipe Successfully");
        router.push("/recipe");
        reset();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-9 md:p-16"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-3xl font-semibold text-indigo-500">
          Add Recipe
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
              <Input
                type="text"
                label="Food Category*"
                placeholder="Food Category"
                {...register("category", {
                  required: "Please enter a category",
                })}
                hasError={!!errors?.category}
                errorMessage={errors?.category?.message}
              />
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
                        {...register(`recipe.${i}.name`, {
                          required: "Please enter a name",
                        })}
                        hasError={!!errors?.recipe?.[i]?.name}
                        errorMessage={errors?.recipe?.[i]?.name?.message}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="Step Materials*"
                        type="text"
                        placeholder="Materials"
                        {...register(`recipe.${i}.materials`, {
                          required: "Please enter materials",
                        })}
                        hasError={!!errors?.recipe?.[i]?.materials}
                        errorMessage={errors?.recipe?.[i]?.materials?.message}
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-full">
                      <Input
                        label="Step Img"
                        type="file"
                        placeholder="Step Img"
                        {...register(`recipe.${i}.img`)}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="Step Time*"
                        type="text"
                        placeholder="Time"
                        {...register(`recipe.${i}.time`, {
                          required: "Please enter a time",
                        })}
                        hasError={!!errors?.recipe?.[i]?.time}
                        errorMessage={errors?.recipe?.[i]?.time?.message}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <TextArea
                      label="Step Recipe"
                      placeholder="Step Recipe"
                      {...register(`recipe.${i}.stepRecipe`)}
                    ></TextArea>
                  </div>
                </div>
              </Accordion>
              {i > 0 && (
                <Trash
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
                img: undefined,
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
          Add Recipe
        </Button>
      </div>
    </form>
  );
};

export default AddRecipe;
