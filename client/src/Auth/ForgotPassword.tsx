
import React from 'react'
import CommanForm from '../components/common/CommanForm'
import { forgotPasswordFormControls } from '../components/config/index'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { InputOTPPattern } from '../components/common/YourOtp'


const initialState = {
  email: ''
}

const ForgotPassword = () => {
  function onSubmit() {

  }
  const [formData, setFormData] = useState(initialState)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='max-w-md space-y-6 w-full bg-white p-10 rounded-b-2xl rounded-t-2xl border border-gray-300'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Forgot Password</h1>
        <p className='mt-2'>Remember your password?
          <Link className='font-medium ml-2 text-primary hover:underline' to='/login'>
            Login
          </Link>
        </p>
      </div>
      <CommanForm
        formControls={forgotPasswordFormControls}
        buttonText={'Send OTP'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className='flex gap-2 items-center'>
        <div className='w-1/'>
          <p className='text-sm font-semibold'>Enter OTP</p>
          <InputOTPPattern/>
        </div>
        <Button variant="outline" className="w-1/">
          Resend OTP
        </Button>
      </div>
      <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800">
        Continue
      </Button>
      <Button variant="outline" className="w-full">
        Login with Google
      </Button>
    </div>
    </div>
  )
}

export default ForgotPassword


