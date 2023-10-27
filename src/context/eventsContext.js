import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const EventProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("Admin");
    setAdmin(JSON.parse(userFromLocalStorage));
  }, []);

  const navigate = useNavigate();

  const addEvents = async (admindata) => {
    console.log(admin.token);

    const config = {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    };

    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/events/${admin.data.id}`,
        admindata,
        config
      );

      // Check if the login was successful
      if (data) {
        toast.success("Events added successfully", {
          onClose: () => {
            navigate("/admin/events");
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

  const getEvents = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/events/published-events`
      );
      setEvents(data.data);
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      toast.error(error.response.data?.message);
    }
  };

  useEffect(() => {
    getEvents();
    console.log("h");
  }, []);

  return (
    <AppContext.Provider value={{ addEvents, events }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useEventGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, EventProvider };
