//Type
import { Option } from "../../util/type/global.type";
import { FoodCategory } from "./recipe.type";

export const foodCategoryList: Option[] = [
  {
    label: "Dünya Mutfakları",
    value: FoodCategory.GlobalFood,
  },
  {
    label: "Türk Mutfağı",
    value: FoodCategory.TurkishFood,
  },
  {
    label: "Et",
    value: FoodCategory.Meat,
  },
  {
    label: "Tavuk",
    value: FoodCategory.Chicken,
  },
  {
    label: "Kahvaltı",
    value: FoodCategory.Breakfast,
  },
  {
    label: "Diyet & Sağlık",
    value: FoodCategory.DietHealth,
  },
  {
    label: "Tatlı",
    value: FoodCategory.Dessert,
  },
  {
    label: "Kahve & İçecek",
    value: FoodCategory.CoffeeDrink,
  },
];
