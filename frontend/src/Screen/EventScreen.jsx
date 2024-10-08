// src/components/EventScreen.jsx
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../customcss/EventScreen.css"; // Custom CSS for Calendar

const localizer = momentLocalizer(moment); // Setup moment localizer for date handling

const EventScreen = () => {
  const [events, setEvents] = useState([]);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from the backend API
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${backend_url}/event`); // Fetch events from the backend
      const formattedEvents = res.data
        .map((event) => {
          const eventDate = new Date(event.date);
          if (!isNaN(eventDate)) {
            return {
              title: event.title,
              start: eventDate, // Convert to Date object
              end: eventDate,
              allDay: true,
              description: event.description,
              eventType: event.type,
            };
          }
          return null; // Handle invalid date
        })
        .filter(Boolean);

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Custom styling based on event type
  const eventStyleGetter = (event) => {
    let backgroundColor = event.eventType === "Holiday" ? "red" : "yellow";
    let style = {
      backgroundColor: backgroundColor,
      color: "black",
      borderRadius: "5px",
      border: "none",
      display: "block",
    };
    return { style: style };
  };

  return (
    <div className="big-calendar-container" style={{ marginTop: "5.5rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        views={["month"]}
        popup
      />
    </div>
  );
};

export default EventScreen;
