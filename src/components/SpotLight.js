import React from 'react';
import club from '../images/book-club-image.jpg'
import poetry from '../images/poetry.jpg'
import BOM from '../images/books-of-the-month.jpg'
import './Spotlight.css';

const Spotlight = () => {
  return (
    <section className="SpotlightContainer">
      <h2>Spotlight</h2>
      <div className="SpotlightItems">
        <div className="SpotlightCard">
          <img src={club} alt="Book Club" />
          <h3>Join the CCL Book Club Now!</h3>
          <button className="Button">Learn more..</button>
        </div>
        
        <div className="SpotlightCard">
          <img src={poetry} alt="Poetry Competition" />
          <h3>Poetry Competition starting soon</h3>
          <button className="Button">Learn more..</button>
        </div>

        <div className="SpotlightCard">
          <img src={BOM} alt="Book of the Month" />
          <h3>Our readers' Book of the Month</h3>
          <button className="Button">Learn more..</button>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
