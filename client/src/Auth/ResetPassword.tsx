// // import React from 'react'
// // import { useState } from 'react'
// // import { Link } from 'react-router-dom'
// // import { Button } from '../components/ui/button'
// // import { Input } from '../components/ui/input'
// // import { Label } from '../components/ui/label'
// // import { InputOTPPattern } from '../components/common/YourOtp'
// // import CommanForm from '../components/common/CommanForm'
// // import { resetFormControls } from '../components/config/index'

// // const initialState = {
// //   email: '',
// //   password:""
// // }

// // const ResetPassword = () => {
// //   function onSubmit() {

// //   }
// //   const [formData, setFormData] = useState(initialState)
// //   return (
// //     <div className='flex justify-center items-center min-h-screen'>
// //       <div className='max-w-md space-y-6 bg-white w-full  p-10 rounded-b-2xl rounded-t-2xl border border-gray-300'>
// //       <div className='text-center'>
// //         <h1 className='text-3xl font-bold tracking-tight text-foreground'>Get new EMS Password</h1>
// //         <p className='mt-2'>Remember your password?
// //           <Link className='font-medium ml-2 text-primary hover:underline' to='/login'>
// //             Login
// //           </Link>
// //         </p>
// //       </div>
      
// //       <CommanForm
// //         formControls={resetFormControls}
// //         buttonText={'Send OTP'}
// //         formData={formData}
// //         setFormData={setFormData}
// //         onSubmit={onSubmit}
// //       />
// //       <div className='flex gap-2 items-center mt-6'>
// //         <div className='w-1/'>
// //           <p className='text-sm font-semibold'>Enter OTP</p>
// //           <InputOTPPattern/>
// //         </div>
// //         <Button variant="outline" className="w-1/">
// //           Resend OTP
// //         </Button>
// //       </div>
// //       <Button variant="outline" className="w-full">
// //         Continue
// //       </Button>
// //     </div>
// //     </div>
// //   )
// // }

// // export default ResetPassword

// // import { useState } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { InputOTPPattern } from "@/components/common/YourOtp";
// // import CommanForm from "@/components/common/CommanForm";
// // import { resetFormControls } from "@/components/config/index";

// // // import {
// // //   forgotPasswordApi,
// // //   resendOtpApi,
// // //   resetPasswordApi,
// // // } from "@/api/auth.api";

// // const ResetPassword = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const emailFromState = location.state?.email || "";

// //   const [formData, setFormData] = useState({
// //     email: emailFromState,
// //     password: "",
// //   });

// //   const [otp, setOtp] = useState("");

// //   // --------------------------
// //   // SEND OTP HANDLER
// //   // --------------------------
// //   async function sendOtpHandler(e: any) {
// //     e.preventDefault();
// //     try {
// //       const res = await forgotPasswordApi({ email: formData.email });
// //       alert(res.data.message || "OTP sent");
// //     } catch (err: any) {
// //       alert(err.response?.data?.message || "Failed to send OTP");
// //     }
// //   }

// //   // --------------------------
// //   // RESEND OTP HANDLER
// //   // --------------------------
// //   async function resendOtpHandler() {
// //     try {
// //       const res = await resendOtpApi({ email: formData.email });
// //       alert(res.data.message || "New OTP sent");
// //     } catch (err: any) {
// //       alert(err.response?.data?.message || "Failed to resend OTP");
// //     }
// //   }

// //   // --------------------------
// //   // RESET PASSWORD HANDLER
// //   // --------------------------
// //   async function onSubmit() {
// //     try {
// //       if (!otp) {
// //         alert("Please enter OTP");
// //         return;
// //       }

// //       const res = await resetPasswordApi({
// //         email: formData.email,
// //         otp,
// //         newPassword: formData.password,
// //       });

// //       alert(res.data.message || "Password reset successful");
// //       navigate("/login");
// //     } catch (err: any) {
// //       alert(err.response?.data?.message || "Password reset failed");
// //     }
// //   }

// //   function handleOtpChange(value: string) {
// //     setOtp(value);
// //   }

// //   return (
// //     <div className="flex justify-center items-center min-h-screen">
// //       <div className="max-w-md space-y-6 bg-white w-full p-10 rounded-b-2xl rounded-t-2xl border border-gray-300">
        
// //         {/* Heading */}
// //         <div className="text-center">
// //           <h1 className="text-3xl font-bold tracking-tight text-foreground">
// //             Get new EMS Password
// //           </h1>

// //           <p className="mt-2">
// //             Remember your password?
// //             <Link className="font-medium ml-2 text-primary hover:underline" to="/login">
// //               Login
// //             </Link>
// //           </p>
// //         </div>

