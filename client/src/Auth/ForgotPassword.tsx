
// import React from 'react'
// import CommanForm from '../components/common/CommanForm'
// import { forgotPasswordFormControls } from '../components/config/index'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui/button'
// import { InputOTPPattern } from '../components/common/YourOtp'


// const initialState = {
//   email: ''
// }

// const ForgotPassword = () => {
//   function onSubmit() {

//   }
//   const [formData, setFormData] = useState(initialState)
//   return (
//     <div className='flex justify-center items-center min-h-screen'>
//       <div className='max-w-md space-y-6 w-full bg-white p-10 rounded-b-2xl rounded-t-2xl border border-gray-300'>
//       <div className='text-center'>
//         <h1 className='text-3xl font-bold tracking-tight text-foreground'>Forgot Password</h1>
//         <p className='mt-2'>Remember your password?
//           <Link className='font-medium ml-2 text-primary hover:underline' to='/login'>
//             Login
//           </Link>
//         </p>
//       </div>
//       <CommanForm
//         formControls={forgotPasswordFormControls}
//         buttonText={'Send OTP'}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//       <div className='flex gap-2 items-center'>
//         <div className='w-1/'>
//           <p className='text-sm font-semibold'>Enter OTP</p>
//           <InputOTPPattern/>
//         </div>
//         <Button variant="outline" className="w-1/">
//           Resend OTP
//         </Button>
//       </div>
//       <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800">
//         Continue
//       </Button>
//       <Button variant="outline" className="w-full">
//         Login with Google
//       </Button>
//     </div>
//     </div>
//   )
// }

// export default ForgotPassword


// // src/pages/ForgotPassword.tsx
// import React, { useState } from "react";
// import CommanForm from "@/components/common/CommanForm";
// import { forgotPasswordFormControls } from "@/components/config";
// import { useForgotPasswordMutation, useResendOtpMutation } from "@/api/authApi";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { InputOTPPattern } from "@/components/common/YourOtp";

// const ForgotPassword: React.FC = () => {
//   const [formData, setFormData] = useState({ email: "" });
//   const [otp, setOtp] = useState("");
//   const [sendOtp] = useForgotPasswordMutation();
//   const [resendOtp] = useResendOtpMutation();
//   const navigate = useNavigate();

//   async function onSubmit(e?: any) {
//     e?.preventDefault();
//     try {
//       const res = await sendOtp(formData).unwrap();
//       alert(res?.message || "OTP sent");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Failed to send OTP");
//     }
//   }

//   async function handleContinue() {
//     // Since there's no verifyOtp endpoint, we can navigate directly or handle differently
//     // For now, assume OTP is verified if entered, and navigate to reset password
//     if (otp.length === 6) { // Assuming OTP is 6 digits
//       navigate("/reset-password", { state: { email: formData.email, otp } });
//     } else {
//       alert("Please enter a valid OTP");
//     }
//   }

//   async function handleResendOtp() {
//     try {
//       const res = await resendOtp({ email: formData.email }).unwrap();
//       alert(res?.message || "New OTP sent");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Resend OTP failed");
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-md space-y-6 w-full bg-white p-10 rounded-2xl border border-gray-300">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
//           <p className="mt-2">
//             Remember your password?
//             <Link className="font-medium ml-2 text-primary hover:underline" to="/login">
//               Login
//             </Link>
//           </p>
//         </div>

//         <CommanForm formControls={forgotPasswordFormControls} buttonText="Send OTP" formData={formData} setFormData={setFormData} onSubmit={onSubmit} />

//         {/* OTP FIELD */}
//         <div className="flex items-center gap-3 mt-4">
//           <div className="flex-1">
//             <p className="text-sm font-semibold">Enter OTP</p>
//             <InputOTPPattern value={otp} onChange={setOtp} />
//           </div>

//           <Button variant="outline" onClick={handleResendOtp}>
//             Resend OTP
//           </Button>
//         </div>

//         <Button className="w-full bg-black text-white mt-4" onClick={handleContinue}>
//           Continue
//         </Button>

//         <Button variant="outline" className="w-full">
//           Login with Google
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


// import React, { useState } from "react";
// import CommanForm from "@/components/common/CommanForm";
// import { forgotPasswordFormControls } from "@/components/config";
// import { useForgotPasswordMutation, useVerifyOtpMutation, useResendOtpMutation } from "@/api/authApi";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { InputOTPPattern } from "@/components/common/YourOtp";

