import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import axios from "axios";
import moment from "moment"; // For date formatting

const NoticeScreen = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [notices, setNotices] = useState([]);
  const [badgecolor, setBadgeColor] = useState("success");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data } = await axios.get(`${backend_url}/notice`);
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div style={{ marginTop: "5rem" }}>
      <Container className="my-3">
        <Row className="g-4">
          {notices.map((notice) => (
            <Col key={notice._id} md={4} lg={3}>
              <Card className="mx-3">
                <Card.Body>
                  <Card.Title>{notice.title}</Card.Title>
                  <Card.Text>{notice.description}</Card.Text>
                  <Card.Img variant="top" src={notice.image} />
                  <Card.Text>
                    <small className="text-muted">
                      Created at:{" "}
                      {moment(notice.date).format("MMMM Do YYYY, h:mm:ss a")}
                    </small>
                  </Card.Text>
                  <Badge bg={notice.shownotice == true ? "success" : "danger"}>
                    {notice.shownotice === true ? "Active" : "Inactive"}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {notices.length === 0 && <h1 className="text-center">No Notices To Display</h1>}
        </Row>
      </Container>
    </div>
  );
};

export default NoticeScreen;
