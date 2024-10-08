import React, { useEffect, useState } from "react";
import { Modal, Container, Image } from "react-bootstrap";
import axios from "axios";

const Notice = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [show, setShow] = useState(true);
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`${backend_url}/notice`);
        if (res && res.data) {
          // Filtering notices to show only those that are active (shownotice: true)
          setNotice(res.data.filter((n) => n.shownotice === true));
        }
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    };

    fetchNotice();
  }, []);

  return (
    <div>
      {notice &&
        notice.map((n) => (
          <Modal
            key={n._id}
            show={show}
            onHide={() => setShow(false)}
            className="d-flex justify-content-center align-items-center"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Title className="text-center text-dark">
              {n.title}
            </Modal.Title>
            <Modal.Body>
              <Container>
                {/* Rendering the image from the full URL */}
                <Image
                  src={n.image} // The full image URL returned from the backend
                  fluid
                  alt={n.title}
                  className="mb-3"
                />
                <p className="text-dark">{n.description}</p>
                <small className="text-muted">
                  Created At: {new Date(n.date).toLocaleDateString()}
                </small>
              </Container>
            </Modal.Body>
          </Modal>
        ))}
    </div>
  );
};

export default Notice;
