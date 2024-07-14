export type RegisterType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export enum RegisterErrorType {
  EMAIL_ALREADY = "auth/email-already-in-use",
  INVALID_EMAIL = "auth/invalid-email",
  WEAK_PASSWORD = "auth/weak-password",
}
