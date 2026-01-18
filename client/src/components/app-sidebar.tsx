// import * as React from "react";
// import {
//   Home,
//   Users,
//   Settings,
//   ChartNoAxesGantt,
//   MonitorCog,
//   BookOpenText,
//   BookImage,
//   BookUser,
//   TabletSmartphone,
//   LogOut,
// } from "lucide-react";

// import { Link, useNavigate } from "react-router-dom";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarFooter,
// } from "@/components/ui/sidebar";

// import { useAppDispatch, useAppSelector } from "../hooks/hooks";
// import { useLogoutUserMutation } from "@/api/authApi";
// import { logout } from "../redux/slices/authSlices";
// import { clearCurrentUser, clearAccessToken } from "@/api/AxiosInstace";
// import {SidebarMenuConfig} from "../components/config/sidebarConfig"
// // -----------------------------------
// // Sidebar Config
// // // -----------------------------------
// // export const SidebarMenuConfig = [
// //   {
// //     title: "Admin Master Dashboard",
// //     url: "/Admin-Dashboard",
// //     icon: BookImage,
// //     roles: ["Admin"],
// //     categories: ["Magazine"],
// //     subCategories: null,
// //     permissions: ["magazine_view"],
// //   },
// //   {
// //     title: "User Management",
// //     url: "/user-management",
// //     icon: Users,
// //     roles: ["Admin", "client"],
// //     categories: null,
// //     subCategories: null,
// //     permissions: null,
// //   },
// //   {
// //     title: "Home",
// //     url: "/",
// //     icon: Home,
// //     roles: ["Admin", "User", "Manager", "Client"],
// //     categories: null,
// //     subCategories: null,
// //     permissions: null,
// //   },
// //   {
// //     title: "Organogram",
// //     url: "/oraganogram",
// //     icon: ChartNoAxesGantt,
// //     roles: ["client"],
// //     categories: null,
// //     subCategories: null,
// //     permissions: null,
// //   },
// //   {
// //     title: "Applications",
// //     url: "/application-policies",
// //     icon: MonitorCog,
// //     roles: ["User"],
// //     categories: null,
// //     subCategories: null,
// //     permissions: null,
// //   },
// //   {
// //     title: "Policies",
// //     url: "/policies",
// //     icon: BookOpenText,
// //     roles: ["User"],
// //     categories: null,
// //     subCategories: null,
// //     permissions: null,
// //   },
// //   {
// //     title: "DFCCIL Directory",
// //     url: "/dfccil-directory",
// //     icon: BookUser,
// //     roles: ["User"],
// //     categories: null,
// //     subCategories: null,
// //     permissions: null,
// //   },
// //   {
// //     title: "Manage Applications",
// //     url: "/manage-applications",
// //     icon: Settings,
// //     roles: ["User"],
// //     categories: null,
// //     subCategories: null,
// //     permissions: ["manage_applications"],
// //   },
// // ];

// // -----------------------------------

// interface AppSidebarProps {
//   isCollapsed: boolean;
//   toggleSidebar: () => void;
// }

// export function AppSidebar({
//   isCollapsed,
//   toggleSidebar,
//   ...props
// }: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
//   const { user, isLoading } = useAppSelector((state) => state.auth);
//   console.log("Appside user", user)
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [logoutUser] = useLogoutUserMutation();

//   // ----------------------------------------------------
//   // Loading State
//   // ----------------------------------------------------
//   if (isLoading) {
//     return (
//       <div
//         className={`flex flex-col bg-white border-r-2 h-full ${isCollapsed ? "w-20" : "w-80"
//           }`}
//       >
//         <p className="p-4 text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   // ----------------------------------------------------
//   // ROLE BASED MENU LOGIC
//   // ----------------------------------------------------

//   const activeRole = user?.role ?? "User"; // if not logged in → treat as User

//   const menuToShow = SidebarMenuConfig.filter((menu) => {
//     // 1️⃣ Admin sees all admin pages, ignore other checks
//     if (activeRole === "Admin") return menu.roles?.includes("Admin");

//     // 2️⃣ User sees user pages, ignore other checks
//     if (activeRole === "User") return menu.roles?.includes("User");

//     // 3️⃣ Client sees only client pages and must pass category/subCategory/permission checks
//     if (activeRole === "client") {
//       const roleMatch = menu.roles?.includes("client");
//       const categoryMatch = !menu.categories || menu.categories.length === 0 || menu.categories.includes(user?.category);
//       const subCategoryMatch = !menu.subCategories || menu.subCategories.length === 0 || menu.subCategories.includes(user?.subCategory);
//       const permissionMatch = !menu.permissions || menu.permissions.length === 0 || menu.permissions.some((p) => user?.permissions?.includes(p));
//       return roleMatch && categoryMatch && subCategoryMatch && permissionMatch;
//     }



