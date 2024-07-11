import { auth } from "./firebase";
import { RegisterType } from "../pages/register/register.type";
import { LoginType } from "../pages/login/login.type";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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
};
