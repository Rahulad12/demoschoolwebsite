import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const AdminLogin = () => {

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showpassword, setShowpassword] = useState("password");
  const [feedbacktype, setFeedbacktype] = useState("");

  console.log(showpassword);

  const navigate = useNavigate();
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backend_url}/auth/login`,
        {
          username,
          password,
        }
      );

      console.log(data);

      localStorage.setItem("token", data?.token);
      localStorage.setItem("userRole", data?.userRole);
      setFeedback("User logged in");
      setFeedbacktype("text-success");

      navigate("/admin");
    } catch (error) {
      setFeedback(error?.response?.data?.message);
      setFeedbacktype("text-danger");
    }
  };
  return (
    <Container className="d-flex justify-content-center align-item-center" style={{marginTop:"5rem"}}>
      <Form onSubmit={submithandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showpassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <Form.Group controlId="formBasicCheckbox" className="my-3">
            <Form.Check type="checkbox" label="Show Password" checked={showpassword} onChange={()=>setShowpassword(!showpassword)}/>
          </Form.Group>
          {feedback && <span className={feedbacktype}>{feedback}</span>}
        </Form.Group>
        <Button variant="primary" type="submit" className="my-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AdminLogin;
