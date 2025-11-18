import React from "react";
import { Routes, Route } from "react-router-dom";
import Approute from "@/AppRoute/Approute";
import AppsLayout from "./component/Layout/AppsLayout";
const App: React.FC = () => {
  return (
    <Routes>
      {/* All routes share MainLayout */}
      <Route element={<AppsLayout />}>
        <Route path="/*" element={<Approute />} />
      </Route>
    </Routes>
  );
};
export default App;
