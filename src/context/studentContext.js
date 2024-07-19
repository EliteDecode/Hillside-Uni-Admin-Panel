import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./api";

const AppContext = React.createContext();

const StudentProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [student, setStudent] = useState(null);
  const [singleStudent, setSingleStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Admin");
    setAdmin(JSON.parse(userFromLocalStorage));
  }, []);

  const navigate = useNavigate();

  const getStudent = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.get(`${API_URL}/student`, config);
      setStudent(data?.data);
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

  const getSingleStudent = async (id) => {
    setLoading(true);
    try {
      const data = await axios.get(`${API_URL}/student/${id}`);
      setSingleStudent(data.data.data);
      setLoading(false);
      console.log(data);

      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.error);
      toast.error(error?.response?.data?.message);
    }
  };

  const updateStudent = async (value) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.put(
        `${API_URL}/student/update/${value.studentId}`,
        value,
        config
      );
      if (data) {
        setLoading(false);
        toast.success("Student Id approved successfully", {
          onClose: () => {
            navigate("/admin/student");
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

  const declineStudentid = async (value) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.put(
        `${API_URL}/student/update/declineId/${value.studentId}`,
        value,
        config
      );
      if (data) {
        setLoading(false);
        toast.info("Student Id declined successfully", {
          onClose: () => {
            navigate("/admin/student");
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
        getSingleStudent,
        getStudent,
        updateStudent,
        declineStudentid,
        student,
        loading,
        singleStudent,
      }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useStudentGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, StudentProvider };