// const ForgotPassword: React.FC = () => {
//   const [formData, setFormData] = useState({ email: "" });
//   const [otp, setOtp] = useState("");
//   const [sendOtp] = useForgotPasswordMutation();
//   const [verifyOtp] = useVerifyOtpMutation(); // ✅ Use this instead of loginWithOtp
//   const [resendOtp] = useResendOtpMutation();
//   const [otpSent, setOtpSent] = useState(false);
//   const navigate = useNavigate();

//   // Send OTP
//   async function onSubmit(e?: any) {
//     e?.preventDefault();
//     try {
//       const res = await sendOtp(formData).unwrap();
//       alert(res?.message || "OTP sent");
//       setOtpSent(true); // Show OTP field
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Failed to send OTP");
//     }
//   }

//   // Verify OTP → auto login
//   async function handleContinue() {
//     if (otp.length !== 6) {
//       alert("Please enter a valid 6-digit OTP");
//       return;
//     }

//     try {
//       const res = await verifyOtp({ email: formData.email, otp }).unwrap();

//       // Save token & user info
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("user", JSON.stringify(res.user));

//       alert(res?.message || "Login successful");

//       // Redirect to home page
//       navigate("/home");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "OTP verification failed");
//     }
//   }

//   // Resend OTP
//   async function handleResendOtp() {
//     try {
//       const res = await resendOtp({ email: formData.email }).unwrap();
//       alert(res?.message || "New OTP sent");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Resend OTP failed");
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-md space-y-6 w-full bg-white p-10 rounded-2xl border border-gray-300">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
//           <p className="mt-2">
//             Remember your password?
//             <Link className="font-medium ml-2 text-primary hover:underline" to="/login">
//               Login
//             </Link>
//           </p>
//         </div>

//         {/* Email Input */}
//         {!otpSent && (
//           <CommanForm
//             formControls={forgotPasswordFormControls}
//             buttonText="Send OTP"
//             formData={formData}
//             setFormData={setFormData}
//             onSubmit={onSubmit}
//           />
//         )}

//         {/* OTP Input */}
//         {otpSent && (
//           <div className="flex flex-col gap-4">
//             <div className="flex items-center gap-3">
//               <div className="flex-1">
//                 <p className="text-sm font-semibold">Enter OTP</p>
//                 <InputOTPPattern value={otp} onChange={setOtp} />
//               </div>

//               <Button variant="outline" onClick={handleResendOtp}>
//                 Resend OTP
//               </Button>
//             </div>

//             <Button className="w-full bg-black text-white" onClick={handleContinue}>
//               Continue
//             </Button>
//           </div>
//         )}

//         <Button variant="outline" className="w-full">
//           Login with Google
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;




import React, { useState } from "react";
import CommanForm from "@/components/common/CommanForm";
import { forgotPasswordFormControls } from "@/components/config";
import { useForgotPasswordMutation, useVerifyOtpMutation, useResendOtpMutation } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTPPattern } from "@/components/common/YourOtp";

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [otp, setOtp] = useState("");
  const [sendOtp] = useForgotPasswordMutation();
  const [verifyOtp] = useVerifyOtpMutation(); // ✅ Use this instead of loginWithOtp
  const [resendOtp] = useResendOtpMutation();
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Send OTP
  async function onSubmit(e?: any) {
    e?.preventDefault();
    try {
      const res = await sendOtp(formData).unwrap();
      alert(res?.message || "OTP sent");
      setOtpSent(true); // Show OTP field
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to send OTP");
    }
  }

  // Verify OTP → auto login
  async function handleContinue() {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await verifyOtp({ email: formData.email, otp }).unwrap();

      // Save token & user info
      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("user", JSON.stringify(res.user));

      alert(res?.message || "Login successful");

      // Redirect to home page
      navigate("/");
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "OTP verification failed");
    }
  }

  // Resend OTP
  async function handleResendOtp() {
    try {
      const res = await resendOtp({ email: formData.email }).unwrap();
      alert(res?.message || "New OTP sent");
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Resend OTP failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md space-y-6 w-full bg-white p-10 rounded-2xl border border-gray-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
          <p className="mt-2">
            Remember your password?
            <Link className="font-medium ml-2 text-primary hover:underline" to="/login">
              Login
            </Link>
          </p>
        </div>

        {/* Email Input */}
        {!otpSent && (
          <CommanForm
            formControls={forgotPasswordFormControls}
            buttonText="Send OTP"
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
        )}

        {/* OTP Input */}
        {otpSent && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold">Enter OTP</p>
                <InputOTPPattern value={otp} onChange={setOtp} />
              </div>

              <Button variant="outline" onClick={handleResendOtp}>
                Resend OTP
              </Button>
            </div>

            <Button className="w-full bg-black text-white" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        )}

        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
