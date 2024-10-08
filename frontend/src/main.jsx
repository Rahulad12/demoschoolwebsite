import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// CSS imports
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-tooltip/dist/react-tooltip.css'

// User Screens
import HomeScreen from "./Screen/HomeScreen.jsx";
import AboutScreen from "./Screen/AboutScreen.jsx";
import ActivitiesScreen from "./Screen/ActivitiesScreen.jsx";
import EventScreen from "./Screen/EventScreen.jsx";
import NoticeScreen from "./Screen/NoticeScreen.jsx";

// Admin Screens & Routes
import AdminRoute from "./Components/AdminRoute.jsx";
import Adminscreen from "./Screen/Admin/Adminscreen.jsx";
import AdminGetAllContact from "./Screen/Admin/AdminGetAllContact.jsx";
import AdminGetAllNotice from "./Screen/Admin/AdminGetAllNotice.jsx";
import AdminCreateNotice from "./Screen/Admin/AdminCreateNotice.jsx";
import AdminLogin from "./Screen/Admin/AdminLogin.jsx";
import AdminCreateUser from "./Screen/Admin/AdminCreateUser.jsx";
import AdminGetUser from "./Screen/Admin/AdminGetUser.jsx";
import AdminCreateEvent from "./Screen/Admin/AdminGetAllEvent.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main public routes */}
      <Route path="/" element={<App />}>
        <Route index element={<HomeScreen />} />
        <Route path="about" element={<AboutScreen />} />
        <Route path="activities" element={<ActivitiesScreen />} />
        <Route path="event" element={<EventScreen />} />
        <Route path="notice" element={<NoticeScreen />} />
        <Route path="admin/login" element={<AdminLogin />} />
      </Route>

      {/* Admin routes with authentication */}
      <Route element={<AdminRoute />}>
        <Route path="admin" element={<Adminscreen />} />
        <Route path="admin/getnotice" element={<AdminGetAllNotice />} />
        <Route path="admin/createnotice" element={<AdminCreateNotice />} />
        <Route path="admin/getcontact" element={<AdminGetAllContact />} />
        <Route path="admin/createuser" element={<AdminCreateUser />} />
        <Route path="admin/getuser" element={<AdminGetUser />} />
        <Route path="admin/createevent" element={<AdminCreateEvent />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
