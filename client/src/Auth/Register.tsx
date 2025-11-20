// import CommanForm from "../components/common/CommanForm"
// import { registerFormControls } from '../components/config/index'
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'



// const initialState ={
//   userName:"",
//   email:'',
//   password:''
// }
// const Register = () => {
//   function onSubmit(){

//   }
//   const [formData ,setFormData] = useState(initialState)
//   return (
//     <div className='flex justify-center items-center min-h-screen'>
//       <div className='max-w-md space-y-6 w-full bg-white p-10 rounded-b-2xl rounded-t-2xl border border-gray-300'>
//       <div className='text-center'>
//         <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
//         <p className='mt-2'>Already have an account
//           <Link className='font-medium ml-2 text-primary hover:underline' to='/login'>
//           Login
//           </Link>
//         </p>
//       </div>
//       <CommanForm
//       formControls = {registerFormControls}
//       buttonText = {'Sign Up'}
//       formData ={formData}
//       setFormData={setFormData}
//       onSubmit ={onSubmit}
//       />
//     </div>
//     </div>
    
//   )
// }

// export default Register


// // src/pages/Register.tsx
// import React, { useState } from "react";
// import CommanForm from "@/components/common/CommanForm";
// import { registerFormControls } from "@/components/config/index";
// import { useRegisterUserMutation } from "@/api/authApi";
// import { Link, useNavigate } from "react-router-dom";
// import Loader from "@/components/Loader";

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
//       alert(res?.message || "Registered Successfully");
//       navigate("/login");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Registration failed");
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       {isLoading && <Loader />}
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



import React, { useState } from "react";
import CommanForm from "@/components/common/CommanForm";
import { registerFormControls } from "@/components/config/index";
import { useRegisterUserMutation } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const initialState = { name: "", email: "", password: "", avatar: null };

const Register: React.FC = () => {
  const [formData, setFormData] = useState<any>(initialState);
  const [registerUser, isLoading] = useRegisterUserMutation();
  const navigate = useNavigate();

  async function onSubmit(e?: any) {
    e?.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      if (formData.avatar) form.append("avatar", formData.avatar);

      const res = await registerUser(form).unwrap();
      if(isLoading){
        <Loader/>
      }
      alert(`${res?.message}\n Please go to login` || "Registered Successfully");
      navigate("/login");
    } catch (err: any) {
      alert(`${err?.data?.message}\n Please go to login`|| err?.message || "Registration failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md space-y-6 w-full bg-white p-10 rounded-2xl border border-gray-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Create new account</h1>
          <p className="mt-2">
            Already have an account?
            <Link className="font-medium ml-2 text-primary hover:underline" to="/login">
              Login
            </Link>
          </p>
        </div>

        <CommanForm formControls={registerFormControls} buttonText="Sign Up" formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Register;
