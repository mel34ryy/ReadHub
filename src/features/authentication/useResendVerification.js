import { useMutation } from "@tanstack/react-query";
import { resendVerification } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useResendVerification() {
  const { mutate: resend, isPending } = useMutation({
    mutationFn: (email) => resendVerification(email),

    onSuccess: () => {
      toast.success("Verification email sent again.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { resend, isPending };
}
