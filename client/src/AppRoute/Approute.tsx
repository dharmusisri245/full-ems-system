// import { Route } from 'lucide-react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OurLeadership from '@/pages/OurLeadership'
import Organogram from '@/pages/Organogram'
import ApplicationPolicies from '@/pages/ApplicationPolicies'
import Polices from '@/pages/Polices'
import Maganize from '@/pages/Maganize'
import DfccilDirectory from '@/pages/DfccilDirectory'
import ManageApplications from '@/pages/ManageApplications'
import Home from '@/pages/Home'
import Login from '../Auth/Login'
import Register from '@/Auth/Register'
import ForgotPassword from '@/Auth/ForgotPassword'
import ResetPassword from '@/Auth/ResetPassword'
const Approute:React.FC = () => {
  return (
    
       <main className=" overflow-auto bg-gray-50 w-full h-full" style={{ overflow: 'auto' }}>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login'element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/>
                <Route path="/our-leadership" element={<OurLeadership />} />
                <Route path="/organogram" element={<Organogram/>} />
                <Route path="/application-policies" element={<ApplicationPolicies />} />
                <Route path="/policies" element={<Polices/>} />
                <Route path="/maganize" element={<Maganize />} />
                <Route path="/dfccil-directory" element={<DfccilDirectory />} />
                <Route path="/manage-applications" element={<ManageApplications />} />
              </Routes>
        </main>      

  )
}
export default Approute



