import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

//Type
import { RegisterType } from "../util/type/register.type";
import { LoginType } from "../util/type/login.type";
import { SettingsModalType } from "../sections/SettingsModal";

import { updateProfile as firebaseUpdateProfile } from "firebase/auth";
import { auth, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const authApi = {
  handleRegister: async (formData: RegisterType) => {
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

  handleLogin: async (formData: LoginType) => {
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

  updateProfile: async (profileData: SettingsModalType, file?: File) => {
    try {
      let photoURL = profileData.photoURL;

      if (file) {
        const storageRef = ref(storage, `profile_photos/${file.name}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }

      const user = auth.currentUser;

      if (user) {
        await firebaseUpdateProfile(user, {
          displayName: profileData.displayName,
          photoURL: photoURL || user.photoURL,
        });

        return user;
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      return { error: error };
    }
  },
};
