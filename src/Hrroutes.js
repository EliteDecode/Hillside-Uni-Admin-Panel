import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import Events from "views/Events/Events";
import Calender from "views/Calender/Calender";
import News from "views/News/News";
import Settings from "views/Settings";
import Logout from "views/Logout";
import Gallery from "views/Gallery/Gallery";
import Staff from "views/Staff/Staff";

var hrRoutes = [
  {
    path: "/staff",
    name: "Staffs",
    icon: "fa fa-user-md",
    component: <Staff />,
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
export default hrRoutes;
