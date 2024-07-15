import React from "react";
import { useForm } from "react-hook-form";
import router from "next/router";

//API
import { authApi } from "../../api/authApi";

//Library
import toast from "react-hot-toast";

//Components
import { Button, Input } from "../../components";
import Link from "next/link";

//Helper
import { handleRegisterError, regex } from "../../util/helper";

//Type
import { RegisterType } from "../../util/type/register.type";

const Register = () => {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<RegisterType>({
    mode: "all",
  });

  const onSubmit = async (formData: RegisterType) => {
    await authApi.handleRegister(formData).then((res: any) => {
      if (res?.accessToken) {
        toast.success("Register Successfully");
        router.push("/login");
        reset();
      } else {
        handleRegisterError(res.error.code);
      }
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto rounded-full"
          src="img/logo.svg"
          alt="logo"
        />{" "}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <Input
              type="text"
              label="Name*"
              placeholder="Enter Name"
              {...register("name", {
                required: "Name is required",
                onChange: (e) => {
                  setValue("name", e.target.value.trimStart());
                },
                pattern: {
                  message:
                    "Minimum of 2 characters, a maximum of 12 characters and can consist of letters A-Z.",
                  value: regex.name,
                },
              })}
              hasError={!!errors.name}
              errorMessage={errors.name?.message}
            />
          </div>
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
          <div className="w-full">
            <Input
              label="Password*"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "true",
                pattern: {
                  value: regex.password,
                  message:
                    "Your password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
                },
              })}
              hasError={!!errors.password}
              errorMessage={
                errors.password?.message === "true"
                  ? "Your password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
                  : errors.password?.message
              }
            />
          </div>
          <div className="w-full">
            <Input
              label="Repeat Password*"
              type="password"
              placeholder="Repeat Password"
              {...register("confirmPassword", {
                required: "true",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do not match";
                  }
                },
              })}
              hasError={!!errors.confirmPassword}
              errorMessage="Your passwords do not match"
            />
          </div>
          {/* <div className="flex gap-2">
            <div className="w-full ">
              <Input
                label="Phone*"
                type="text"
                placeholder="Phone"
                {...register("phone", {
                  required: "Please enter an phone",
                })}
                hasError={!!errors.phone}
                errorMessage={errors.phone?.message as any}
              />
            </div>
            <div className="w-full ">
              <Input
                label="Dial Phone"
                type="text"
                placeholder="Dial Phone"
                {...register("dial_phone")}
              />
            </div>
          </div> */}

          <Button disabled={isSubmitting} type="submit" className="w-full">
            Register
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Are you a member?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>{" "}
          now
        </p>
      </div>
    </div>
  );
};
export default Register;
