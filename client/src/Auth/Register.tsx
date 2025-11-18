import CommanForm from "../components/common/CommanForm"
import { registerFormControls } from '../components/config/index'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const initialState ={
  userName:"",
  email:'',
  password:''
}
const Register = () => {
  function onSubmit(){

  }
  const [formData ,setFormData] = useState(initialState)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='max-w-md space-y-6 w-full bg-white p-10 rounded-b-2xl rounded-t-2xl border border-gray-300'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2'>Already have an account
          <Link className='font-medium ml-2 text-primary hover:underline' to='/login'>
          Login
          </Link>
        </p>
      </div>
      <CommanForm
      formControls = {registerFormControls}
      buttonText = {'Sign Up'}
      formData ={formData}
      setFormData={setFormData}
      onSubmit ={onSubmit}
      />
    </div>
    </div>
    
  )
}

export default Register
