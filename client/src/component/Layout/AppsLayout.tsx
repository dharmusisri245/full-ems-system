

//=============================this is my old layout page open header downword with sidebar hidden property=====================================



// "use client";
// import React from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Outlet } from "react-router-dom";
// import { AppSidebar } from "../../components/app-sidebar";
// import { ContentCompo } from "./ContentCompo";
// import Approute from "@/AppRoute/Approute";
// import Footer from "./Footer";
// import Header from "./Header";

// const AppsLayout: React.FC = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarVisible((prev) => !prev);
//   };

//   return (
//     <SidebarProvider className="w-full h-screen flex flex-col bg-gray-100 overflow-hidden">
//       {/* 🔹 Header + ContentCompo (Fixed Top Section) */}
//       <header className="sticky top-0 z-50 flex-shrink-0 bg-white shadow-sm">
//         <Header toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
//         <ContentCompo toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
//       </header>

//       {/* 🔹 Body */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         {isSidebarVisible && (
//           <aside className="flex-shrink-0 h-full overflow-y-auto border-r border-gray-200 bg-white scrollbar-hide">
//             <AppSidebar isCollapsed={false} />
//           </aside>
//         )}

//         {/* Main Content */}
//         <main className="flex flex-col flex-1 overflow-y-auto bg-gray-50 scrollbar-hide">
//           <div className="flex-1 p-2 min-w-[600px] sm:min-w-full">
//             <Approute />
//             <Outlet />
//           </div>

//           {/* Footer */}
//           <footer className="w-full border-t border-gray-300 bg-white">
//             <Footer />
//           </footer>
//         </main>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default AppsLayout;





// "use client";
// import React from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Outlet } from "react-router-dom";
// import { AppSidebar } from "../../components/app-sidebar";
// import { ContentCompo } from "./ContentCompo";
// import Approute from "@/AppRoute/Approute";
// import Footer from "./Footer";
// import Header from "./Header";

// const AppsLayout: React.FC = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarVisible((prev) => !prev);
//   };

//   return (
//     <SidebarProvider className="w-full min-h-screen flex flex-col bg-gray-100">
//       {/* 🔹 Header */}
//       <header className="w-full bg-white shadow-sm z-50">
//         <Header toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
//         <ContentCompo toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
//       </header>

//       {/* 🔹 Main Body (Sidebar + Content) */}
//       <div className="flex flex-1 w-full">
//         {/* Sidebar */}
//         {isSidebarVisible && (
//           <aside className="flex-shrink-0 h-auto min-h-full border-r border-gray-200 bg-white w-[240px]">
//             <AppSidebar isCollapsed={false} />
//           </aside>
//         )}

//         {/* Main Content Area */}
//         <main className="flex-1 bg-gray-50 p-4 overflow-auto">
//           <Approute />
//           <Outlet />
//         </main>
//       </div>

//       {/* 🔹 Footer */}
//       <footer className="w-full border-t border-gray-300 bg-white mt-auto">
//         <Footer />
//       </footer>
//     </SidebarProvider>
//   );
// };

// export default AppsLayout;







//================this is my better code proper working======================


// "use client";
// import React from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Outlet } from "react-router-dom";
// import { AppSidebar } from "../../components/app-sidebar";
// import { ContentCompo } from "./ContentCompo";
// import Approute from "@/AppRoute/Approute";
// import Footer from "./Footer";
// import Header from "./Header";

// const AppsLayout: React.FC = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarVisible((prev) => !prev);
//   };

//   return (
//     // ✅ overflow-x-hidden only on root to hide horizontal scroll
//     <SidebarProvider className="relative w-full min-h-screen flex flex-col bg-gray-100 overflow-x-hidden">
//       {/* 🔹 Header */}
//       <header className="w-full bg-white shadow-sm z-50 relative">
//         <Header toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
//         <ContentCompo toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />

//         {/* 🔹 Sidebar (fixed height, visible overlay) */}
//         {isSidebarVisible && (
//           <div
//             className="absolute left-0 top-full mt-0.5 w-[250px] h-[570px] bg-white border border-gray-200 shadow-xl rounded-lg z-50 "
//           >
//             <AppSidebar isCollapsed={false} />
//           </div>
//         )}
//       </header>

//       {/* 🔹 Main Body */}
//       <main className="flex-1 bg-gray-50 p-0.5 overflow-y-auto">
//         <Approute />
//         <Outlet />
//       </main>

//       {/* 🔹 Footer */}
//       <footer className="w-full border-t border-gray-300 bg-white mt-auto">
//         <Footer />
//       </footer>
//     </SidebarProvider>
//   );
// };

