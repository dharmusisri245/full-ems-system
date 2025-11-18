import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAPI } from "../../api/auth.api";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPasswordAPI(email),
  });
};
