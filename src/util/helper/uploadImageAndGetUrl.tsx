import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../api/firebase";

export const uploadImageAndGetUrl = async (file: File) => {
  const storageRef = ref(storage, `recipe_images/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
