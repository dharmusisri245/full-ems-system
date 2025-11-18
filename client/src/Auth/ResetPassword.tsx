import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { InputOTPPattern } from '../components/common/YourOtp'
import CommanForm from '../components/common/CommanForm'
import { resetFormControls } from '../components/config/index'

const initialState = {
  email: '',
  password:""
}

const ResetPassword = () => {
  function onSubmit() {

  }
  const [formData, setFormData] = useState(initialState)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='max-w-md space-y-6 bg-white w-full  p-10 rounded-b-2xl rounded-t-2xl border border-gray-300'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Get new EMS Password</h1>
        <p className='mt-2'>Remember your password?
          <Link className='font-medium ml-2 text-primary hover:underline' to='/login'>
            Login
          </Link>
        </p>
      </div>
      
      <CommanForm
        formControls={resetFormControls}
        buttonText={'Send OTP'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className='flex gap-2 items-center mt-6'>
        <div className='w-1/'>
          <p className='text-sm font-semibold'>Enter OTP</p>
          <InputOTPPattern/>
        </div>
        <Button variant="outline" className="w-1/">
          Resend OTP
        </Button>
      </div>
      <Button variant="outline" className="w-full">
        Continue
      </Button>
    </div>
    </div>
  )
}

export default ResetPassword


