import React from 'react'
import CommanForm from '@/components/common/CommanForm'
import { loginFormControls } from '../components/config/index'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'



const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  function onSubmit() {

  }
  const [formData, setFormData] = useState(initialState)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='max-w-md space-y-6 w-full bg-white p-10 rounded-b-2xl rounded-t-2xl border border-gray-300'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sigin in to your account</h1>
        <p className='mt-2'>Don't have an account
          <Link className='font-medium ml-2 text-primary hover:underline' to='/register'>
            SignUp
          </Link>
        </p>
      </div>
      <CommanForm
        formControls={loginFormControls}
        buttonText={'Login'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <Button variant="outline" className="w-full">
        Login with Google
      </Button>
    </div>
    </div>

  )
}

export default Login
