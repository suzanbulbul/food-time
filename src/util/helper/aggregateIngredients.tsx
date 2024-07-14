import { RecipInformationType } from "../type/recipe.type";

export function aggregateIngredients(data: RecipInformationType[]) {
  const allMaterials: string[] = data.reduce((acc: string[], recipe: any) => {
    const ingredients: string[] = recipe.materials.split(", ");

    return acc.concat(ingredients);
  }, []);

  return allMaterials;
}
