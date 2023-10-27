import { Outlet, Navigate } from "react-router-dom";
import { useAuthGlobalContext } from "context/authContext";

const ProtectedRoutes = () => {
  const { admin } = useAuthGlobalContext();

  return admin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
