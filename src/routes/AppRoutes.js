import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />}></Route>
      <Route path="/auth/*" element={<AuthRoutes />}></Route>
      <Route path="/app/*" element={<ProtectedRoutes />}></Route>
    </Routes>
  );
}
