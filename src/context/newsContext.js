import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "./api";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const NewsProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [news, setNews] = useState(null);
  const [singleNews, setSingleNews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Admin");
    setAdmin(JSON.parse(userFromLocalStorage));
  }, []);

  const navigate = useNavigate();

  const addNews = async (admindata) => {
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.post(
        `${API_URL}/news/${admin.data.id}`,
        admindata,
        config
      );

      // Check if the login was successful
      if (data) {
        setLoading(false);
        toast.success("News added successfully", {
          onClose: () => {
            navigate("/admin/news");
          },
        });

        console.log(data);

        return data;
      }
    } catch (error) {
      // Display an error toast
      setLoading(false);
      toast.error(error?.response?.data.error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getNews = async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${API_URL}/news/published-news`);
      setNews(data?.data);
      setLoading(false);
      console.log(data);

      return data;
    } catch (error) {
      setLoading(false);

      toast.error(error?.response?.data?.error);

      toast.error(error?.response?.data?.message);
    }
  };

  const getSingleNews = async (id) => {
    setLoading(true);
    try {
      const data = await axios.get(`${API_URL}/news/${id}`);
      setSingleNews(data.data[0]);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.error);
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteSingleNews = async (newId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    setLoading(true);
    try {
      const data = await axios.delete(
        `${API_URL}/news/delete-news/${newId}/${admin.data.id}`,

        config
      );

      if (data) {
        toast.success("News deleted successfully", {
          onClose: () => {
            window.location.reload();
            setLoading(false);
          },
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.error);
      toast.error(error?.response?.data?.message);
    }
  };

  const editNews = async (newsData, newId) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.put(
        `${API_URL}/news/edit-news/${newId}/${admin.data.id}`,
        newsData,
        config
      );

      console.log(data);
      // Check if the login was successful
      // Check if the login was successful
      if (data) {
        setLoading(false);
        toast.success("News updated successfully", {
          onClose: () => {
            navigate("/admin/dashboard");
          },
        });

        console.log(data);

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
        addNews,
        getSingleNews,
        getNews,
        editNews,
        deleteSingleNews,
        news,
        loading,
        singleNews,
      }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useNewsGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, NewsProvider };
