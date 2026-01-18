

// // src/pages/Login.tsx
// import React, { useState } from "react";
// import CommanForm from "@/components/common/CommanForm";
// import { loginFormControls } from "@/components/config/index";
// import { useLoginUserMutation } from "@/api/authApi";
// import { useAppDispatch } from "../hooks/hooks";
// import { setCredentials } from "../redux/slices/authSlices";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const initialState = { email: "", password: "" };

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState(initialState);
//   const [loginUser, { isLoading }] = useLoginUserMutation();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   async function onSubmit(e?: any) {
//     e?.preventDefault();
//     try {
//       const res = await loginUser(formData).unwrap();
//       // Expect API to return { user, token }
//       dispatch(setCredentials({ user: res.user, token: res.token }));
//       navigate("/");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Login failed");
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-md space-y-6 w-full bg-white p-10 rounded-2xl border border-gray-300">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-foreground">Sign in to your account</h1>
//           <p className="mt-2">
//             Don’t have an account?
//             <Link className="font-medium ml-2 text-primary hover:underline" to="/register">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//         <CommanForm formControls={loginFormControls} buttonText="Login" formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
//  {/* Forgot Password */}
//         <div className="text-center mt-2">
//           <Link
//             to="/forgot-password"
//             className="text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline"
//           >
//             Forgot Password?
//           </Link>
//         </div>
//         <Button variant="outline" className="w-full">
//           Login with Google
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Login;











// //================================================================
// // src/pages/Login.tsx
// import React, { useState } from "react";
// import CommanForm from "@/components/common/CommanForm";
// import { loginFormControls } from "@/components/config/index";
// import { useLoginUserMutation } from "@/api/authApi";
// import { useAppDispatch } from "../hooks/hooks";
// import { setCredentials } from "../redux/slices/authSlices";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { setAccessToken } from "../api/AxiosInstace";

// const initialState = { email: "", password: "" };

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState(initialState);
//   const [loginUser, { isLoading }] = useLoginUserMutation();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   async function onSubmit(e?: any) {
//     e?.preventDefault();

//     try {
//       const res = await loginUser(formData).unwrap();
//       // Save ACCESS TOKEN in memory only
//       setAccessToken(res.token);

//       // Save user in Redux (not the token)
//       dispatch(setCredentials({ user: res.user, token: res.token }));

//       navigate("/");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Login failed");
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-md space-y-6 w-full bg-white p-10 rounded-2xl border border-gray-300">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-foreground">
//             Sign in to your account
//           </h1>
//           <p className="mt-2">
//             Don’t have an account?
//             <Link
//               className="font-medium ml-2 text-primary hover:underline"
//               to="/register"
//             >
//               Sign Up
//             </Link>
//           </p>
//         </div>

//         {/* Form */}
//         <CommanForm
//           formControls={loginFormControls}
//           buttonText={isLoading ? "Logging in..." : "Login"}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//         />

//         {/* Forgot Password */}
//         <div className="text-center mt-2">
//           <Link
//             to="/forgot-password"
//             className="text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline"
//           >
//             Forgot Password?
//           </Link>
//         </div>

//         {/* Google Button */}
//         <Button variant="outline" className="w-full">
//           Login with Google
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Login;





// src/pages/Login.tsx

import React, { useState } from "react";
import CommanForm from "@/components/common/CommanForm";
import { loginFormControls } from "@/components/config";
import { useLoginUserMutation } from "@/api/authApi";

import { useAppDispatch } from "@/hooks/hooks";
import { setCredentials } from "@/redux/slices/authSlices";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setAccessToken } from "@/api/AxiosInstace";

interface LoginFormState {
  email: string;
  password: string;
}

const initialState: LoginFormState = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormState>(initialState);

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData).unwrap();

      // Save access token in memory (safer)
      setAccessToken(response.token);

      // Save user in Redux (but not token)
      dispatch(
        setCredentials({
          user: response.user,
          token: response.token, // optional: but you are storing memory token only
        })
      );

      // Navigate to home
      navigate("/");
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Login failed. Please try again.";

      alert(message);
      console.error("LOGIN ERROR:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow border">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
          <p className="mt-2 text-gray-600">
            Don’t have an account?
            <Link
              className="font-medium ml-1 text-blue-600 hover:underline"
              to="/register"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <CommanForm
          formControls={loginFormControls}
          buttonText={isLoading ? "Logging in..." : "Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          disabled={isLoading}
        />

        {/* Forgot Password */}
        <div className="text-center mt-3">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Google Login */}
        <Button variant="outline" className="w-full mt-4" disabled={isLoading}>
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
