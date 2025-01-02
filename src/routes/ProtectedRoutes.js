import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardParticipant from "../pages/Dashboard/DashboardParticipant";
import DashboardOrganizer from "../pages/Dashboard/DashboardOrganizer";

export default function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/participant" element={<PrivateRoute role="participant" />}>
        <Route path="dashboard" element={<DashboardParticipant />} />
      </Route>
      <Route path="/organizer" element={<PrivateRoute role="organizer" />}>
        <Route path="dashboard" element={<DashboardOrganizer />} />
      </Route>
    </Routes>
  );
}
