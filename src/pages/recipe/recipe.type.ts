export interface RecipInformationType {
  name: string;
  materials: string;
  stepRecipe?: string;
  time: string;
  img?: FileList | null;
}
export interface RecipeType {
  id?: string;
  name: string;
  category: string;
  step: RecipInformationType[];
}
