import { Outlet, Navigate } from "react-router-dom";
import { useAuthGlobalContext } from "context/authContext";

const ProtectedRoutes = () => {
  const admin = localStorage.getItem("Admin");

  return admin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
