import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Alert } from "react-bootstrap";

const AdminGetAllEvent = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    type: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${backend_url}/event`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setFeedback("Failed to fetch events. Please try again later.");
      setFeedbackType("danger");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create new event
  const handleCreate = async () => {
    try {
      await axios.post(`${backend_url}/event`, formData);
      fetchEvents(); // Refresh event list
      handleClose();
      setFeedback("Event Created Successfully");
      setFeedbackType("success");
    } catch (err) {
      setFeedback("Failed to create event. Please check your input.");
      setFeedbackType("danger");
    } finally {
      clearFeedbackAfterDelay();
    }
  };

  // Edit event
  const handleEdit = (id) => {
    setEditMode(true);
    const eventToEdit = events.find((event) => event._id === id);
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title,
        date: new Date(eventToEdit.date).toISOString().split("T")[0], // Format date
        type: eventToEdit.type,
      });
      setEditEventId(id);
      setShow(true);
    } else {
      console.error("Event to edit not found.");
    }
  };

  // Update event
  const handleUpdate = async () => {
    try {
      await axios.put(`${backend_url}/event/${editEventId}`, formData);
      fetchEvents(); // Refresh event list after updating
      handleClose();
      setFeedback("Event Updated Successfully");
      setFeedbackType("success");
    } catch (err) {
      setFeedback("Error updating event. Please try again.");
      setFeedbackType("danger");
    } finally {
      clearFeedbackAfterDelay();
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${backend_url}/event/${id}`);
        fetchEvents();
        setFeedback("Event Deleted Successfully");
        setFeedbackType("success");
      } catch (err) {
        setFeedback("Error Deleting Event");
        setFeedbackType("danger");
      } finally {
        clearFeedbackAfterDelay();
      }
    }
  };

  // Close Modal and Reset Form Data
  const handleClose = () => {
    setShow(false);
    setFormData({
      title: "",
      date: "",
      type: "",
    });
    setEditMode(false);
  };

  // Open Modal
  const handleShow = () => setShow(true);

  // Clear feedback after a delay
  const clearFeedbackAfterDelay = () => {
    setTimeout(() => {
      setFeedback("");
      setFeedbackType("");
    }, 3000); // Clear after 3 seconds
  };

  return (
    <div className="container mt-5">
      {feedback && (
        <Alert
          variant={feedbackType}
          onClose={() => setFeedback("")}
          dismissible
        >
          {feedback}
        </Alert>
      )}
      <h2>Admin Event Management</h2>
      <Button variant="primary" onClick={handleShow}>
        Create Event
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.type}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(event._id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Create/Edit Event */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Event" : "Create Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDate" className="mt-3">
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formType" className="mt-3">
              <Form.Label>Event Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Notice">Notice</option>
                <option value="Holiday">Holiday</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={editMode ? handleUpdate : handleCreate}
          >
            {editMode ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminGetAllEvent;
