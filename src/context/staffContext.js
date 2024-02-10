import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const StaffProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [staff, setStaff] = useState(null);
  const [singleStaff, setSingleStaff] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Admin");
    setAdmin(JSON.parse(userFromLocalStorage));
  }, []);

  const navigate = useNavigate();

  const getStaff = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/staff`,
        config
      );
      setStaff(data?.data);
      setLoading(false);
      console.log(data);

      return data;
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.error);
      toast.error(error?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  const getSingleStaff = async (id) => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/staff/${id}`
      );
      setSingleStaff(data.data[0]);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.error);
      toast.error(error?.response?.data?.message);
    }
  };

  const updateStaff = async (value) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.put(
        `${process.env.REACT_APP_API_URL}/staff/update/${value.staffId}`,
        value,
        config
      );
      if (data) {
        setLoading(false);
        toast.success("Staff Id approved successfully", {
          onClose: () => {
            navigate("/admin/staff");
          },
        });
        return data;
      }
    } catch (error) {
      // Display an error toast
      setLoading(false);
      toast.error(error?.response?.data.error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        getSingleStaff,
        getStaff,
        updateStaff,
        staff,
        loading,
        singleStaff,
      }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useStaffGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, StaffProvider };
