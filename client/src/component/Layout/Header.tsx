import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { logout } from "../../redux/slices/authSlices";
import AdvancedMap from "@/location/AdvanceMap";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  const user = useAppSelector((state) => state.auth.user); // reactive auth state
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t,i18n} = useTranslation()
  const [open, setOpen] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [productInput, setProductInput] = useState("");
  const [showMap, setShowMap] = useState(false);

  // logout handler
  const handleLogout = () => {
    dispatch(logout()); // clear Redux + token
    navigate("/login");           // navigate to login
  };

  const handleLocationSearch = () => {
    if (locationInput.trim() !== "") {
      setShowMap(true);
    }
  };

  const handleProductSearch = () => {
    console.log('search product:', productInput);
  };

  return (
    <div className="w-full bg-[#290c29ca] border-b border-gray-300">
      <div
        className="flex items-center justify-between gap-3 sm:gap-5 px-2 py-2 bg-[#0a010abc]
        overflow-x-auto whitespace-nowrap hide-scrollbar"
      >
        {/* Logo */}
        <div className="flex justify-center gap-2 flex-shrink-0">
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-center text-white sm:text-lg">EMS</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col flex-shrink-0">
          <div className="flex text-center justify-center items-center">
            <label className="text-white text-sm  pr-1">Location</label>
            <div className=" flex relative w-full">
              <MapPin className=" size-5  absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-8 w-full sm:w-40 md:w-50"
                placeholder="Enter your location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLocationSearch()}
              />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center flex-grow max-w-[800px] min-w-[300px] bg-white rounded-lg">
          <Select>
            <SelectTrigger className="w-[70px] rounded-l-md bg-amber-300">
              <SelectValue placeholder="ALL" />
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

          <Input placeholder="Search EMS.in" className="rounded-none flex-1 h-9" value={productInput} onChange={(e) => setProductInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleProductSearch()} />
          <Button className="bg-orange-400 rounded-l-none hover:bg-amber-500 h-9" onClick={() => { if (locationInput.trim()) { handleLocationSearch(); } else { handleProductSearch(); } }}>
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Language */}
        {/* <Select>
          <SelectTrigger className="w-[68px] bg-white">
            <SelectValue placeholder="EN" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hindi">Hindi</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="German">German</SelectItem>
            <SelectItem value="French">French</SelectItem>
          </SelectContent>
        </Select> */}

        {/* Language Selector */}
        <Select onValueChange={(val) => i18n.changeLanguage(val)}>
          <SelectTrigger className="w-[68px] bg-white">
            <SelectValue placeholder="EN" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">Hindi</SelectItem>
            <SelectItem value="German">German</SelectItem>
            <SelectItem value="French">French</SelectItem>
          </SelectContent>
        </Select>

        {/* Account Section */}
        <div
          className="relative flex flex-col text-center flex-shrink-0 cursor-pointer"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <p className="text-xs sm:text-sm text-white">
            Hello,&nbsp;
            {!user ? (
              <Link to="/login" className="hover:underline text-yellow-300">Sign In</Link>
            ) : (
              <span className="font-semibold">{user.name}</span>
            )}
          </p>

          <span className="font-bold text-xs sm:text-sm text-white">Account & Lists</span>

          {/* Dropdown */}
          {open && (
            <div className="absolute top-12 right-0 bg-white shadow-lg border rounded-md w-60 p-4 z-50">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block bg-yellow-400 hover:bg-yellow-500 text-center py-2 font-semibold rounded"
                  >
                    Sign In
                  </Link>

                  <p className="text-xs text-center mt-2">
                    New customer?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                      Create your account
                    </Link>
                  </p>
                </>
              ) : (
                <div className="flex flex-col text-sm text-gray-800 space-y-2">
                  <Link to="/profile" className="hover:underline">Your Account</Link>
                  <Link to="/orders" className="hover:underline">Your Orders</Link>

                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Returns & Booking */}
        <div className="flex flex-col text-center flex-shrink-0">
          <p className="text-xs sm:text-sm text-white">Returns</p>
          <p className="font-semibold text-xs sm:text-sm text-white">& Booking</p>
        </div>

        {/* Your Booking */}
        <div className="flex items-center flex-shrink-0">
          <span className="text-xs sm:text-sm text-white">Your Booking</span>
        </div>
      </div>

      {/* Advanced Map */}
      {showMap && (
        <div className="relative w-full h-96 bg-white border-t border-gray-300">
          <Button
            className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => setShowMap(false)}
          >
            Close
          </Button>
          <AdvancedMap locationQuery={locationInput} />
        </div>
      )}
    </div>
  );
};

export default Header;



