import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/css/index.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import ProtectedRoutes from "layouts/ProtectedRoutes";
import LoggedInRoute from "layouts/LoggedInRoute";
import { AuthProvider } from "context/authContext";
import { EventProvider } from "context/eventsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <EventProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          </Route>
          <Route element={<LoggedInRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </EventProvider>
    </AuthProvider>
  </BrowserRouter>
);