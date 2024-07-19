import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import Events from "views/Events/Events";
import Calender from "views/Calender/Calender";
import News from "views/News/News";
import Settings from "views/Settings";
import Logout from "views/Logout";
import Gallery from "views/Gallery/Gallery";
import Staff from "views/Staff/Staff";
import Student from "views/Student/Student";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/events",
    name: "Events",
    icon: " fa fa-calendar",
    component: <Events />,
    layout: "/admin",
  },

  {
    path: "/calender",
    name: "Academic Calender",
    icon: "fa fa-calendar-check",
    component: <Calender />,
    layout: "/admin",
  },
  {
    path: "/news",
    name: "News",
    icon: "fa fa-newspaper",
    component: <News />,
    layout: "/admin",
  },
  {
    path: "/gallery",
    name: "Gallery",
    icon: "fa fa-image",
    component: <Gallery />,
    layout: "/admin",
  },

  {
    path: "/staff",
    name: "Staffs",
    icon: "fa fa-user-md",
    component: <Staff />,
    layout: "/admin",
  },
  {
    path: "/student",
    name: "Students",
    icon: "fa fa-user",
    component: <Student />,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },

  {
    path: "/settings",
    name: "Settings",
    icon: "fa fa-cog",
    component: <Settings />,
    layout: "/admin",
  },
  {
    pro: true,
    path: "/logout",
    name: "Logout",
    icon: "fa fa-undo",
    component: <Logout />,
    layout: "/admin",
  },
];
export default routes;
