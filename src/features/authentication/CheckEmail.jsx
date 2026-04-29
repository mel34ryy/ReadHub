import { FaBook } from "react-icons/fa6";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { useEffect, useState } from "react";
import { useResendVerification } from "./useResendVerification";
import Spinner from "../../ui/Spinner";
import { useLocation } from "react-router-dom";

function CheckEmail() {
  const { resend, isPending } = useResendVerification();
  const location = useLocation();
  const email = location.state?.email;

  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((sec) => sec - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  function handleResend() {
    if (!email) return;

    resend(email);
    setSecondsLeft(60);
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 px-6">
      <h1 className="flex items-center gap-1.5 text-[36px] font-bold text-(--color-text)">
        <FaBook /> ReadHub
      </h1>

      <MdOutlineMarkEmailUnread className="text-6xl text-(--color-accent)" />

      <h2 className="text-(--color-text) text-[24px] font-bold">
        Check your email
      </h2>

      <p className="max-w-sm text-center text-(--color-text-gray)">
        We've sent a verification link to your email address. Please check your
        inbox and click the link to activate your account.
      </p>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-(--color-text-gray)">
          Didn't receive the email?
        </p>

        <button
          onClick={handleResend}
          disabled={secondsLeft > 0 || isPending}
          className="rounded-lg bg-(--color-text) px-6 py-2.5 text-(--color-surface) disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <Spinner />
          ) : secondsLeft > 0 ? (
            `Resend in ${secondsLeft}s`
          ) : (
            "Resend Email"
          )}
        </button>
      </div>
    </div>
  );
}

export default CheckEmail;
