import React, { useState } from "react";
import {
  Container,
  Button,
  Form,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const AdminCreateUser = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbacktype, setFeedbacktype] = useState("");

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmpassword) {
      setFeedback("Passwords do not match.");
      setFeedbacktype("danger");
      return; // Exit if passwords don't match
    }

    // Proceed with user creation by sending a request to the backend
    try {
      const res = await axios.post(`${backend_url}/auth/register`, {
        username,
        password,
        userRole,
      });

      setFeedback(res.data.message); // Backend feedback (success or error)
      setFeedbacktype("success");
      setUsername("");
      setPassword("");
      setConfirmpassword("");
      setUserRole("");
    } catch (error) {
      setFeedback(error?.response?.data?.message || "Error occurred.");
      setFeedbacktype("danger");
    }
  };

  return (
    <Container className="my-4">
      {feedback && (
        <Alert
          variant={feedbacktype}
          dismissible
          onClose={() => setFeedback("")}
        >
          {feedback}
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Create New User</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    isInvalid={feedback && feedbacktype === "danger"}
                  />
                </Form.Group>

                <Form.Group
                  controlId="password"
                  className="mb-3 position-relative"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    isInvalid={feedback && feedbacktype === "danger"}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "65%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </Form.Group>

                <Form.Group
                  controlId="confirmpassword"
                  className="mb-3 position-relative"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    required
                    isInvalid={feedback && feedbacktype === "danger"}
                  />
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "75%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </Form.Group>

                <Form.Group controlId="userrole" className="mb-3">
                  <Form.Label>User Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    required
                    isInvalid={feedback && feedbacktype === "danger"}
                  >
                    <option value="">Select Role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="warning" type="submit" block>
                  Create User
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateUser;
