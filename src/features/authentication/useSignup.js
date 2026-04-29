import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (_, variables) => {
      toast.success(
        "Account successfully created! please verify the new account from the user's email address",
      );
      navigate("/check-email", {
        state: { email: variables.email, fromSignup: true },
      });
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during signup");
    },
  });
  return { signup, isPending };
}
