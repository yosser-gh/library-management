import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Spotlight.css';

const Spotlight = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="SpotlightContainer">
      <h2>Spotlight</h2>
      <div className="SpotlightItems">
        {events.slice(0, 3).map((event) => (
          <div className="SpotlightCard" key={event._id}>
            <img src={`http://localhost:5000${event.image}` || "https://via.placeholder.com/300"} alt={event.name} />
            <div className="event-details">
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.description.slice(0, 100)}...</p>
              <Link to={`/events/${event._id}`}>
                <button className="Button">Read More..</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Spotlight;