//     // fallback: hide everything
//     return false;
//   });





//   // ----------------------------------------------------
//   // Logout Handler
//   // ----------------------------------------------------
//   const handleLogout = async () => {
//     try {
//       await logoutUser().unwrap();

//       clearCurrentUser();
//       clearAccessToken();
//       dispatch(logout());

//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <div
//       className={`flex flex-col bg-white shadow-md border-r-2 h-full transition-all duration-300 ${isCollapsed ? "w-20" : "w-80"
//         }`}
//     >
//       {/* Header */}
//       <div className="p-4 border-b flex items-center justify-between">
//         {!isCollapsed && (
//           <span className="text-xl font-bold text-gray-700">EMS</span>
//         )}
//       </div>

//       {/* Menu */}
//       <SidebarContent className="flex-1">
//         <SidebarGroup>
//           <SidebarMenu className="space-y-0">
//             {menuToShow.map((item) => (
//               <SidebarMenuItem key={item.title}>
//                 <SidebarMenuButton
//                   asChild
//                   className="group hover:bg-blue-700 hover:text-white transition-all"
//                 >
//                   <Link
//                     to={item.url}
//                     onClick={toggleSidebar}
//                     className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-700 hover:text-white rounded-md transition-all group"
//                   >
//                     <item.icon
//                       size={22}
//                       className="text-gray-700 group-hover:text-white"
//                     />
//                     {!isCollapsed && <span>{item.title}</span>}
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>

//       {/* Footer */}
//       {/* Footer */}
//       <SidebarFooter>
//         <SidebarMenu>
//           {/* Mobile App */}
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               asChild
//               className="group hover:bg-blue-700 hover:text-white transition-all"
//             >
//               <Link
//                 to="/mobile-app"
//                 onClick={toggleSidebar}
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-700 hover:text-white rounded-md group"
//               >
//                 <TabletSmartphone className="size-6 group-hover:text-white" />
//                 {!isCollapsed && <span>Mobile App</span>}
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>

//           {/* LOGIN WHEN USER NULL */}
//           {!user && (
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 asChild
//                 className="group hover:bg-green-600 hover:text-white transition-all"
//               >
//                 <Link
//                   to="/login"
//                   onClick={toggleSidebar}
//                   className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-green-600 hover:text-white rounded-md group"
//                 >
//                   <LogOut className="size-6 group-hover:text-white rotate-180" />
//                   {!isCollapsed && <span>Login</span>}
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           )}

//           {/* LOGOUT WHEN USER LOGGED IN */}
//           {user && (
//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 asChild
//                 className="group hover:bg-red-600 hover:text-white transition-all"
//               >
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center w-full gap-3 px-3 py-2 text-gray-700 hover:bg-red-600 hover:text-white rounded-md group text-left"
//                 >
//                   <LogOut className="size-6 group-hover:text-white" />
//                   {!isCollapsed && <span>Sign Out</span>}
//                 </button>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           )}
//         </SidebarMenu>
//       </SidebarFooter>

//     </div>
//   );
// }




import * as React from "react";
import { useState } from "react";
import {
  TabletSmartphone,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useLogoutUserMutation } from "@/api/authApi";
import { logout } from "../redux/slices/authSlices";
import { clearCurrentUser, clearAccessToken } from "@/api/AxiosInstace";
import { SidebarMenuConfig } from "../components/config/sidebarConfig"
import { BriefcaseBusiness } from "lucide-react";

interface AppSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const SidebarMenuConfig1 = [
  {
    title: "Register Your Business",
    icon: BriefcaseBusiness,
    url: null,
    roles: ["Admin", "User", "client"],
    subCategories: [
      { id: "registerbusiness", title: "Register Business", url: "/register-Buisness" },
      { id: "paymentDetails", title: "Payment Details", url: "/payment-details" },
      { id: "profileSetting", title: "Profile Setting", url: "/profile-setting" },
    ],
  },
]


