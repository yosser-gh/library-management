import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to register for events.");
    return;
  }

    try {
      const response = await fetch("http://localhost:5000/api/register-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: id,
          comments: formData.comments, // Include additional data if needed
        }),
      });

      if (response.ok) {
        alert("Successfully registered for the event!");
        setShowForm(false);
      } else {
        const { message } = await response.json();
        alert(`Error: ${message}`);
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="event-details-container">
      <div className="event-image">
        <img
          src={`http://localhost:5000${event.image}` || "https://via.placeholder.com/600"}
          alt={event.name}
        />
      </div>

      <div className="event-content">
        <h1>{event.name}</h1>
        <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
        <p className="event-description">
          <pre>{event.description}</pre>
        </p>

        <div className="buttons">
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
          <button onClick={() => setShowForm(true)} className="register-btn">
            Register
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Register for {event.name}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Comments:
                <textarea
                  name="comments"
                  rows="3"
                  value={formData.comments}
                  onChange={handleInputChange}
                ></textarea>
              </label>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
