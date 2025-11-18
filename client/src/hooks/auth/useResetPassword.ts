
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../api/auth.api";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/authSlice";
import { LoginPayload } from "../../api/types/auth.types";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginAPI(data),
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      localStorage.setItem("token", data.token);
    },
  });
};
