import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Modal,
  Form,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import axios from "axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTable.use(DT);

const AdminGetUser = () => {

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbacktype, setFeedbacktype] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${backend_url}/auth/getalluser`
        );
        setUsers(data.user);
      } catch (error) {
        setFeedback(error?.response?.data?.message);
        setFeedbacktype("danger");
      }
    };
    fetchUser();
  }, []);

  const updateUser = async (id) => {
    try {
      await axios.put(`${backend_url}/auth/updateuser/${id}`, {
        username,
        password,
        userRole,
      });
      setFeedback("User updated successfully");
      setFeedbacktype("success");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, username, userRole } : user
        )
      );
    } catch (error) {
      setFeedback(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setFeedbacktype("danger");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backend_url}/auth/deleteuser/${id}`);
      setFeedback("User deleted successfully");
      setFeedbacktype("success");
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      setFeedback(error.response?.data?.message || "Failed to delete user");
      setFeedbacktype("danger");
    }
  };

  const handleUpdateClick = (user) => {
    setSelectedUserId(user._id);
    setUsername(user.username);
    setUserRole(user.userRole);
    setShow(true);
  };

  const columns = [
    { title: "Username", data: "username" },
    { title: "Role", data: "userRole" },
    {
      title: "Actions",
      data: null,
      render: function (data, type, row) {
        return `
          <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${row._id}">
            <i class="fa fa-trash"></i> Delete
          </button>
          <button class="btn btn-sm btn-outline-warning update-btn" data-id="${row._id}">
            <i class="fa fa-edit"></i> Update
          </button>
        `;
      },
      orderable: false,
    },
  ];

  useEffect(() => {
    const table = document.querySelector("table");
    if (table) {
      const handleClick = (event) => {
        const target = event.target.closest("button");
        if (!target) return;
        if (target.classList.contains("delete-btn")) {
          const userId = target.getAttribute("data-id");
          handleDelete(userId);
        } else if (target.classList.contains("update-btn")) {
          const userId = target.getAttribute("data-id");
          const user = users.find((user) => user._id === userId);
          if (user) handleUpdateClick(user);
        }
      };
      table.addEventListener("click", handleClick);
      return () => {
        table.removeEventListener("click", handleClick);
      };
    }
  }, [users]);

  const CreateUser = () => {
    navigate("/admin/createuser");
  };

  return (
    <>
      {feedback && (
        <Alert
          variant={feedbacktype}
          dismissible
          onClose={() => setFeedback("")}
          className="my-3"
        >
          {feedback}
        </Alert>
      )}

      <div className="container">
        <h1 className="text-center mb-4">User Management</h1>
        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" size="sm" onClick={CreateUser}>
            <i className="fa fa-plus"></i> Create User
          </Button>
        </div>

        <DataTable
          data={users}
          columns={columns}
          options={{
            responsive: true,
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            language: {
              searchPlaceholder: "Search users...",
              lengthMenu: "Show _MENU_ entries",
            },
          }}
          className="table table-striped table-hover table-bordered"
        />

        {/* Update Modal */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="userRole">
                <Form.Label>User Role</Form.Label>
                <Form.Control
                  as="select"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Form.Control>
              </Form.Group>

              <Button
                variant="warning"
                className="mt-3"
                onClick={() => updateUser(selectedUserId)}
              >
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AdminGetUser;
