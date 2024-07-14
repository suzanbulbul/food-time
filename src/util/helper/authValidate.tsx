import toast from "react-hot-toast";
import { RegisterErrorType } from "../type/register.type";

export const handleRegisterError = (errorCode: string) => {
  switch (errorCode) {
    case RegisterErrorType.EMAIL_ALREADY:
      toast.error("Email already in use");
      break;
    case RegisterErrorType.INVALID_EMAIL:
      toast.error("Invalid Email");
      break;
    case RegisterErrorType.WEAK_PASSWORD:
      toast.error("Weak Password");
      break;
    default:
      toast.error(errorCode);
      break;
  }
};

export const regex = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-._!"`'#%&,:;<>=@{}~\\$\\(\\)\\*\\+\\/\\\\?\\[\]\\^\\|])[A-Za-z\d-._!"`'#%&,:;<>=@{}~\\$\\(\\)\\*\\+\\/\\\\?\\[\]\\^\\|]{8,}$/,
  name: /^[a-zA-ZğüşöçıİĞÜŞÖÇ ]{2,12}$/,
  email: /\S+@\S+\.\S+/,
};
