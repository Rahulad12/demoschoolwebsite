import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

// Apply Bootstrap 5 styling to DataTable
DataTable.use(DT);

const AdminGetAllContact = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [contact, setContact] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");


  // Fetch all contacts when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${backend_url}/contact`);
        setContact(res.data);
        setFeedbackType("success");
      } catch (error) {
        setFeedback(
          error.response?.data?.message || "Failed to fetch contacts"
        );
        setFeedbackType("danger");
      }
    };
    fetchContact();
  }, []);

  // Handle contact deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backend_url}/contact/${id}`);
      setFeedback("Contact deleted successfully");
      setFeedbackType("success");
      setContact((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      ); // Update state after deletion
    } catch (error) {
      setFeedback(error.response?.data?.message || "Failed to delete contact");
      setFeedbackType("danger");
    }
  };

  // Define DataTable columns
  const columns = [
    { title: "Name", data: "name" },
    { title: "Email", data: "email" },
    { title: "Phone", data: "phone" },
    { title: "Message", data: "message" },
    {
      title: "Actions",
      data: null,
      render: function (data, type, row) {
        return `<button class="btn btn-danger btn-sm delete-btn" data-id="${row._id}">Delete</button>`;
      },
      orderable: false, // Disable sorting on this column
    },
  ];

  // Add a click listener to handle the delete button click inside the table
  useEffect(() => {
    const table = document.querySelector("table");
    if (table) {
      const handleClick = (event) => {
        const target = event.target;
        if (target.classList.contains("delete-btn")) {
          const contactId = target.getAttribute("data-id");
          handleDelete(contactId); // Call the handleDelete function with the contact ID
        }
      };
      table.addEventListener("click", handleClick);
      return () => {
        table.removeEventListener("click", handleClick);
      };
    }
  }, [contact]);

  return (
    <div>
      <h1 className="text-center my-3">Contact List</h1>
      {feedback && (
        <Alert variant={feedbackType} className="text-center" dismissible onClose={()=>setFeedback("")}>
          {feedback}
        </Alert>
      )}

      <DataTable
        data={contact}
        columns={columns}
        options={{
          responsive: true,
          paging: true,
          searching: true,
          ordering: true,
          info: true,
          language: {
            searchPlaceholder: "Search contacts...",
            lengthMenu: "Show _MENU_ entries",
          },
        }}
        className="table table-striped table-bordered"
      />
    </div>
  );
};

export default AdminGetAllContact;
