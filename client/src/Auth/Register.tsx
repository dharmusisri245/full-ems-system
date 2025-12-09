

// import React, { useState } from "react";
// import CommanForm from "@/components/common/CommanForm";
// import { registerFormControls } from "@/components/config/index";
// import { useRegisterUserMutation } from "@/api/authApi";
// import { Link, useNavigate } from "react-router-dom";
// import { Loader } from "lucide-react";

// const initialState = { name: "", email: "", password: "", avatar: null };

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState<any>(initialState);
//   const [registerUser, isLoading] = useRegisterUserMutation();
//   const navigate = useNavigate();

//   async function onSubmit(e?: any) {
//     e?.preventDefault();
//     try {
//       const form = new FormData();
//       form.append("name", formData.name);
//       form.append("email", formData.email);
//       form.append("password", formData.password);
//       if (formData.avatar) form.append("avatar", formData.avatar);

//       const res = await registerUser(form).unwrap();
//       if(isLoading){
//         <Loader/>
//       }
//       alert(`${res?.message}\n Please go to login` || "Registered Successfully");
//       navigate("/login");
//     } catch (err: any) {
//       alert(`${err?.data?.message}\n Please go to login`|| err?.message || "Registration failed");
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-md space-y-6 w-full bg-white p-10 rounded-2xl border border-gray-300">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-foreground">Create new account</h1>
//           <p className="mt-2">
//             Already have an account?
//             <Link className="font-medium ml-2 text-primary hover:underline" to="/login">
//               Login
//             </Link>
//           </p>
//         </div>

//         <CommanForm formControls={registerFormControls} buttonText="Sign Up" formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
//       </div>
//     </div>
//   );
// };

// export default Register;



// // src/pages/Register.tsx
// import React, { useState } from "react";
// import CommanForm from "@/components/common/CommanForm";
// import { registerFormControls } from "@/components/config/index";
// import { useRegisterUserMutation } from "@/api/authApi";
// import { Link, useNavigate } from "react-router-dom";
// import { Loader } from "lucide-react";

// const initialState = { name: "", email: "", password: "", avatar: null };

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState<any>(initialState);
//   const [registerUser, { isLoading }] = useRegisterUserMutation();
//   const navigate = useNavigate();

//   async function onSubmit(e?: any) {
//     e?.preventDefault();

//     try {
//       const form = new FormData();
//       form.append("name", formData.name);
//       form.append("email", formData.email);
//       form.append("password", formData.password);
//       if (formData.avatar) form.append("avatar", formData.avatar);

//       const res = await registerUser(form).unwrap();

//       alert(res?.message || "Registration successful!");
//       navigate("/login");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Registration failed");
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-md space-y-6 w-full bg-white p-10 rounded-2xl border border-gray-300">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-foreground">Create new account</h1>
//           <p className="mt-2">
//             Already have an account?
//             <Link className="font-medium ml-2 text-primary hover:underline" to="/login">
//               Login
//             </Link>
//           </p>
//         </div>

//         <CommanForm
//           formControls={registerFormControls}
//           buttonText={isLoading ? "Please wait..." : "Sign Up"}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//         />

//         {isLoading && (
//           <div className="flex justify-center mt-2">
//             <Loader className="animate-spin text-primary" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;



// // src/pages/Register.tsx

// import React, { useState } from "react";
// import CommanForm from "@/components/common/CommanForm";
// import { registerFormControls } from "@/components/config/index";
// import { useRegisterUserMutation } from "@/api/authApi";
// import { Link, useNavigate } from "react-router-dom";
// import { Loader } from "lucide-react";

// interface RegisterFormState {
//   name: string;
//   email: string;
//   password: string;
//   avatar: File | null;
// }

// const initialState: RegisterFormState = {
//   name: "",
//   email: "",
//   password: "",
//   avatar: null,
// };

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState<RegisterFormState>(initialState);

//   const [registerUser, { isLoading }] = useRegisterUserMutation();
//   const navigate = useNavigate();

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();
//       form.append("name", formData.name.trim());
//       form.append("email", formData.email.trim());
//       form.append("password", formData.password);

//       if (formData.avatar) {
//         form.append("avatar", formData.avatar);
//       }

//       const response = await registerUser(form).unwrap();

//       alert(response?.message || "Registration successful!");
//       navigate("/login");
//     } catch (err: any) {
//       const serverMessage =
//         err?.data?.message ||
//         err?.error ||
//         err?.message ||
//         "Registration failed. Please try again.";

//       alert(serverMessage);
//       console.error("Register Error:", err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
//       <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow border">

//         {/* Header */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold">Create your account</h1>
//           <p className="mt-2 text-gray-600">
//             Already have an account?
//             <Link
//               className="font-medium ml-1 text-blue-600 hover:underline"
//               to="/login"
//             >
//               Login
//             </Link>
//           </p>
//         </div>

//         {/* Form */}
//         <CommanForm
//           formControls={registerFormControls}
//           buttonText={isLoading ? "Please wait..." : "Sign Up"}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//           disabled={isLoading}
//         />

//         {/* Loader */}
//         {isLoading && (
//           <div className="flex justify-center mt-3">
//             <Loader className="animate-spin text-blue-600" size={28} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;







// src/pages/Register.tsx

import React, { useState } from "react";
import CommanForm from "@/components/common/CommanForm";
import { registerFormControls } from "@/components/config/index";
import { useRegisterUserMutation } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  avatar: File | null;
}

const initialState: RegisterFormState = {
  name: "",
  email: "",
  password: "",
  avatar: null,
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormState>(initialState);

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name.trim());
      form.append("email", formData.email.trim());
      form.append("password", formData.password);

      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      }

      const response = await registerUser(form).unwrap();

      alert(response?.message || "Registration successful!");
      navigate("/login");
    } catch (err: any) {
      const serverMessage =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Registration failed. Please try again.";

      alert(serverMessage);
      console.error("Register Error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow border">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-gray-600">
            Already have an account?
            <Link
              className="font-medium ml-1 text-blue-600 hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Form */}
        <CommanForm
          formControls={registerFormControls}
          buttonText={isLoading ? "Please wait..." : "Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          disabled={isLoading}
        />

        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center mt-3">
            <Loader className="animate-spin text-blue-600" size={28} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
