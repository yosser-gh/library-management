import React from 'react';
import { Link } from 'react-router-dom';
import club from '../images/book-club-image.jpg';
import poetry from '../images/poetry.jpg';
import BOM from '../images/books-of-the-month.jpg';
import './Spotlight.css';

const Spotlight = () => {
  const spotlightEvents = [
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

  return (
    <section className="SpotlightContainer">
      <h2>Spotlight</h2>
      <div className="SpotlightItems">
        {spotlightEvents.map((event) => (
          <div className="SpotlightCard" key={event.id}>
            <img src={event.image} alt={event.title} />
            <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
                <Link to={`/events/${event.id}`}>
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
