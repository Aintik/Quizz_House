import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cabinet from "./components/Cabinet";
import Test from "./components/Test";
import Start from "./components/Start";
import Finish from "./components/Finish";
import RegisterPage from "./components/RegisterPage";
import AuthPage from "./components/AuthPage";
import Admin from "./components/Admin/Admin";
import Edit from "./components/Admin/Edit";
import School from "./components/Admin/School";
import Sinf from "./components/Admin/Sinf";
import Upload from "./components/Admin/Upload";
import AuthAdmin from "./components/Admin/authAdmin";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/authAdmin" element={<AuthAdmin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/edit" element={<Edit />} />
        <Route path="/admin/school/:id" element={<School />} />
        <Route path="/admin/school/:id/sinf/:grade" element={<Sinf />} />
        <Route path="/admin/upload" element={<Upload />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/test" element={<Test />} />
        <Route path="/start" element={<Start />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="*" element={<Home />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<RegisterPage />} />
      </Routes>
    );
  }
};
