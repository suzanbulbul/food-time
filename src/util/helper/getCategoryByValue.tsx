//Constants
import { foodCategoryList } from "../constants/recipe.constants";

export function getCategoryByValue(value: string | number | undefined) {
  const selectedCategory = foodCategoryList.find(
    (item: any) => item.value === value
  );
  return selectedCategory && selectedCategory.label;
}