export function AppSidebar({
  isCollapsed,
  toggleSidebar,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const activeRole = user?.role ?? "User";

  // ----------------------------------------------------
  // ROLE BASED MENU FILTER
  // ----------------------------------------------------
  const menuToShow = SidebarMenuConfig.filter((menu) => {
    if (activeRole === "Admin") return menu.roles?.includes("Admin");
    if (activeRole === "User") return menu.roles?.includes("User");

    if (activeRole === "client") {
      const roleMatch = menu.roles?.includes("client");
      return roleMatch; // category/subCategory restrictions OPTIONAL
    }

    return false;
  });

  // ----------------------------------------------------
  // Logout Function
  // ----------------------------------------------------
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      clearCurrentUser();
      clearAccessToken();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ----------------------------------------------------
  // Loading
  // ----------------------------------------------------
  if (isLoading) {
    return (
      <div
        className={`flex flex-col bg-white border-r-2 h-full ${isCollapsed ? "w-20" : "w-80"
          }`}
      >
        <p className="p-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER SIDEBAR
  // ----------------------------------------------------
  return (
    <div
      className={`flex flex-col bg-white shadow-md border-r-2 h-full transition-all duration-300 ${isCollapsed ? "w-20" : "w-80"
        }`}
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-xl font-bold text-gray-700">EMS</span>
        )}
      </div>

      {/* MENU */}
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarMenu className="space-y-0">

            {menuToShow.map((item) => (
              <SidebarMenuItem key={item.title}>

                {/* MAIN BUTTON (CATEGORY OR PAGE) */}
                <SidebarMenuButton
                  onClick={() =>
                    item.subCategories
                      ? setOpenCategory(
                        openCategory === item.title ? null : item.title
                      )
                      : null
                  }
                  asChild={!item.subCategories}
                  className="group hover:bg-blue-700 hover:text-white transition-all cursor-pointer"
                >
                  {item.subCategories ? (
                    <div className="flex items-center gap-3 py-2">
                      <item.icon
                        size={22}
                        className="text-gray-700 group-hover:text-white"
                      />
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>
                  ) : (
                    <Link
                      to={item.url!}
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-700 hover:text-white rounded-md"
                    >
                      <item.icon size={22} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  )}
                </SidebarMenuButton>

                {/* SUBCATEGORY DROPDOWN */}
                {/* {openCategory === item.title && item.subCategories && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subCategories.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/subcategory/${sub.id}`}
                        onClick={toggleSidebar}
                        className="block py-1 text-sm text-gray-600 hover:text-blue-700"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )} */}
                {openCategory === item.title && item.subCategories && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subCategories.map(sub => (
                      <Link
                        key={sub.id}
                        to={sub.url} // use sub.url directly
                        onClick={toggleSidebar}
                        className="block py-1 text-sm text-gray-600 hover:text-blue-700"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            ))}

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <SidebarMenu>

          {/* Register Your Business */}
        
          <SidebarMenuItem>
            <div
              onClick={() =>
                setOpenCategory(openCategory === "footer-register" ? null : "footer-register")
              }
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-blue-700 hover:text-white rounded-md"
            >
              <BriefcaseBusiness className="size-4" />
              {!isCollapsed && <span>Register Your Business</span>}
            </div>

            {/* Footer Sub-Menu */}
            {openCategory === "footer-register" && (
              <div className="ml-8 mt-1 space-y-1">
                <Link
                  to="/register-Buisness"
                  onClick={toggleSidebar}
                  className="block py-1 text-sm text-gray-600 hover:text-blue-700"
                >
                  Register Business
                </Link>

                <Link
                  to="/payment-details"
                  onClick={toggleSidebar}
                  className="block py-1 text-sm text-gray-600 hover:text-blue-700"
                >
                  Payment Details
                </Link>

                <Link
                  to="/profile-setting"
                  onClick={toggleSidebar}
                  className="block py-1 text-sm text-gray-600 hover:text-blue-700"
                >
                  Profile Setting
                </Link>
              </div>
            )}
          </SidebarMenuItem>
          {/* Mobile App */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group hover:bg-blue-700 hover:text-white transition-all"
            >
              <Link
                to="/mobile-app"
                onClick={toggleSidebar}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-blue-700 rounded-md group"
              >
                <TabletSmartphone className="size-6 group-hover:text-white" />
                {!isCollapsed && <span>Mobile App</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* LOGIN */}
          {!user && (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="group hover:bg-green-600 hover:text-white transition-all"
              >
                <Link
                  to="/login"
                  onClick={toggleSidebar}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-green-600 hover:text-white rounded-md group"
                >
                  <LogOut className="size-6 rotate-180" />
                  {!isCollapsed && <span>Login</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {/* LOGOUT */}
          {user && (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="group hover:bg-red-600 hover:text-white transition-all"
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-3 px-3 py-2 text-gray-700 hover:bg-red-600 hover:text-white rounded-md group text-left"
                >
                  <LogOut className="size-6 group-hover:text-white" />
                  {!isCollapsed && <span>Sign Out</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </div>
  );
}
