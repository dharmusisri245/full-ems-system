// // src/api/types/auth.types.ts
// export interface LoginPayload {
//   email: string;
//   password: string;
// }

// export interface RegisterPayload {
//   name: string;
//   email: string;
//   password: string;
//   avatar?: File;
// }

// export interface ResetPasswordPayload {
//   email: string;
//   otp: string;
//   newPassword: string;
// }


// src/types/auth.types.ts
export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  category: string | null;
  subCategory: string | null;  // REQUIRED
  permissions: string[];
  createdAt?: string;
  updatedAt?: string;
};
