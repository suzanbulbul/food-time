export interface RecipInformationType {
  name: string;
  materials: string;
  stepRecipe: string;
  time: string;
  img?: FileList | null;
}

export interface AddRecipeType {
  name: string;
  category: string;
  recipe: RecipInformationType[];
}
