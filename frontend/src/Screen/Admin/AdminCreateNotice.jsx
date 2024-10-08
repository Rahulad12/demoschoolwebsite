import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Alert, Button, Card, Image } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const AdminCreateNotice = () => {

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [noticeStatus, setNoticeStatus] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [showFeedback, setShowFeedback] = useState(true);
  const [imagePreview, setImagePreview] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setFeedback("Please fill in all the fields");
      setFeedbackType("danger");
      setShowFeedback(true);
      return;
    }

    try {
      const res = await axios.post(`${backend_url}/notice`, {
        title: title.toUpperCase(),
        description,
        image,
        shownotice: noticeStatus,
      });

      setFeedback(res?.data?.message || "Notice created successfully.");
      setFeedbackType("success");
      setTitle("");
      setDescription("");
      setImage("");

      setNoticeStatus(false);
      setImagePreview("");
      setShowFeedback(true);
    } catch (error) {
      setFeedback(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setFeedbackType("danger");
      setShowFeedback(true);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${backend_url}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);
      setImage(res?.data?.image); // assuming your backend returns the image path
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    } catch (error) {
      setFeedback(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setFeedbackType("danger");
      setShowFeedback(true);
    }
  };

  console.log(image);
  return (
    <div>
      <Container>
        <Card className="p-4 shadow-lg">
          <h2 className="text-center mb-4">Create a New Notice</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the notice title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter the notice description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                label="Choose File"
                onChange={handleImageChange}
              />
            </Form.Group>

            {imagePreview && (
              <div className="mb-3">
                <Image src={imagePreview} alt="Image Preview" thumbnail fluid />
              </div>
            )}

            <Form.Group className="my-3">
              <Form.Check
                type="checkbox"
                label="Display Notice"
                checked={noticeStatus}
                onChange={(e) => setNoticeStatus(e.target.checked)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="warning"
              className="d-block w-100 mb-3"
            >
              Create Notice
            </Button>
          </Form>

          {feedback && showFeedback && (
            <Alert
              variant={feedbackType}
              className="mt-3"
              dismissible
              onClose={() => setShowFeedback(false)}
            >
              {feedbackType === "success" ? (
                <FaCheckCircle className="me-2" />
              ) : (
                <FaExclamationTriangle className="me-2" />
              )}
              {feedback}
            </Alert>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default AdminCreateNotice;