// export default AppsLayout;



///this is my proper working coe with all facility like a amazon site


// "use client";
// import React, { useEffect } from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Outlet } from "react-router-dom";
// import { AppSidebar } from "../../components/app-sidebar";
// import { ContentCompo } from "./ContentCompo";
// import Approute from "@/AppRoute/Approute";
// import Footer from "./Footer";
// import Header from "./Header";

// const AppsLayout: React.FC = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

//   const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

//   // ✅ Scroll lock/unlock (without breaking layout)
//   useEffect(() => {
//     const html = document.documentElement;
//     const body = document.body;

//     if (isSidebarVisible) {
//       html.style.overflow = "hidden";
//       body.style.overflow = "hidden";
//     } else {
//       html.style.overflow = "";
//       body.style.overflow = "";
//     }

//     return () => {
//       html.style.overflow = "";
//       body.style.overflow = "";
//     };
//   }, [isSidebarVisible]);

//   return (
//     <SidebarProvider className="relative w-full min-h-screen flex flex-col bg-gray-100 overflow-x-hidden">
//       {/* 🔹 Header */}
//       <header className="w-full bg-white shadow-sm z-50 relative">
//         <Header toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
//         <ContentCompo toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />

//         {/* 🔹 Sidebar (overlayed below header) */}
//         {isSidebarVisible && (
//           <>
//             {/* Dim background overlay */}
//             <div
//               onClick={toggleSidebar}
//               className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40"
//             ></div>

//             <div
//               className="absolute left-0 top-full mt-1 w-[250px] h-[570px] bg-white border border-gray-200 shadow-2xl rounded-lg z-50 transition-transform duration-300 ease-out"
//             >
//               <AppSidebar isCollapsed={false} />
//             </div>
//           </>
//         )}
//       </header>

//       {/* 🔹 Main Content */}
//       <main className="flex-1 bg-gray-50  overflow-y-auto">
//         <Approute />
//         <Outlet />
//       </main>

//       {/* 🔹 Footer */}
//       <footer className="w-full border-t border-gray-300 bg-white mt-auto">
//         <Footer />
//       </footer>
//     </SidebarProvider>
//   );
// };

// export default AppsLayout;



// "use client";
// import React, { useEffect } from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Outlet } from "react-router-dom";
// import { AppSidebar } from "../../components/app-sidebar";
// import { ContentCompo } from "./ContentCompo";
// import Approute from "@/AppRoute/Approute";
// import Footer from "./Footer";
// import Header from "./Header";

// const AppsLayout: React.FC = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

//   const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

//   // ✅ Scroll Lock (only when sidebar open)
//   useEffect(() => {
//     const html = document.documentElement;
//     const body = document.body;

//     if (isSidebarVisible) {
//       const scrollBarWidth = window.innerWidth - html.clientWidth;
//       // stop scrolling (vertical + horizontal)
//       body.style.overflow = "hidden";
//       html.style.overflow = "hidden";
//       body.style.paddingRight = `${scrollBarWidth}px`;
//     } else {
//       // restore scrolling
//       body.style.overflow = "";
//       html.style.overflow = "";
//       body.style.paddingRight = "";
//     }

//     return () => {
//       body.style.overflow = "";
//       html.style.overflow = "";
//       body.style.paddingRight = "";
//     };
//   }, [isSidebarVisible]);

//   return (
//     //  Horizontal scroll allowed for full page width expansion
//     <SidebarProvider className="relative w-full min-h-screen flex flex-col bg-gray-100 overflow-x-auto">
//       {/* 🔹 Header */}
//       <header className="w-full bg-white shadow-sm z-50 relative">
//         <Header toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
//         <ContentCompo toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />

//         {/* 🔹 Sidebar */}
//         {isSidebarVisible && (
//           <>
//             {/* ✅ Overlay (screen freeze effect) */}
//             <div
//               onClick={toggleSidebar}
//               className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40"
//             ></div>

//             {/* Sidebar Panel */}
//             <div
//               className="absolute left-0 top-full mt-1 w-[250px] h-[570px] bg-white border border-gray-200 shadow-2xl rounded-lg z-50 transition-transform duration-300 ease-out"
//             >
//               <AppSidebar isCollapsed={false} />
//             </div>
//           </>
//         )}
//       </header>

//       {/* 🔹 Main Content */}
//       <main className="flex-1 bg-gray-50 overflow-y-auto">
//         <Approute />
//         <Outlet />
//       </main>

