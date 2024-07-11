import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STROAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const firebaseApi = {
  handleRegister: async (formData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(user, { displayName: formData.name });
      return user;
    } catch (error) {
      return { error: error };
    }
  },
  handleLogin: async (formData) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      return user;
    } catch (error) {
      return { error: error };
    }
  },
  addRecipe: async (formData) => {
    try {
      const recipeDataPromises = formData.recipe.map(
        async ({ img, ...rest }) => {
          if (!img || img.length === 0) {
            return { ...rest, imageUrl: null };
          }

          const file = img[0];
          const storageRef = ref(storage, `recipe_images/${file.name}`);
          await uploadBytes(storageRef, file);
          const imageUrl = await getDownloadURL(storageRef);

          return { ...rest, imageUrl };
        }
      );

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
};

export default app;
