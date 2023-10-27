import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthGlobalContext } from "context/authContext";

const LoggedInRoute = () => {
  const { admin } = useAuthGlobalContext();

  return admin ? <Navigate to="/admin/dashboard" /> : <Navigate to="/login" />;
};

export default LoggedInRoute;
