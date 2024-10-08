import React, { useState } from "react";
import { MDBInput, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import "../customcss/Contact.css"; // Ensure this CSS file exists for custom styles
import axios from "axios";

const Contact = () => {

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbacktype, setFeedbackType] = useState("text-danger");

  // Clear form after successful submission
  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!name || !email || !phone || !message) {
      setFeedback("Please fill all the fields.");
      setFeedbackType("text-danger");
      return;
    }

    // Phone number validation
    if (phone.length !== 10 || isNaN(phone)) {
      setFeedback("Phone number must be 10 digits and numeric.");
      setFeedbackType("text-danger");
      return;
    }

    const data = {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      phone,
      message,
    };

    try {
      const res = await axios.post(`${backend_url}/contact`, data);

      if (res && res.data) {
        setFeedback("Message sent successfully.");
        setFeedbackType("text-success");
        clearForm();
      }
    } catch (error) {
      console.error(error);
      setFeedback("Something went wrong. Please try again.");
      setFeedbackType("text-danger");
    }
  };

  return (
    <section className="section contact my-3" data-section="section6">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading text-center">
              <h2 className="text-dark mb-3">Let’s Keep In Touch</h2>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <form
              id="form"
              className="text-center"
              style={{ width: "100%", maxWidth: "300px" }}
              onSubmit={handleSubmit}
            >
              <h2 className="text-white">Contact us</h2>

              <MDBInput
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                wrapperClass="mb-4"
              />

              <MDBInput
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                wrapperClass="mb-4"
              />

              <MDBInput
                type="tel"
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                wrapperClass="mb-4"
              />

              <MDBTextArea
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                wrapperClass="mb-4"
              />

              <MDBBtn color="warning" block className="my-4" type="submit">
                Connect With Us
              </MDBBtn>

              <small className={feedbacktype}>{feedback}</small>
            </form>
          </div>
          <div className="col-md-6">
            <div id="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.2119012997046!2d85.34100897546641!3d27.679844876198374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ed736bb12d%3A0xacd65e793233ec30!2sDeepika%20School!5e0!3m2!1sen!2snp!4v1727209584275!5m2!1sen!2snp"
                width="100%"
                height="422px"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                title="Google Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
