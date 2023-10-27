import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import Events from "views/Events";
import Calender from "views/Calender";
import News from "views/News";
import Settings from "views/Settings";
import AddEvents from "views/AddEvents";
import Logout from "views/Logout";

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
    path: "/academics",
    name: "Academics",
    icon: "fa fa-graduation-cap",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
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
