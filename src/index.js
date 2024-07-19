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
import { NewsProvider } from "context/newsContext";
import { CalenderProvider } from "context/calenderContext";
import { GalleryProvider } from "context/galleryContext";
import { StaffProvider } from "context/staffContext";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { StudentProvider } from "context/studentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <PrimeReactProvider>
      <AuthProvider>
        <StaffProvider>
          <EventProvider>
            <NewsProvider>
              <CalenderProvider>
                <GalleryProvider>
                  <StudentProvider>
                    <Routes>
                      <Route element={<ProtectedRoutes />}>
                        <Route path="/admin/*" element={<AdminLayout />} />
                        <Route
                          path="/"
                          element={<Navigate to="/admin/dashboard" replace />}
                        />
                      </Route>
                      <Route path="/login" element={<Login />} />
                    </Routes>
                  </StudentProvider>
                </GalleryProvider>
              </CalenderProvider>
            </NewsProvider>
          </EventProvider>
        </StaffProvider>
      </AuthProvider>
    </PrimeReactProvider>
  </BrowserRouter>
);
