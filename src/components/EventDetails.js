import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  console.log("Event ID from URL:", id);
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        console.log("Response status:", response.status);
        const data = await response.json(); // Parse JSON directly
        console.log("Fetched event data:", data); // Log the parsed data
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
  
    fetchEvent();
  }, [id]);
  

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="event-details-container">
      <div className="event-image">
        <img src={`http://localhost:5000${event.image}` || "https://via.placeholder.com/600"} alt={event.name} />
      </div>

      <div className="event-content">
        <h1>{event.name}</h1>
        <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
        <p className="event-description">{event.description}</p>

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
            <form>
              <label>
                Name:
                <input type="text" required />
              </label>
              <label>
                Email:
                <input type="email" required />
              </label>
              <label>
                Comments:
                <textarea rows="3"></textarea>
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
