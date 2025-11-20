// import React from 'react'
// import CommanForm from '@/components/common/CommanForm'
// import { loginFormControls } from '../components/config/index'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui/button'



// const initialState = {
//   email: '',
//   password: ''
// }

// const Login = () => {
//   function onSubmit() {

//   }
//   const [formData, setFormData] = useState(initialState)
//   return (
//     <div className='flex justify-center items-center min-h-screen'>
//       <div className='max-w-md space-y-6 w-full bg-white p-10 rounded-b-2xl rounded-t-2xl border border-gray-300'>
//       <div className='text-center'>
//         <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sigin in to your account</h1>
//         <p className='mt-2'>Don't have an account
//           <Link className='font-medium ml-2 text-primary hover:underline' to='/register'>
//             SignUp
//           </Link>
//         </p>
//       </div>
//       <CommanForm
//         formControls={loginFormControls}
//         buttonText={'Login'}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//       <Button variant="outline" className="w-full">
//         Login with Google
//       </Button>
//     </div>
//     </div>

//   )
// }

// export default Login












// import React, { useState } from "react";
// import CommanForm from "@/components/common/CommanForm";
// import { loginFormControls } from "../components/config/index";
// // import { loginUser } from "@/api/auth.api";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const initialState = {
//   email: "",
//   password: "",
// };

// const Login = () => {
//   const [formData, setFormData] = useState(initialState);
//   const navigate = useNavigate();

//   async function onSubmit() {
//     try {
//       const res = await loginUser(formData);
//       alert(res.data.message);
//       localStorage.setItem("token", res.data.token);
//       navigate("/");
//     } catch (err: any) {
//       alert(err.response?.data?.message || "Login failed");
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

//         <CommanForm
//           formControls={loginFormControls}
//           buttonText="Login"
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//         />

//         <Link to="/forgot-password" className="text-sm text-blue-600 underline block text-center">
//           Forgot Password?
//         </Link>

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
import { loginFormControls } from "@/components/config/index";
import { useLoginUserMutation } from "@/api/authApi";
import { useAppDispatch } from "../hooks/hooks";
import { setCredentials } from "../redux/slices/authSlices";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const initialState = { email: "", password: "" };

const Login: React.FC = () => {
  const [formData, setFormData] = useState(initialState);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmit(e?: any) {
    e?.preventDefault();
    try {
      const res = await loginUser(formData).unwrap();
      // Expect API to return { user, token }
      dispatch(setCredentials({ user: res.user, token: res.token }));
      navigate("/");
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Login failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md space-y-6 w-full bg-white p-10 rounded-2xl border border-gray-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Sign in to your account</h1>
          <p className="mt-2">
            Don’t have an account?
            <Link className="font-medium ml-2 text-primary hover:underline" to="/register">
              Sign Up
            </Link>
          </p>
        </div>
        <CommanForm formControls={loginFormControls} buttonText="Login" formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
 {/* Forgot Password */}
        <div className="text-center mt-2">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
