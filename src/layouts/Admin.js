import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
import AddEvents from "views/Events/AddEvents";
import EditEvents from "views/Events/EditEvents";
import AddNews from "views/News/AddNews";
import EditNews from "views/News/EditNews";
import ViewCalender from "views/Calender/ViewCalender";
import AddCalender from "views/Calender/AddCalender";
import EditCalender from "views/Calender/EditCalender";
import AddGallery from "views/Gallery/AddGallery";
import EditGallery from "views/Gallery/EditGallery";

var ps;

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Routes>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                element={prop.component}
                key={key}
                exact
              />
            );
          })}
          <Route path="/events/add-events" element={<AddEvents />} />
          <Route path="/gallery/add-gallery" element={<AddGallery />} />
          <Route path="/gallery/:galleryId" element={<EditGallery />} />
          <Route path="/events/:eventId" element={<EditEvents />} />
          <Route path="/news/add-news" element={<AddNews />} />
          <Route path="/news/:newsId" element={<EditNews />} />
          <Route path="/calender/:year" element={<ViewCalender />} />
          <Route path="/calender/add-calender" element={<AddCalender />} />
          <Route
            path="/calender/:calenderYear/:id"
            element={<EditCalender />}
          />
        </Routes>
        <Footer fluid />
      </div>
      {/* <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> */}
    </div>
  );
}

export default Dashboard;
