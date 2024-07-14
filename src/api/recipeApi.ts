import { addDoc, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

//Helper
import { uploadImageAndGetUrl } from "../util/helper";

//Type
import { RecipeType } from "../util/type/recipe.type";

export const recipeApi = {
  addRecipe: async (formData: RecipeType) => {
    try {
      const recipeDataPromises = formData.step.map(
        async ({ imageUrl, ...rest }) => {
          if (!imageUrl || imageUrl.length === 0) {
            return { ...rest, imageUrl: null };
          }

          const file = imageUrl[0];
          const img = await uploadImageAndGetUrl(file as any);
          return { ...rest, imageUrl: img };
        }
      );

      const recipeData = await Promise.all(recipeDataPromises);

      let mainImageUrl = null;
      if (formData.img && formData.img.length > 0) {
        const mainImageFile = formData.img[0];
        mainImageUrl = await uploadImageAndGetUrl(mainImageFile as any);
      }

      const docRef = await addDoc(collection(db, "recipes"), {
        name: formData.name,
        summary: formData.summary,
        category: formData.category,
        img: mainImageUrl,
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
        summary: doc.data().summary,
        step: doc.data().step,
        name: doc.data().name,
        img: doc.data().img,
      }));
      return documentList;
    } catch (error) {
      throw new Error("Tarif listesi alınırken hata oluştu: " + error);
    }
  },

  getRecipeById: async (id: any) => {
    try {
      const docRef = await getDoc(doc(db, "recipes", id));

      if (docRef.exists()) {
        const recipeData = docRef.data() as RecipeType;
        return { ...recipeData, id: docRef.id };
      } else {
        throw new Error("Tarif bulunamadı");
      }
    } catch (error) {
      throw new Error("Tarif alınırken hata oluştu: " + error);
    }
  },
};
