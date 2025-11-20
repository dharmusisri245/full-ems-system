// export const registerFormControls = [
//   {
//     name: "userName",
//     label: "User Name",
//     placeholder: "Enter your user name",
//     componentType: "input",
//     type: "text"
//   },
//   {
//     name: "email",
//     label: "Email",
//     placeholder: "Enter your Email",
//     componentType: "input",
//     type: "email"
//   },
//   {
//     name: "password",
//     label: "Password",
//     placeholder: "Enter your password",
//     componentType: "input",
//     type: "password"
//   }
// ];


// export const loginFormControls = [
//     {
//         name:"email",
//         label:"Email",
//         placeholder:"Enter your Email",
//         componentType:"input",
//         type:"email"
//     },
//     {
//         name:"password",
//         label:"Password",
//         common:"OR",
//         label1:"Reset Pasword",
//         label2:"Forgot Password",
//         placeholder:"Enter your password",
//         componentType:"input",
//         type:"password"
//     },
// ]



// export const forgotPasswordFormControls = [
//     {
//         name:"email",
//         label:"Email",
//         placeholder:"Enter your Email",
//         componentType:"input",
//         type:"email"
//     },

// ]


// export const resetFormControls = [
//   {
//     name: "email",
//     label: "Email",
//     placeholder: "Enter your Email",
//     componentType: "input",
//     type: "email"
//   },
//   {
//     name: "password",
//     label: "Reset Password",
//     placeholder: "Enter your new password",
//     componentType: "input",
//     type: "password"
//   }
// ];
















// src/components/config/index.ts

export const registerFormControls = [
  {
    name: "name",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
    id: "register-username",
    label1: "",
    label2: "",
    common: null,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email",
    id: "register-email",
    label1: "",
    label2: "",
    common: null,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    id: "register-password",
    label1: "",
    label2: "",
    common: null,
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email",
    id: "login-email",
    label1: "",
    label2: "",
    common: null,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    id: "login-password",

    // your special fields
    // common: "OR",
    label1: "Reset Password",
    label2: "Forgot Password",
  },
];

export const forgotPasswordFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email",
    id: "forgot-email",
    label1: "",
    label2: "",
    common: null,
  },
];

export const resetFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email",
    id: "reset-email",
    label1: "",
    label2: "",
    common: null,
  },
  {
    name: "password",
    label: "Reset Password",
    placeholder: "Enter your new password",
    componentType: "input",
    type: "password",
    id: "reset-password",
    label1: "",
    label2: "",
    common: null,
  },
];
