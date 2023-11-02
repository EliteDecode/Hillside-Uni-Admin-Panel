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
  const [calenderYear, setCalenderYear] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Admin");
    setAdmin(JSON.parse(userFromLocalStorage));
  }, []);

  const navigate = useNavigate();

  const addCalender = async (admindata) => {
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

      if (data) {
        toast.success("Calender added successfully", {
          onClose: () => {
            // navigate("/admin/calender");
            console.log("he");
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

  const getCalenderByYear = async (year) => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/academic-calender/published-academic-calender/${year}`
      );
      setCalenderYear(data?.data);
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

  const getSingleCalender = async (id) => {
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

  const deleteSingleCalender = async (calenderYear) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };

    setLoading(true);
    console.log("we are here");
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_API_URL}/academic-calender/delete-academic-calender/${calenderYear}/${admin.data.id}`,

        config
      );

      if (data) {
        toast.success("Calender year deleted successfully", {
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

  const deleteSingleCalenderCategory = async (calenderId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };

    setLoading(true);
    console.log("we are here");
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_API_URL}/academic-calender/delete-academic-calender-category/${calenderId}/${admin.data.id}`,

        config
      );

      if (data) {
        toast.success("Calender updated successfully", {
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
        `${process.env.REACT_APP_API_URL}/academic-calender/edit-academic-calender/${calenderId}/${admin.data.id}`,
        calenderData,
        config
      );

      console.log(data);

      if (data) {
        toast.success("Calender deleted successfully", {
          onClose: () => {
            navigate("/admin/calender");
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
        addCalender,
        getSingleCalender,
        getAllCalender,
        editSingleCalender,
        deleteSingleCalenderCategory,
        deleteSingleCalender,
        getCalenderByYear,
        calender,
        calenderYear,
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
