export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text"
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password"
  }
];


export const loginFormControls = [
    {
        name:"email",
        label:"Email",
        placeholder:"Enter your Email",
        componentType:"input",
        type:"email"
    },
    {
        name:"password",
        label:"Password",
        common:"OR",
        label1:"Reset Pasword",
        label2:"Forgot Password",
        placeholder:"Enter your password",
        componentType:"input",
        type:"password"
    },
]



export const forgotPasswordFormControls = [
    {
        name:"email",
        label:"Email",
        placeholder:"Enter your Email",
        componentType:"input",
        type:"email"
    },
    // {
    //     name:"OTP",
    //     label:"Enter OTP",
    //     placeholder:"Enter your OTP",
    //     componentType:"input",
    //     type:"otp"
    // },
]


export const resetFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email"
  },
  {
    name: "password",
    label: "Reset Password",
    placeholder: "Enter your new password",
    componentType: "input",
    type: "password"
  }
];
