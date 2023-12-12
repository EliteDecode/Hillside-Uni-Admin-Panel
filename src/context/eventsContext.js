import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const EventProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [events, setEvents] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Admin");
    setAdmin(JSON.parse(userFromLocalStorage));
  }, []);

  const navigate = useNavigate();

  const addEvents = async (admindata) => {
    console.log(admin?.token);

    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/events/${admin.data.id}`,
        admindata,
        config
      );

      if (data) {
        toast.success("Events added successfully", {
          onClose: () => {
            navigate("/admin/events");
            // console.log("he");
          },
        });

        console.log(data);

        return data;
      }
    } catch (error) {
      // Display an error toast
      toast.error(error?.response?.data.error);
      toast.error(error?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  const getEvents = async () => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/events/published-events`
      );
      setEvents(data?.data);
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

  const getSingleEvents = async (id) => {
    setLoading(true);
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/events/${id}`
      );
      setEvent(data.data[0]);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.error);
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteSingleEvents = async (eventId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    setLoading(true);
    console.log("we are here");
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_API_URL}/events/delete-events/${eventId}/${admin.data.id}`,

        config
      );

      if (data) {
        toast.success("Events updated successfully", {
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

  const editEvents = async (eventData, eventId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      const data = await axios.put(
        `${process.env.REACT_APP_API_URL}/events/edit-events/${eventId}/${admin.data.id}`,
        eventData,
        config
      );

      console.log(data);
      // Check if the login was successful
      // Check if the login was successful
      if (data) {
        toast.success("Events deleted successfully", {
          onClose: () => {
            navigate("/admin/dashboard");
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

  return (
    <AppContext.Provider
      value={{
        addEvents,
        getSingleEvents,
        getEvents,
        editEvents,
        deleteSingleEvents,
        events,
        loading,
        event,
      }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useEventGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, EventProvider };
