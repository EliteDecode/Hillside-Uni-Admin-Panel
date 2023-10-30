import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const CalenderProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [calender, setCalender] = useState(null);
  const [singleCalender, setSingleCalender] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Admin");
    setAdmin(JSON.parse(userFromLocalStorage));
  }, []);

  const navigate = useNavigate();

  const addCalenders = async (admindata) => {
    console.log(admin.token);

    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };

    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/academic-calender/${admin.data.id}`,
        admindata,
        config
      );

      // Check if the login was successful
      if (data) {
        toast.success("Calenders added successfully", {
          onClose: () => {
            navigate("/admin/calenders");
          },
        });

        console.log(data);

        return data;
      }
    } catch (error) {
      // Display an error toast
      toast.error(error.response.data.error);
      toast.error(error.response.data?.message);
    }
  };

  const getAllCalender = async () => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/academic-calender/published-academic-calender`
      );
      setCalender(data?.data);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.error);
      toast.error(error?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  const getSingleCalenders = async (id) => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/academic-calender/${id}`
      );
      setSingleCalender(data.data[0]);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
      toast.error(error.response.data?.message);
    }
  };

  const deleteSingleCalender = async (calenderId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };

    setLoading(true);
    console.log("we are here");
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_API_URL}/academic-calender/delete-calenders/${calenderId}/${admin.data.id}`,

        config
      );

      if (data) {
        toast.success("Calenders updated successfully", {
          onClose: () => {
            window.location.reload();
            setLoading(false);
          },
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
      toast.error(error.response.data?.message);
    }
  };

  const editSingleCalender = async (calenderData, calenderId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };

    try {
      const data = await axios.put(
        `${process.env.REACT_APP_API_URL}/academic-calender/edit-calenders/${calenderId}/${admin.data.id}`,
        calenderData,
        config
      );

      console.log(data);

      if (data) {
        toast.success("Calenders deleted successfully", {
          onClose: () => {
            navigate("/admin/dashboard");
          },
        });

        console.log(data);

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
      value={{
        addCalenders,
        getSingleCalenders,
        getAllCalender,
        editSingleCalender,
        deleteSingleCalender,
        calender,
        loading,
        singleCalender,
      }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useCalenderGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, CalenderProvider };
