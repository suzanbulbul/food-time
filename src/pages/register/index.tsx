import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components";
import Link from "next/link";

const Register = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = async (formData: any) => {};

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="img/logo.jpeg" alt="logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <Input
              label="Name*"
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Please enter an name",
              })}
              hasError={!!errors.name}
              errorMessage={errors.name?.message as any}
            />
          </div>
          <div className="w-full ">
            <Input
              label="Owner*"
              type="text"
              placeholder="Owner"
              {...register("owner", {
                required: "Please enter an owner",
              })}
              hasError={!!errors.owner}
              errorMessage={errors.owner?.message as any}
            />
          </div>
          <div className="w-full">
            <Input
              label="Email address*"
              type="email"
              placeholder="Email"
              {...register("email", {
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
                required: "Please enter a password",
              })}
              hasError={!!errors.password}
              errorMessage={errors.password?.message as any}
            />
          </div>
          <div className="flex gap-2">
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
          </div>

          <Button type="submit" className="w-full">
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
