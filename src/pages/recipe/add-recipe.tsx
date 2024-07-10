import React from "react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { CiCirclePlus as Plus } from "react-icons/ci";
import { BsTrash3 as Trash } from "react-icons/bs";
import Accordion from "../../components/Accordion";
import { Button, Input, TextArea } from "../../components";

interface RecipeFormValues {
  name: string;
  recipe: {
    name: string;
    materials: string;
    stepRecipe: string;
    time: string;
  }[];
}

const AddRecipe = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormValues>({
    defaultValues: {
      name: "",
      recipe: [{ name: "", materials: "", stepRecipe: "", time: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipe",
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-9 md:p-16"
    >
      <div className="flex flex-col gap-4">
        <div className="mx-auto max-w-max bg-white">
          <Input
            type="text"
            placeholder="Food Name"
            {...register("name", {
              required: "Please enter a name",
            })}
            hasError={!!errors?.name}
            errorMessage={errors?.name?.message}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          {fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-4">
              <Accordion title={`Step ${i + 1}`}>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <div className="w-full">
                      <Input
                        label="Name*"
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
                        label="Materials*"
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
                        label="Img"
                        type="file"
                        placeholder="Time"
                        {...register(`recipe.${i}.time`, {
                          required: "Please enter a time",
                        })}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        label="Time*"
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
                      label="Step Recipe*"
                      type="textarea"
                      placeholder="Step Recipe"
                      {...register(`recipe.${i}.stepRecipe`, {
                        required: "Please enter a step recipe",
                      })}
                      hasError={!!errors?.recipe?.[i]?.stepRecipe}
                      errorMessage={errors?.recipe?.[i]?.stepRecipe?.message}
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
              append({ name: "", materials: "", stepRecipe: "", time: "" })
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
