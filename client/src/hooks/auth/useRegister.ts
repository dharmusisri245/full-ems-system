// src/hooks/auth/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../api/auth.api";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/authSlice";
import { RegisterPayload } from "../../api/types/auth.types";

export const useRegister = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: RegisterPayload) => registerAPI(data),
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      localStorage.setItem("token", data.token);
    },
  });
};