// //         {/* Email + Password Form */}
// //         <CommanForm
// //           formControls={resetFormControls}
// //           buttonText={"Send OTP"}
// //           formData={formData}
// //           setFormData={setFormData}
// //           onSubmit={sendOtpHandler}
// //         />

// //         {/* OTP Input */}
// //         <div className="flex gap-2 items-center mt-6">
// //           <div className="w-3/4">
// //             <p className="text-sm font-semibold mb-1">Enter OTP</p>
// //             <InputOTPPattern value={otp} onChange={handleOtpChange} />
// //           </div>

// //           <Button variant="outline" className="w-1/4" onClick={resendOtpHandler}>
// //             Resend OTP
// //           </Button>
// //         </div>

// //         {/* Continue Button */}
// //         <Button
// //           variant="outline"
// //           className="w-full bg-black text-white hover:bg-gray-800"
// //           onClick={onSubmit}
// //         >
// //           Continue
// //         </Button>

// //       </div>
// //     </div>
// //   );
// // };

// // export default ResetPassword;



// // import { useState } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { InputOTPPattern } from "@/components/common/YourOtp";
// // import CommanForm from "@/components/common/CommanForm";
// // import { resetFormControls } from "@/components/config/index";

// // // import {
// // //   forgotPasswordApi,
// // //   resendOtpApi,
// // //   resetPasswordApi,
// // // } from "@/api/auth.api";

// // const ResetPassword = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const emailFromState = location.state?.email || "";

// //   const [formData, setFormData] = useState({
// //     email: emailFromState,
// //     password: "",
// //   });

// //   const [otp, setOtp] = useState("");

// //   // --------------------------
// //   // SEND OTP HANDLER
// //   // --------------------------
// //   async function sendOtpHandler(e: any) {
// //     e.preventDefault();
// //     try {
// //       const res = await forgotPasswordApi({ email: formData.email });
// //       alert(res.data.message || "OTP sent");
// //     } catch (err: any) {
// //       alert(err.response?.data?.message || "Failed to send OTP");
// //     }
// //   }

// //   // --------------------------
// //   // RESEND OTP HANDLER
// //   // --------------------------
// //   async function resendOtpHandler() {
// //     try {
// //       const res = await resendOtpApi({ email: formData.email });
// //       alert(res.data.message || "New OTP sent");
// //     } catch (err: any) {
// //       alert(err.response?.data?.message || "Failed to resend OTP");
// //     }
// //   }

// //   // --------------------------
// //   // VERIFY + RESET PASSWORD HANDLER
// //   // --------------------------
// //   async function onSubmit() {
// //     try {
// //       if (!otp) {
// //         alert("Please enter OTP");
// //         return;
// //       }

// //       const res = await resetPasswordApi({
// //         email: formData.email,
// //         otp,
// //         newPassword: formData.password,
// //       });

// //       alert(res.data.message || "Password reset successful");
// //       navigate("/login");
// //     } catch (err: any) {
// //       alert(err.response?.data?.message || "Password reset failed");
// //     }
// //   }

// //   function handleOtpChange(value: string) {
// //     setOtp(value);
// //   }

// //   // --------------------------------------------------
// //   // JSX RETURN
// //   // --------------------------------------------------
// //   return (
// //     <div className="flex justify-center items-center min-h-screen">
// //       <div className="max-w-md space-y-6 bg-white w-full p-10 rounded-xl border border-gray-300">

// //         {/* Heading */}
// //         <div className="text-center">
// //           <h1 className="text-3xl font-bold tracking-tight text-foreground">
// //             Get new EMS Password
// //           </h1>

// //           <p className="mt-2">
// //             Remember your password?
// //             <Link className="font-medium ml-2 text-primary hover:underline" to="/login">
// //               Login
// //             </Link>
// //           </p>
// //         </div>

// //         {/* Email Input Only */}
// //         <CommanForm
// //           formControls={[resetFormControls[0]]}
// //           formData={formData}
// //           setFormData={setFormData}
// //           onSubmit={() => {}}
// //           buttonText={""}
// //         />

// //         {/* SEND + RESEND BUTTONS */}
// //         <div className="flex gap-3">
// //           <Button className="w-1/2" onClick={sendOtpHandler}>
// //             Send OTP
// //           </Button>
// //           <Button variant="outline" className="w-1/2" onClick={resendOtpHandler}>
// //             Resend OTP
// //           </Button>
// //         </div>

// //         {/* OTP + VERIFY */}
// //         <div>
// //           <p className="text-sm font-semibold mb-1">Enter OTP</p>

