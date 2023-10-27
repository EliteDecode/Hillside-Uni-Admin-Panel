import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("Admin");

    navigate("/login");
  }, []);

  return <div>Logout</div>;
};

export default Logout;
