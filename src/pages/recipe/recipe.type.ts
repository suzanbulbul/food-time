export interface RecipInformationType {
  name: string;
  materials: string;
  stepRecipe?: string;
  time: string;
  img?: string | null;
}
export interface RecipeType {
  id?: string;
  name: string;
  summary?: string;
  category: string;
  img?: string | null;
  step: RecipInformationType[];
}
