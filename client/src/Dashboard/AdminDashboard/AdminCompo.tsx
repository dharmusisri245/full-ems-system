

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import CategoryDashboard from "../commonComponent/CategoryDashboard";
import SubCategoryDashboard from "../commonComponent/SubCategoryDashboard";
import ProductDashboard from "../commonComponent/ProductDashboard";
import { FaUserCircle, FaFolder, FaTags, FaBox } from "react-icons/fa";
import { getCurrentUser } from "@/api/AxiosInstace";

const AdminCompo = () => {
  const [activeTab, setActiveTab] = useState<"categories" | "subcategories" | "products">("categories");

  // Logged-in user from localStorage
  // const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const user = getCurrentUser()

  return (
    <div className="p-6 space-y-6">

      {/* TOP BAR */}
      <Card className="bg-white shadow-md rounded-lg">
        <CardContent className="flex items-center justify-between">
          {/* Left: Dashboard Title */}
          <h1 className="text-3xl font-bold text-gray-900">Admin Master Dashboard</h1>

          {/* Right: User Info */}
          {user && (
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-4xl text-black" />
              <div className="text-right">
                {/* <p className="text-sm text-gray-500">Welcome</p>
                 */}
                <h2 className="text-lg font-semibold text-black-600">{user.name}</h2>
                {/* <p className="text-lg text-gray-400">{user.role}</p> */}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* TABS */}
      <Card className="bg-white shadow-md rounded-lg">
        <CardContent className="flex gap-3">
          <Button
            size="sm"
            variant={activeTab === "categories" ? "default" : "outline"}
            onClick={() => setActiveTab("categories")}
            className="flex items-center gap-2"
          >
            <FaFolder /> Categories
          </Button>

          <Button
            size="sm"
            variant={activeTab === "subcategories" ? "default" : "outline"}
            onClick={() => setActiveTab("subcategories")}
            className="flex items-center gap-2"
          >
            <FaTags /> SubCategories
          </Button>

          <Button
            size="sm"
            variant={activeTab === "products" ? "default" : "outline"}
            onClick={() => setActiveTab("products")}
            className="flex items-center gap-2"
          >
            <FaBox /> Products
          </Button>
        </CardContent>
      </Card>

      {/* DASHBOARD CONTENT */}
      <Card className="bg-white shadow-lg rounded-lg">
        <CardContent>
          {activeTab === "categories" && <CategoryDashboard/>}
          {activeTab === "subcategories" && <SubCategoryDashboard />}
          {activeTab === "products" && <ProductDashboard />}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCompo;




// src/Dashboard/AdminDashboard.tsx

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootStateType } from "../../redux/store"
// import CategoryDashboard from "../commonComponent/CategoryDashboard";
// import SubCategoryDashboard from "../commonComponent/SubCategoryDashboard";
// import ProductDashboard from "../commonComponent/ProductDashboard";
// const AdminDashboard = () => {
//   const user = useSelector((state: RootState) => state.auth.user);

//   const [activeTab, setActiveTab] = useState<
//     "categories" | "subcategories" | "products"
//   >("categories");

//   return (
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <div className="flex items-center justify-between p-6 rounded-xl bg-white shadow">
//         <h1 className="text-3xl font-semibold">Admin Master Dashboard</h1>

//         <div className="flex items-center gap-3">
//           <div className="text-3xl">👤</div>
//           <span className="font-medium text-lg">
//             {user ? user.name : "No User"}
//           </span>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => setActiveTab("categories")}
//           className={`px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
//             activeTab === "categories"
//               ? "bg-black text-white"
//               : "bg-gray-200 hover:bg-gray-300"
//           }`}
//         >
//           📁 Categories
//         </button>

//         <button
//           onClick={() => setActiveTab("subcategories")}
//           className={`px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
//             activeTab === "subcategories"
//               ? "bg-black text-white"
//               : "bg-gray-200 hover:bg-gray-300"
//           }`}
//         >
//           📂 SubCategories
//         </button>

//         <button
//           onClick={() => setActiveTab("products")}
//           className={`px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
//             activeTab === "products"
//               ? "bg-black text-white"
//               : "bg-gray-200 hover:bg-gray-300"
//           }`}
//         >
//           🛒 Products
//         </button>
//       </div>

//       {/* CONTENT */}
//       <div className="p-6 bg-white rounded-xl shadow-xl min-h-[300px] overflow-y-auto">
//         {activeTab === "categories" && <CategoryDashboard />}
//         {activeTab === "subcategories" && <SubCategoryDashboard />}
//         {activeTab === "products" && <ProductDashboard/>}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
