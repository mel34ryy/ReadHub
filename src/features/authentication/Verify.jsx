import { FaBook } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import Spinner from "../../ui/Spinner";
import { logout } from "../../services/apiAuth";

function Verify() {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const run = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const type = params.get("type");

      if (type !== "signup") {
        navigate("/", { replace: true });
        return;
      }

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/login", { replace: true });
        return;
      }

      await logout();
      setOk(true);
    };

    run();
  }, [navigate]);

  if (!ok)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Verifying... <Spinner />
      </div>
    );

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
      <h1 className="flex items-center gap-1.5 text-[36px] font-bold text-(--color-text)">
        <FaBook /> ReadHub
      </h1>
      <MdMarkEmailRead className="text-6xl text-(--color-accent)" />
      <h2 className="text-(--color-text) text-[24px] font-bold">
        Email verified successfully!
      </h2>
      <p className="text-(--color-text-gray) text-center max-w-md">
        Your account has been confirmed. You can now sign in.
      </p>
      <Link
        to="/login"
        className="px-6 py-2.25 rounded-lg bg-(--color-text) text-(--color-surface) cursor-pointer"
      >
        Go to Login
      </Link>
    </div>
  );
}

export default Verify;
