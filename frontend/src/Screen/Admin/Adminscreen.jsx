import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const Adminscreen = () => {

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  
  const [dashboardData, setDashboardData] = useState({
    totalNotices: 0,
    totalUsers: 0,
    totalContacts: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes, usersRes, contactsRes, eventsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/notice"),
          axios.get("http://localhost:5000/api/auth/getalluser"),
          axios.get("http://localhost:5000/api/contact"),
          axios.get("http://localhost:5000/api/event"),
        ]);

        setDashboardData({
          totalNotices: noticesRes.data?.length || 0,
          totalUsers: usersRes.data?.user?.length || 0,
          totalContacts: contactsRes.data?.length || 0,
          totalEvents: eventsRes.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const { totalNotices, totalUsers, totalContacts, totalEvents } = dashboardData;

  const dashboardItems = [
    { title: "Total Notices", value: totalNotices },
    { title: "Total Users", value: totalUsers },
    { title: "Total Contacts", value: totalContacts },
    { title: "Total Events", value: totalEvents },
  ];

  return (
    <Container>
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <Row className="justify-content-between mb-4">
        {dashboardItems.map((item, index) => (
          <Col key={index} md={3} className="d-flex justify-content-center">
            <Card className="text-center" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Adminscreen;
