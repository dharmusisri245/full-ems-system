
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Organogram from '@/pages/Organogram'
import ApplicationPolicies from '@/pages/ApplicationPolicies'
import Polices from '@/pages/Polices'
import DfccilDirectory from '@/pages/DfccilDirectory'
import ManageApplications from '@/pages/ManageApplications'
import Home from '@/pages/Home'
import AdminDashboard from '../Dashboard/AdminDashboard/AdminCompo'
import UserManagment from '../Dashboard/AdminDashboard/UserManagment'
import PartyEventCatering from '@/pages/cateringPages/subCatering/PartyEventCatering'
import StreetFoodStallCatering from '@/pages/cateringPages/subCatering/StreetFoodStallCatering'
import SpacialThemeCatering from '@/pages/cateringPages/subCatering/SpacialThemeCatering'
import CorporateCatering from '@/pages/cateringPages/subCatering/CorporateCatering'
import WeddingCatering from '@/pages/cateringPages/subCatering/WeddingCatering'
import BusinessRegister from '@/Auth/BusinessRegister'
import ClientPayment from '@/Auth/ClientPayment'
import ProfileSetting from '@/Auth/ProfileSetting'
const Approute:React.FC = () => {
  return ( 
       <main className=" overflow-auto bg-gray-50 w-full h-full" style={{ overflow: 'auto' }}>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/party-event-catering'element={<PartyEventCatering/>}/>
                <Route path='/streetfood-catering' element={<StreetFoodStallCatering/>}/>
                <Route path='/spacial-theme-catering' element={<SpacialThemeCatering/>}/>
                <Route path='/corporate' element={<CorporateCatering/>}/>
                <Route path='/wedding-catering' element={<WeddingCatering/>}/> 
                <Route path="/user-management" element={<UserManagment/>} />
                <Route path="/register-Buisness" element={<BusinessRegister/>} />
                 <Route path="/payment-details" element={<ClientPayment/>} />
                <Route path="/profile-setting" element={<ProfileSetting/>} />
                <Route path="/application-policies" element={<ApplicationPolicies />} />
                <Route path="/policies" element={<Polices/>} />
                <Route path="/Admin-Dashboard" element={<AdminDashboard/>} />
                <Route path="/dfccil-directory" element={<DfccilDirectory />} />
                <Route path="/manage-applications" element={<ManageApplications />} />
                {/* <Route path="/products" element={<Product />} />
                <Route path="/products/:id" element={<ProductDetailPage />} /> */}
              </Routes>
        </main>      
  )
}
export default Approute



