// src/api/types/auth.types.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  avatar?: File;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}
