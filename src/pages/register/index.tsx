import React from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
import Image from "next/image";

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
        <Image
          className="mx-auto h-10 w-auto rounded-full"
          src="img/logo.svg"
          alt="logo"
          width={56}
          height={56}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Hemen Kaydol
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <Input
              type="text"
              label="İsim*"
              placeholder="İsminizi girin."
              {...register("name", {
                required: "Lütfen isminizi girin",
                onChange: (e) => {
                  setValue("name", e.target.value.trimStart());
                },
                pattern: {
                  message:
                    "En az 2 karakter, en fazla 12 karakter ve A-Z harflerinden oluşabilir.",
                  value: regex.name,
                },
              })}
              hasError={!!errors.name}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="E-posta*"
              type="email"
              placeholder="E-posta adresinizi girin."
              {...register("email", {
                pattern: {
                  value: regex.email,
                  message: "Girilen değer e-posta formatına uymuyor.",
                },
                required: "Lütfen e-posta adresinizi girin.",
              })}
              hasError={!!errors.email}
              errorMessage={errors.email?.message as any}
            />
          </div>
          <div className="w-full">
            <Input
              label="Şifre*"
              type="password"
              placeholder="Şifrenizi girin."
              {...register("password", {
                required: "true",
                pattern: {
                  value: regex.password,
                  message:
                    "Şifreniz en az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir.",
                },
              })}
              hasError={!!errors.password}
              errorMessage={
                errors.password?.message === "true"
                  ? "Şifreniz en az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir."
                  : errors.password?.message
              }
            />
          </div>
          <div className="w-full">
            <Input
              label="Şifre Tekrarı*"
              type="password"
              placeholder="Şifrenizi tekrar girin."
              {...register("confirmPassword", {
                required: "true",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Şifreleriniz eşleşmiyor.";
                  }
                },
              })}
              hasError={!!errors.confirmPassword}
              errorMessage="Şifreleriniz eşleşmiyor."
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
            Kaydol
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Üye misin? Hemen{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Giriş Yap
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};
export default Register;
