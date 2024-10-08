import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Image } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <MDBFooter
        className="text-center text-lg-start text-muted"
        style={{
          backgroundColor: "rgba(22, 34, 57, 0.95)",
          boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.3)",
          color: "#fff",
        }}
      >
        <section className=" text-center p-4 border-bottom">
          <h3 className="mx-2 text-white">Follow Us On Our Social Media</h3>
          <div>
            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="https://www.facebook.com/anjan.deepikaschool"
              target="_blank"
              role="button"
              size="lg"
              ripple="true"
            >
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="https://www.instagram.com/deepika_school_koteshwor?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              role="button"
              target="_blank"
              size="lg"
              ripple="true"
            >
              <MDBIcon fab icon="instagram" />
            </MDBBtn>

            <MDBBtn
              floating
              className="m-1"
              style={{ backgroundColor: "#333333" }}
              href="https://www.tiktok.com/@deepikaschool0"
              target="_blank"
              role="button"
              size="lg"
              ripple="true"
            >
              <MDBIcon fab icon="tiktok" />
            </MDBBtn>
          </div>
        </section>

        <section className="py-5">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#f1f1f1", letterSpacing: "1px" }}
                >
                  <MDBIcon color="secondary" icon="gem" className="me-3" />
                  Deepika School
                </h6>
                <Image
                  src="images/deepikalogo.png"
                  style={{
                    width: "200px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#fff",
                  }}
                />
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#f1f1f1" }}
                >
                  Why Choose Us
                </h6>
                <p style={{ color: "#ccc" }}>Best Education</p>
                <p style={{ color: "#ccc" }}>Extra Curriculum</p>
                <p style={{ color: "#ccc" }}>Outing</p>
                <p style={{ color: "#ccc" }}>Event</p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6
                  className="text-uppercase fw-bold mb-4"
                  style={{ color: "#f1f1f1" }}
                >
                  Contact
                </h6>
                <p style={{ color: "#ccc" }}>
                  <MDBIcon color="secondary" icon="home"  className="me-2" />
                  Koteshwor, Kathmandu, Nepal
                </p>
                <p>
                  <MDBIcon color="secondary" icon="envelope" className="me-3" />
                  <a
                    href="mailto:adm.deepikaschool@gmail.com"
                    style={{ color: "#ccc" }}
                  >
                    adm.deepikaschool@gmail.com
                  </a>
                </p>
                <p>
                  <MDBIcon color="secondary" icon="phone" className="me-3" />{" "}
                  <a href="tel:01-4602601" style={{ color: "#ccc" }}>
                    +977-01-514-833
                  </a>
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            color: "#ccc",
          }}
        >
          © 2024 Copyright:{" "}
          <a
            className="text-reset fw-bold"
            target="_blank"
            href="https://coderahul.onrender.com/" // Replace with your website link
            style={{ color: "#f1f1f1", textDecoration: "none" }}
          >
            coderahul.onrender.com
          </a>{" "}
          | Developed by Rahul Adhikari |
          <a href="mailto:adrahul2014@gmail.com">
            <MDBIcon color="danger" icon="envelope" className="me-3 mx-2" />
          </a>
          |
          <a
            href="https://www.linkedin.com/in/rahul-adhikari-7b2a87214/"
            target="_blank"
          >
            <MDBIcon
              color="primary"
              fab
              icon="linkedin"
              className="me-3 mx-2"
            />
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default Footer;
