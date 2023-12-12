import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const GalleryProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [singleGallery, setSingleGallery] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Admin");
    setAdmin(JSON.parse(userFromLocalStorage));
  }, []);

  const navigate = useNavigate();

  const addGallery = async (admindata) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/gallery/${admin.data.id}`,
        admindata,
        config
      );

      // Check if the login was successful
      if (data) {
        toast.success("Image added to gallery successfully", {
          onClose: () => {
            navigate("/admin/gallery");
          },
        });

        console.log(data);

        return data;
      }
    } catch (error) {
      // Display an error toast
      toast.error(error?.response?.data.error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getGallery = async () => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/gallery/published-gallery`
      );
      setGallery(data?.data);
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

  const getSingleGallery = async (id) => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/gallery/${id}`
      );
      setSingleGallery(data.data[0]);
      setLoading(false);
      console.log(data);

      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.error);
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteSingleGallery = async (newId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    setLoading(true);
    console.log("we are here");
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_API_URL}/gallery/delete-gallery/${newId}/${admin.data.id}`,

        config
      );

      if (data) {
        toast.success("Gallery updated successfully", {
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

  const editGallery = async (galleryData, newId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.put(
        `${process.env.REACT_APP_API_URL}/gallery/edit-gallery/${newId}/${admin.data.id}`,
        galleryData,
        config
      );
      if (data) {
        toast.success("Gallery updated successfully", {
          onClose: () => {
            navigate("/admin/gallery");
          },
        });

        return data;
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.error);
      toast.error(error?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        addGallery,
        getSingleGallery,
        getGallery,
        editGallery,
        deleteSingleGallery,
        gallery,
        loading,
        singleGallery,
      }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useGalleryGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, GalleryProvider };
