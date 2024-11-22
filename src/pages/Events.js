import React from "react";
import { Link } from "react-router-dom";
import club from '../images/book-club-image.jpg'
import poetry from '../images/poetry.jpg'
import BOM from '../images/books-of-the-month.jpg'
import "./Events.css";


const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Join the CCL Book Club Now!",
      date: "December 1, 2024",
      description: "A monthly gathering to discuss our favorite books.",
      image: club,
    },
    {
      id: 2,
      title: "Poetry Competition Starting Soon",
      date: "December 10, 2024",
      description: "Showcase your talent in our annual poetry competition.",
      image: poetry,
    },
    {
        id: 3,
        title: "Our readers' Book of the Month",
        date: "December 25, 2024",
        description: "A monthly gathering to discuss our favorite books.",
        image: BOM,
      },

  ];

  const previousEvents = [
    { id: 1, title: "Book Fair 2023", date: "June 15, 2023" },
    { id: 2, title: "Author Meet & Greet", date: "March 10, 2024" },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Event submitted successfully!");
  };

  return (
    <div className="event-page">
    
      <section className=" sections upcoming-events">
        <h2>Upcoming Events</h2>
        <div className="event-grid">
          {upcomingEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <img src={event.image} alt={event.title} />
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
                <Link to={`/events/${event.id}`}>
                  <button className="cta-btn">Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className=" sections previous-events">
        <h2>Previous Events</h2>
        <div className="event-list">
          {previousEvents.map((event) => (
            <div className="event-item" key={event.id}>
              <h4>{event.title}</h4>
              <p>{event.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className=" sections organize-event">
        <h2>Organize an Event</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Event Title:</label>
          <input type="text" id="title" name="title" required />

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />

          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" required></textarea>

          <label htmlFor="image">Upload relevant files:</label>
          <input type="file" id="image" name="image" accept="image/*"  />

          <button type="submit" className="cta-btn">Send Request</button>
        </form>
      </section>

    </div>
  );
};

export default Events;
