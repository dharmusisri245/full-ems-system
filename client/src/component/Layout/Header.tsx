import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
// import  logo  from '../../assets/logo (2).png'
interface HeaderProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isCollapsed }) => {
  const isAuth = false;
  return (
    <div className="w-full  bg-[#290c29ca] border-b border-gray-300">
      {/* main header container */}
      <div
        className="flex items-center justify-between gap-3 sm:gap-5 px-2 py-2  bg-[#0a010abc]
        overflow-x-auto whitespace-nowrap hide-scrollbar"
      >
        {/* Left side logo */}
        <div className="flex justify-center gap-2 flex-shrink-0">
          {/* <img src={logo} sizes='30' alt="EMS Logo" className="h-full w-full sm:h-10 sm:w-10 object-contain text-white" /> */}
          <div className='flex flex-col' >
              <span className="text-2xl font-extrabold text-center text-white sm:text-lg">EMS</span>
          {/* <p className='text-white font-semibold'>Event || Management || System</p> */}
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col flex-shrink-0">
          <span className="text-xs sm:text-sm text-white  -700">Delhi, India</span>
          <span className="font-bold text-xs sm:text-sm text-white">Location Update</span>
        </div>

        {/* Search bar (flexible width) */}
        <div className="flex items-center flex-grow max-w-[800px] min-w-[300px] bg-white rounded-b-lg rounded-t-lg">
          <Select>
            <SelectTrigger className="w-[70px] rounded-l-md bg-amber-300">
              <SelectValue placeholder="ALL" className="font-bold text-white" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lawn">Lawn</SelectItem>
              <SelectItem value="Hotel">Hotel</SelectItem>
              <SelectItem value="Tent">Tent</SelectItem>
              <SelectItem value="Sound-System">Sound-System</SelectItem>
              <SelectItem value="Catering">Catering</SelectItem>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Vehicle">Vehicle</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Search EMS.in" className="rounded-none flex-1 h-9" />
          <Button className="bg-orange-400 rounded-l-none hover:bg-amber-500 h-9">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Language (EN) */}
        <div className="flex-shrink">
          <Select>
            <SelectTrigger className="w-[68px] bg-white/100">
              <SelectValue placeholder="EN"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="German">German</SelectItem>
              <SelectItem value="French">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Account */}
        <div className="flex flex-col text-center flex-shrink-0">
          <p className="text-xs sm:text-sm text-white">Hello, 
            <Link to="/login" className='hover:underline hover:size-2'>
            SignIn
            </Link>
            </p>
          <span className="font-bold text-xs sm:text-sm text-white">Account & Lists</span>
        </div>

        {/* Returns & Booking */}
        <div className="flex flex-col text-center flex-shrink-0 whitespace-nowrap">
          <p className="text-xs sm:text-sm text-white">Returns</p>
          <p className="font-semibold text-xs sm:text-sm text-white">& Booking</p>
        </div>

        {/* Your Booking */}
        <div className="flex items-center flex-shrink-0">
          <span className="text-xs sm:text-sm  text-white">Your Booking</span>
        </div>
      </div>

    </div>
  )
}

export default Header



// import React from 'react'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Input } from '@/components/ui/input'
// import { Search } from "lucide-react"
// import { Button } from '@/components/ui/button'
// import logo from '../../assets/logo (2).png'

// interface HeaderProps {
//   toggleSidebar: () => void;
//   isCollapsed: boolean;
// }

// const Header: React.FC<HeaderProps> = () => {
//   return (
//     <div className="w-full bg-[#290c29ca] border-b border-gray-300">
//       {/* main header container */}
//       <div
//         className="flex items-center justify-between gap-3 sm:gap-5 px-3 py-2 bg-[#0a010abc]
//         overflow-x-auto whitespace-nowrap hide-scrollbar"
//       >
//         {/* 🔹 Left side logo */}
//         <div className="flex items-center gap-2 flex-shrink-0">
//           <div className="h-12 w-12 flex items-center justify-center bg-transparent">
//             <img
//               src={logo}
//               alt="EMS Logo"
//               className="h-full w-full object-contain"

//         {/* 🔹 Location */}
//         <div className="flex flex-col flex-shrink-0">
//           <span className="text-xs sm:text-sm text-gray-200">Delhi, India</span>
//           <span className="font-bold text-xs sm:text-sm text-white">Location Update</span>
//         </div>

//         {/* 🔹 Search bar */}
//         <div className="flex items-center flex-grow max-w-[800px] min-w-[280px] bg-white rounded-lg overflow-hidden">
//           <Select>
//             <SelectTrigger className="w-[70px] bg-amber-300 font-semibold text-black border-none">
//               <SelectValue placeholder="ALL" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Lawn">Lawn</SelectItem>
//               <SelectItem value="Hotel">Hotel</SelectItem>
//               <SelectItem value="Tent">Tent</SelectItem>
//               <SelectItem value="Sound-System">Sound-System</SelectItem>
//               <SelectItem value="Catering">Catering</SelectItem>
//               <SelectItem value="Light">Light</SelectItem>
//               <SelectItem value="Vehicle">Vehicle</SelectItem>
//             </SelectContent>
//           </Select>

//           <Input
//             placeholder="Search EMS.in"
//             className="rounded-none flex-1 h-9 border-none focus-visible:ring-0"
//           />
//           <Button className="bg-orange-400 hover:bg-amber-500 h-9 rounded-none rounded-r-md">
//             <Search className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* 🔹 Language */}
//         <div className="flex-shrink-0">
//           <Select>
//             <SelectTrigger className="w-[65px] bg-white text-black">
//               <SelectValue placeholder="EN" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Hindi">Hindi</SelectItem>
//               <SelectItem value="English">English</SelectItem>
//               <SelectItem value="German">German</SelectItem>
//               <SelectItem value="French">French</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* 🔹 Account */}
//         <div className="flex flex-col text-center flex-shrink-0 text-white">
//           <p className="text-xs sm:text-sm">Hello, sign in</p>
//           <span className="font-bold text-xs sm:text-sm">Account & Lists</span>
//         </div>

//         {/* 🔹 Returns & Booking */}
//         <div className="flex flex-col text-center flex-shrink-0 text-white">
//           <p className="text-xs sm:text-sm">Returns</p>
//           <p className="font-semibold text-xs sm:text-sm">& Booking</p>
//         </div>

//         {/* 🔹 Your Booking */}
//         <div className="flex items-center flex-shrink-0">
//           <span className="text-xs sm:text-sm text-white">Your Booking</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Header