//       {/* 🔹 Footer */}
//       <footer className="w-full border-t border-gray-300 bg-white mt-auto">
//         <Footer />
//       </footer>
//     </SidebarProvider>
//   );
// };

// export default AppsLayout;



// "use client";
// import React, { useEffect } from "react";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Outlet } from "react-router-dom";
// import { AppSidebar } from "../../components/app-sidebar";
// import { ContentCompo } from "./ContentCompo";
// import Approute from "@/AppRoute/Approute";
// import Footer from "./Footer";
// import Header from "./Header";

// const AppsLayout: React.FC = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

//   const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

//   // ✅ Freeze screen only when sidebar is open (no scroll)
//   useEffect(() => {
//     const html = document.documentElement;
//     const body = document.body;

//     if (isSidebarVisible) {
//       // Disable all scrolling
//       const scrollBarWidth = window.innerWidth - html.clientWidth;
//       body.style.overflow = "hidden";
//       html.style.overflow = "hidden";
//       body.style.paddingRight = `${scrollBarWidth}px`;
//     } else {
//       // Restore scroll
//       body.style.overflow = "";
//       html.style.overflow = "";
//       body.style.paddingRight = "";
//     }

//     return () => {
//       body.style.overflow = "";
//       html.style.overflow = "";
//       body.style.paddingRight = "";
//     };
//   }, [isSidebarVisible]);

//   return (
//     <SidebarProvider
//       className="relative w-full min-h-screen flex flex-col bg-gray-100 overflow-x-auto overflow-y-auto hide-scrollbar"
//     >
//       {/* 🔹 Header */}
//       <header className="w-full bg-white shadow-sm z-50 relative">
//         <Header toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
//         <ContentCompo toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
//       </header>

//       {/* 🔹 Sidebar (with overlay & animation) */}
//       {isSidebarVisible && (
//         <>
//           {/* Overlay (screen freeze background) */}
//           <div
//             onClick={toggleSidebar}
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
//           ></div>

//           {/* Sidebar Panel */}
//           {/* <div
//             className={`fixed left-0 top-[100px] w-[250px] h-[570px] bg-white border border-gray-200 shadow-2xl rounded-r-lg z-50 transform transition-transform duration-300 ease-out ${
//               isSidebarVisible ? "translate-x-0" : "-translate-x-full"
//             }`}
//           >
//             <AppSidebar isCollapsed={false} 
//             />
//           </div> */}
//           <div
//             className={`fixed left-0 top-[100px] w-[250px] h-[570px] bg-white border border-gray-200 shadow-2xl rounded-r-lg z-50 transform transition-all duration-500 ease-in-out ${isSidebarVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
//               }`}
//           >
//             <AppSidebar
//               isCollapsed={!isSidebarVisible}
//               toggleSidebar={toggleSidebar}
//             />
//           </div>


//         </>
//       )}

//       {/* 🔹 Main Content */}
//       <main className="flex-1 w-full h-screen bg-gray-50 overflow-y-auto hide-scrollbar z-10">
//         <Outlet />
//       </main>

//       {/* 🔹 Footer */}
//       <footer className="w-full border-t border-gray-300 bg-white mt-auto z-20">
//         <Footer />
//       </footer>
//     </SidebarProvider>
//   );
// };

// export default AppsLayout;


"use client";
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../../components/app-sidebar";
import { ContentCompo } from "./ContentCompo";
import Footer from "./Footer";
import Header from "./Header";

const AppsLayout: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  // 🔒 Sidebar open होने पर scroll disable करें
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isSidebarVisible) {
      const scrollBarWidth = window.innerWidth - html.clientWidth;
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      body.style.overflow = "";
      html.style.overflow = "";
      body.style.paddingRight = "";
    }
  }, [isSidebarVisible]);

  return (
    <SidebarProvider className="relative w-full min-h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Header */}
      <header className="w-full bg-white shadow">
        <Header toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
        <ContentCompo toggleSidebar={toggleSidebar} isCollapsed={!isSidebarVisible} />
      </header>

      {/* Sidebar */}
      {isSidebarVisible && (
        <>
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          ></div>
          <div
            className={`fixed left-0 top-[100px] w-[250px] h-[570px] bg-white border border-gray-200 shadow-2xl rounded-r-lg z-50 transform transition-all duration-500 ${
              isSidebarVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
          >
            <AppSidebar
              isCollapsed={!isSidebarVisible}
              toggleSidebar={toggleSidebar}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="bg-gray-50 flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-300 bg-white">
        <Footer />
      </footer>
    </SidebarProvider>
  );
};

export default AppsLayout;
