import React from 'react';
//import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="welcome-banner">
        <h1>Welcome to Your Library</h1>
        <p>Your gateway to knowledge and community events</p>
      </div>
      <section className="featured">
        <h2>Featured Books</h2>
        {/* Map over featured books data here */}
        <div className="book-grid">
          {/* Placeholder book items */}
          <div className="book-card">The Great Gatsby</div>
          <div className="book-card">1984</div>
          <div className="book-card">To Kill a Mockingbird</div>
        </div>
      </section>
      <section className="events">
        <h2>Upcoming Events</h2>
        {/* Map over upcoming events data here */}
        <div className="event-list">
          <div className="event-card">Book Club Meeting</div>
          <div className="event-card">Storytime for Kids</div>
        </div>
      </section>
      <section className="about">
        <h2>About Us</h2>
        <p>Learn more about our mission to foster learning and community growth.</p>
      </section>
    </div>
  );
}

export default Home;
