import React from "react";
import { Outlet } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
const App = () => {
  return (
    <div>
      <Header />
      <MDBContainer fluid>
        <Outlet />
      </MDBContainer>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
