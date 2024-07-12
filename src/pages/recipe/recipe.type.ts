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
  category: number | string;
  img?: string | null;
  step: RecipInformationType[];
}
export enum FoodCategory {
  GlobalFood = "global-food",
  TurkishFood = "turkish-food",
  Meat = "meat",
  Chicken = "chicken",
  Breakfast = "breakfast",
  DietHealth = "diet-health",
  Dessert = "dessert",
  CoffeeDrink = "coffee-drink",
}
