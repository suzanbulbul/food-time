export interface RecipInformationType {
  name: string;
  materials: string;
  stepRecipe?: string;
  time: string;
  imageUrl?: string | null;
}
export interface RecipeType {
  id?: string | number;
  name: string;
  summary?: string;
  category: number | string;
  img?: string | null;
  step: RecipInformationType[];
}
export interface TabType {
  id: string | number;
  name?: string;
  minute: string;
  summary?: string;
  materials: string[];
  img?: string | null;
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
