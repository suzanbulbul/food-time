export interface RecipInformationType {
  name: string;
  materials: string;
  stepRecipe: string;
  time: string;
}

export interface AddRecipeType {
  recipe: string;
  step: RecipInformationType[];
}
