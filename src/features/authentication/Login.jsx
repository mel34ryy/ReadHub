import { FaBook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import loginImg from "../../assets/library.jpg";
import { useLogin } from "./useLogin";
import Spinner from "../../ui/Spinner";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const { login, isPending } = useLogin();

  const emailValidate =
    email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValidate = password.trim() !== "" && password.length >= 8;

  const formValidate = emailValidate && passwordValidate;

  async function handleSubmit(e) {
    e.preventDefault();
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
          setEmailTouched(false);
          setPasswordTouched(false);
        },
      },
    );
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="mx-auto w-[90%] md:w-[40%] flex flex-col justify-center">
        <h1 className="flex items-center gap-1.5 justify-center text-[36px] font-bold text-(--color-text) mb-8">
          <FaBook /> ReadHub
        </h1>
        <h2 className="text-(--color-text) text-[30px] font-bold mb-4">
          Sign in to your account
        </h2>
        <p className="text-[14px] text-(--color-primary)">
          Not a member?{" "}
          <Link
            to="/register"
            className="text-(--color-accent) transition-all duration-300 hover:text-(--color-accent-hover)"
          >
            Register
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="py-8 flex flex-col gap-2">
          <label className="text-[14px]" htmlFor="email">
            Email address
          </label>
          <input
            className="border border-(--color-text-gray)/40 hover:border-(--color-text-gray)/80 focus:border-(--color-text-gray)/80 rounded-lg px-3 py-2.25 w-full outline-0"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            required
            disabled={isPending}
            autoComplete="username"
            placeholder="example@gmail.com"
          />
          {emailTouched && !emailValidate && (
            <p className="text-[14px] text-(--color-danger)">
              Please enter a valid email.
            </p>
          )}
          <label className="text-[14px] mt-4" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="border border-(--color-text-gray)/40 hover:border-(--color-text-gray)/80 focus:border-(--color-text-gray)/80 rounded-lg px-3 py-2.25 w-full outline-0"
              id="password"
              required
              disabled={isPending}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              placeholder="password"
            />
            {password.length > 0 && (
              <span
                className="absolute top-1/2 -translate-y-1/2 right-3"
                onClick={() => setShow(!show)}
              >
                {show ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
            )}
          </div>
          {passwordTouched && !passwordValidate && (
            <p className="text-[14px] text-(--color-danger)">
              Please enter a valid password (at least 8 characters long).
            </p>
          )}
          <Link
            to="/reset"
            className="text-center mt-6 mb-4 text-(--color-accent) transition-all duration-300 hover:text-(--color-accent-hover)"
          >
            Forgot Password?
          </Link>
          <button
            className={`flex justify-center items-center w-full text-(--color-surface) px-3 py-2.25 rounded-lg ${formValidate ? "bg-(--color-text) cursor-pointer" : "bg-(--color-text-gray)"}`}
            disabled={!formValidate || isPending}
            type="submit"
          >
            {isPending ? <Spinner /> : "Sign in"}
          </button>
        </form>
      </div>
      <div className="hidden md:block w-[50%]">
        <img className="h-full w-full" src={loginImg} alt="library" />
      </div>
    </div>
  );
}

export default Login;
