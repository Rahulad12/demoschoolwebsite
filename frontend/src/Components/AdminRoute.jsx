import React from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaAddressBook,
  FaSignOutAlt,
  FaGitter,
} from "react-icons/fa";
import { MdEvent } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import "../customcss/Admincss/Adminroute.css";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const navigate = useNavigate();
  const logoutHandler = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return token && userRole === "Admin" ? (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <Link to="/admin" className="sidebar-title text-white">
          Admin Dashboard
        </Link>
        <nav className="nav-menu">
          <ul>
            <li>
              <Link to="/admin/getnotice">
                <FaClipboardList className="icon" /> Get All Notices
              </Link>
            </li>

            <li>
              <Link to="/admin/getcontact">
                <FaAddressBook className="icon" /> Get All Contacts
              </Link>
            </li>

            <li>
              <Link to="/admin/getuser">
                <FaUsers className="icon" /> Get All Users
              </Link>
            </li>
            <li>
              <Link to="admin/createevent">
                <MdEvent className="icon" />
                Get All Events
              </Link>
            </li>
            <li onClick={logoutHandler} style={{ cursor: "pointer" }}>
              <FaSignOutAlt className="icon" />
              Logout
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet /> {/* Where the child routes will render */}
      </main>
    </div>
  ) : token ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default AdminRoute;
