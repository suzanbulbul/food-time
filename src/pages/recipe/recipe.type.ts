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
  summary?: string;
  category: string;
  img?: FileList | null;
  step: RecipInformationType[];
}
