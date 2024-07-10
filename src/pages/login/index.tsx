import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components";
import Link from "next/link";
import { LoginType } from "./login.type";
import { firebaseApi } from "../../api/firebase";
import router from "next/router";
import toast from "react-hot-toast";
import { regex } from "../../util/helper";

const Login = () => {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm<LoginType>({
    mode: "all",
  });

  const onSubmit = async (formData: LoginType) => {
    await firebaseApi.handleLogin(formData).then((res: any) => {
      if (res?.accessToken) {
        toast.success("Login Successfully");
        router.push("/home");
        reset();
      } else {
        toast.error("Password or email is incorrect");
      }
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <Input
              label="Email address*"
              type="email"
              placeholder="Email"
              {...register("email", {
                pattern: {
                  value: regex.email,
                  message: "Entered value does not match email format",
                },
                required: "Please enter an email",
              })}
              hasError={!!errors.email}
              errorMessage={errors.email?.message as any}
            />
          </div>
          <div className="grid-col grid w-full gap-1">
            <Input
              label="Password*"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Please enter a password",
              })}
              hasError={!!errors.password}
              errorMessage={errors.password?.message as any}
            />
            <div className="text-right">
              <Link
                href="#"
                className="text-right text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>{" "}
          now
        </p>
      </div>
    </div>
  );
};
export default Login;
