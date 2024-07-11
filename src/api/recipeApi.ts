import { addDoc, collection, getDocs } from "firebase/firestore";
import { RecipeType } from "../pages/recipe/recipe.type";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const recipeApi = {
  addRecipe: async (formData: RecipeType) => {
    try {
      const recipeDataPromises = formData.step.map(async ({ img, ...rest }) => {
        if (!img || img.length === 0) {
          return { ...rest, imageUrl: null };
        }

        const file = img[0];
        const storageRef = ref(storage, `recipe_images/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        return { ...rest, imageUrl };
      });

      const recipeData = await Promise.all(recipeDataPromises);

      const docRef = await addDoc(collection(db, "recipes"), {
        name: formData.name,
        category: formData.category,
        step: recipeData,
      });

      return { success: true, id: docRef.id };
    } catch (error) {
      return { error: error };
    }
  },

  getRecipeList: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const documentList: RecipeType[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        category: doc.data().category,
        step: doc.data().step,
        name: doc.data().name,
      }));
      return documentList;
    } catch (error) {
      throw new Error("Tarif listesi alınırken hata oluştu: " + error);
    }
  },
};
