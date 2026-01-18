// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Approute from "@/AppRoute/Approute";
// import AppsLayout from "./component/Layout/AppsLayout";
// const App: React.FC = () => {
//   return (
//     <Routes>
//       {/* All routes share MainLayout */}
//       <Route element={<AppsLayout />}>
//         <Route path="/*" element={<Approute />} />
//       </Route>
//     </Routes>
//   );
// };
// export default App;


import React from "react";
import { Routes, Route } from "react-router-dom";
import Approute from "@/AppRoute/Approute";
import AppsLayout from "./component/Layout/AppsLayout";
import Login from "@/Auth/Login";
import Register from "@/Auth/Register";
import ForgotPassword from "@/Auth/ForgotPassword";

const App: React.FC = () => {
  return (
    <Routes>
      {/*  These routes do NOT use layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
 
      {/*  All other routes use the main layout */}
      <Route element={<AppsLayout />}>
        <Route path="/*" element={<Approute />} />
      </Route>
    </Routes>
  );
};

export default App;
