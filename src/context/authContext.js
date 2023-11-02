import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem("Admin")));
  }, []);

  const navigate = useNavigate();

  const loginAdmin = async (admindata) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        admindata
      );

      // Check if the login was successful
      if (data) {
        localStorage.setItem("Admin", JSON.stringify(data.data));
        setAdmin(data.data);
        toast.success("Login successful", {
          onClose: () => {
            navigate("/admin/dashboard");
          },
        });

        return data;
      }
    } catch (error) {
      // Display an error toast
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  const editAdmin = async (admindata, adminId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };

    try {
      const data = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/update-single-admin/${adminId}/`,
        admindata,
        config
      );

      console.log(data);
      // Check if the login was successful
      // Check if the login was successful
      if (data) {
        toast.success("Admin deleted successfully", {
          onClose: () => {
            navigate("/admin/profile");
          },
        });

        localStorage.setItem("Admin", JSON.stringify(data.data));
        return data;
      }
    } catch (error) {
      // Display an error toast
      toast.error(error.response.data.error);
      toast.error(error.response.data?.message);
    }
  };

  const changePassword = async (admindata, adminId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };

    try {
      const data = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/update-single-admin-password/${adminId}/`,
        admindata,
        config
      );

      console.log(data);
      // Check if the login was successful
      // Check if the login was successful
      if (data) {
        toast.success("Admin password updated successfully", {
          onClose: () => {
            navigate("/admin/settings");
          },
        });

        return data;
      }
    } catch (error) {
      // Display an error toast
      toast.error(error.response.data.error);
      toast.error(error.response.data?.message);
    }
  };
  return (
    <AppContext.Provider
      value={{ loginAdmin, admin, editAdmin, changePassword }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useAuthGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AuthProvider };
