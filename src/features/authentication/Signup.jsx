import { useForm, useWatch } from "react-hook-form";
import { useSignup } from "./useSignup";
import { FaBook } from "react-icons/fa6";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Spinner from "../../ui/Spinner";
import signupImg from "../../assets/library.jpg";

function Signup() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const { signup, isPending } = useSignup();
  const { register, reset, handleSubmit, getValues, formState, control } =
    useForm({ mode: "onTouched" });
  const { errors, isValid } = formState;

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const passwordConfirm = useWatch({
    control,
    name: "passwordConfirm",
    defaultValue: "",
  });

  function onSubmit({ email, password, username }) {
    signup(
      { email, password, username },
      {
        onSettled: reset,
      },
    );
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="mx-auto w-[90%] md:w-[40%] flex flex-col justify-center">
        <h1 className="flex items-center gap-1.5 justify-center text-[28px] font-bold text-(--color-text) mb-3">
          <FaBook /> ReadHub
        </h1>
        <h2 className="text-(--color-text) text-[24px] font-bold mb-2">
          Register a new account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-1"
        >
          <div className="flex gap-4 mb-2">
            <div className="w-[50%]">
              <label className="text-[14px] block" htmlFor="fName">
                First Name
              </label>
              <input
                className="border border-(--color-text-gray)/40 hover:border-(--color-text-gray)/80 focus:border-(--color-text-gray)/80 rounded-lg px-3 py-2.25 w-full outline-0"
                type="text"
                id="fName"
                {...register("fName", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Please enter a valid name (only letters, min 3).",
                  },
                })}
                disabled={isPending}
              />
              {errors?.fName?.message && (
                <p className="text-[14px] text-(--color-danger)">
                  {errors?.fName?.message}
                </p>
              )}
            </div>
            <div className="w-[50%]">
              <label className="text-[14px] block" htmlFor="lName">
                Last Name
              </label>
              <input
                className="border border-(--color-text-gray)/40 hover:border-(--color-text-gray)/80 focus:border-(--color-text-gray)/80 rounded-lg px-3 py-2.25 w-full outline-0"
                type="text"
                id="lName"
                {...register("lName", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Please enter a valid name (only letters, min 2).",
                  },
                })}
                disabled={isPending}
              />
              {errors?.lName?.message && (
                <p className="text-[14px] text-(--color-danger)">
                  {errors?.lName?.message}
                </p>
              )}
            </div>
          </div>
          <label className="text-[14px]" htmlFor="username">
            Username
          </label>
          <input
            className="border mb-2 border-(--color-text-gray)/40 hover:border-(--color-text-gray)/80 focus:border-(--color-text-gray)/80 rounded-lg px-3 py-2.25 w-full outline-0"
            type="text"
            id="username"
            placeholder="username"
            {...register("username", {
              required: "This field is required",
              pattern: {
                value:
                  /^(?=[a-zA-Z0-9._-]{3,16}$)(?!.*[._-]{2})[^._-].*[^._-]$/,
                message:
                  "Enter 3-16 characters. Use letters, numbers, or . - _ (no symbols at start/end or doubled up).",
              },
            })}
            disabled={isPending}
          />
          {errors?.username?.message && (
            <p className="text-[14px] text-(--color-danger)">
              {errors?.username?.message}
            </p>
          )}
          <label className="text-[14px]" htmlFor="email">
            Email address
          </label>
          <input
            className="border mb-2 border-(--color-text-gray)/40 hover:border-(--color-text-gray)/80 focus:border-(--color-text-gray)/80 rounded-lg px-3 py-2.25 w-full outline-0"
            type="email"
            id="email"
            autoComplete="username"
            placeholder="example@gmail.com"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
            disabled={isPending}
          />
          {errors?.email?.message && (
            <p className="text-[14px] text-(--color-danger)">
              {errors?.email?.message}
            </p>
          )}
          <label className="text-[14px]" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={show1 ? "text" : "password"}
              className="border mb-2 border-(--color-text-gray)/40 hover:border-(--color-text-gray)/80 focus:border-(--color-text-gray)/80 rounded-lg px-3 py-2.25 w-full outline-0"
              id="password"
              disabled={isPending}
              autoComplete="current-password"
              placeholder="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum  of 8 characters",
                },
              })}
            />
            {password?.length > 0 && (
              <span
                className="absolute top-1/2 -translate-y-1/2 right-3"
                onClick={() => setShow1(!show1)}
              >
                {show1 ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
            )}
          </div>
          {errors?.password?.message && (
            <p className="text-[14px] text-(--color-danger)">
              {errors?.password?.message}
            </p>
          )}
          <label className="text-[14px]" htmlFor="passwordConfirm">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={show2 ? "text" : "password"}
              className="border mb-2 border-(--color-text-gray)/40 hover:border-(--color-text-gray)/80 focus:border-(--color-text-gray)/80 rounded-lg px-3 py-2.25 w-full outline-0"
              id="passwordConfirm"
              disabled={isPending}
              autoComplete="current-password"
              placeholder="Confirm password"
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
            {passwordConfirm?.length > 0 && (
              <span
                className="absolute top-1/2 -translate-y-1/2 right-3"
                onClick={() => setShow2(!show2)}
              >
                {show2 ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
            )}
          </div>
          {errors?.passwordConfirm?.message && (
            <p className="text-[14px] text-(--color-danger)">
              {errors?.passwordConfirm?.message}
            </p>
          )}
          <button
            className={`flex justify-center items-center w-full text-(--color-surface) px-3 py-2.25 rounded-lg ${isValid ? "bg-(--color-text) cursor-pointer" : "bg-(--color-text-gray)"} mt-4`}
            disabled={!isValid || isPending}
            type="submit"
          >
            {isPending ? <Spinner /> : "Sign up"}
          </button>
        </form>
      </div>
      <div className="hidden md:block w-[50%]">
        <img className="h-full w-full" src={signupImg} alt="library" />
      </div>
    </div>
  );
}

export default Signup;
