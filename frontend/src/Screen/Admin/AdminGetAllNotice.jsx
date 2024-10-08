import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Table, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaTrashAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminGetAllNotice = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [notice, setNotice] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  const navigate = useNavigate();

  // Fetch all notices when the component mounts
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`${backend_url}/notice`);
        setNotice(res.data);
        setFeedbackType("success");
      } catch (error) {
        setFeedback(error.response?.data?.message || "Failed to fetch notices");
        setFeedbackType("danger");
      }
    };
    fetchNotice();
  }, []);

  // Handle notice deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backend_url}notice/${id}`);
      setFeedback("Notice deleted successfully");
      setFeedbackType("success");
      setNotice((prevNotice) =>
        prevNotice.filter((notice) => notice._id !== id)
      );
    } catch (error) {
      setFeedback(error.response?.data?.message || "Failed to delete notice");
      setFeedbackType("danger");
    }
  };

  // Handle notice toggle (check/uncheck)
  const toggleNotice = async (id, isChecked) => {
    try {
      await axios.put(`${backend_url}/notice/${id}`, {
        shownotice: isChecked,
      });
      setFeedback(`Notice ${isChecked ? "shown" : "hidden"} successfully`);
      setFeedbackType("success");
      setNotice((prevNotice) =>
        prevNotice.map((notice) =>
          notice._id === id ? { ...notice, shownotice: isChecked } : notice
        )
      );
    } catch (error) {
      setFeedback(error.response?.data?.message || "Failed to update notice");
      setFeedbackType("danger");
    }
  };

  const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

  const CreateNotice = () => {
    navigate("/admin/createnotice");
  };

  return (
    <div>
      {feedback && (
        <Alert
          variant={feedbackType}
          className="text-center"
          dismissible
          onClose={() => setFeedback("")}
        >
          {feedback}
        </Alert>
      )}

      <div className="container">
        <h1 className="text-center my-3">Notice List</h1>
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" size="sm" onClick={CreateNotice}>
            <i className="fa fa-plus"></i> Create Notice
          </Button>
        </div>
      </div>
      <Table
        striped
        bordered
        hover
        responsive
        className="text-center align-middle"
      >
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Date</th>
            <th>Show Notice</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notice.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.image}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip(
                    item.shownotice ? "Uncheck to hide" : "Check to show"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={item.shownotice}
                    onChange={(e) => toggleNotice(item._id, e.target.checked)}
                    className="form-check-input"
                  />
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip("Delete Notice")}
                >
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminGetAllNotice;
