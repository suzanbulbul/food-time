import { RecipInformationType } from "../type/recipe.type";

export function aggregateIngredients(data: RecipInformationType[]) {
  const allMaterials: string[] = data.reduce((acc: string[], recipe: any) => {
    const ingredients: string[] = recipe.materials
      .split(/[,-]+/)
      .map((ingredient: string) => ingredient.trim())
      .filter((ingredient: string | any[]) => ingredient.length > 0);

    return acc.concat(ingredients);
  }, []);

  return allMaterials;
}