// //           <div className="flex items-center gap-3">
// //             <div className="w-2/3">
// //               <InputOTPPattern value={otp} onChange={handleOtpChange} />
// //             </div>

// //             <Button
// //               className="w-1/3 bg-black text-white"
// //               onClick={onSubmit}
// //             >
// //               Verify
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Password Field */}
// //         <CommanForm
// //           formControls={[resetFormControls[1]]}
// //           formData={formData}
// //           setFormData={setFormData}
// //           onSubmit={onSubmit}
// //           buttonText="Continue"
// //         />

// //       </div>
// //     </div>
// //   );
// // };

// // export default ResetPassword;


// // src/pages/ResetPassword.tsx
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { InputOTPPattern } from "@/components/common/YourOtp";
// import CommanForm from "@/components/common/CommanForm";
// import { resetFormControls } from "@/components/config/index";
// import { useForgotPasswordMutation, useResendOtpMutation, useVerifyOtpMutation, useResetPasswordMutation } from "@/api/authApi";

// const ResetPassword: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const emailFromState = (location.state as any)?.email || "";

//   const [formData, setFormData] = useState({ email: emailFromState, password: "" });
//   const [otp, setOtp] = useState("");
//   const [isOtpVerified, setIsOtpVerified] = useState(false);

//   const [forgotPassword] = useForgotPasswordMutation();
//   const [resendOtp] = useResendOtpMutation();
//   const [verifyOtp] = useVerifyOtpMutation();
//   const [resetPassword] = useResetPasswordMutation();

//   useEffect(() => {
//     if (emailFromState) setFormData((s) => ({ ...s, email: emailFromState }));
//   }, [emailFromState]);

//   async function sendOtpHandler(e?: any) {
//     e?.preventDefault();
//     try {
//       const res = await forgotPassword({ email: formData.email }).unwrap();
//       alert(res?.message || "OTP sent");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Failed to send OTP");
//     }
//   }

//   async function resendOtpHandler() {
//     try {
//       const res = await resendOtp({ email: formData.email }).unwrap();
//       alert(res?.message || "New OTP sent");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Failed to resend OTP");
//     }
//   }

//   async function verifyHandler() {
//     try {
//       const res = await verifyOtp({ email: formData.email, otp }).unwrap();
//       alert(res?.message || "OTP verified — now set new password");
//       setIsOtpVerified(true);
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "OTP verification failed");
//     }
//   }

//   async function handleResetPassword() {
//     try {
//       if (!isOtpVerified) return alert("Please verify OTP first");
//       const res = await resetPassword({ email: formData.email, otp, newPassword: formData.password }).unwrap();
//       alert(res?.message || "Password reset successful");
//       navigate("/login");
//     } catch (err: any) {
//       alert(err?.data?.message || err?.message || "Password reset failed");
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="max-w-md space-y-6 bg-white w-full p-10 rounded-xl border border-gray-300">
//         {/* Heading */}
//         <div className="text-center">
//           <h1 className="text-3xl font-bold tracking-tight text-foreground">Get new EMS Password</h1>
//           <p className="mt-2">
//             Remember your password?
//             <Link className="font-medium ml-2 text-primary hover:underline" to="/login">Login</Link>
//           </p>
//         </div>

//         {/* Email Input Only */}
//         <CommanForm formControls={[resetFormControls[0]]} formData={formData} setFormData={setFormData} onSubmit={() => {}} buttonText="" showButton={false} />

//         {/* SEND + RESEND BUTTONS */}
//         <div className="flex gap-3">
//           <Button className="w-1/2" onClick={sendOtpHandler}>Send OTP</Button>
//           <Button variant="outline" className="w-1/2" onClick={resendOtpHandler}>Resend OTP</Button>
//         </div>

//         {/* OTP + VERIFY */}
//         <div>
//           <p className="text-sm font-semibold mb-1">Enter OTP</p>
//           <div className="flex items-center gap-3">
//             <div className="w-2/3">
//               <InputOTPPattern value={otp} onChange={setOtp} />
//             </div>
//             <Button className="w-1/3 bg-black text-white" onClick={verifyHandler}>Verify</Button>
//           </div>
//         </div>

//         {/* Password Field (NO Submit inside CommanForm) */}
//         <CommanForm formControls={[resetFormControls[1]]} formData={formData} setFormData={setFormData} onSubmit={() => {}} buttonText="" showButton={false} />

//         <Button className="w-full bg-blue-600 text-white" onClick={handleResetPassword}>Reset Password</Button>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
