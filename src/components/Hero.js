import React from "react";
import hero from '../images/hero_image.jpg';
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h2>“A room without books is like a body without a soul.”</h2>
        <p>
          Dive into the world of stories, knowledge, and inspiration.
          Let your next chapter begin here.
        </p>
        <div className="hero-buttons">
          <a href="/explore" className="cta-primary">Explore Now</a>
          <a href="/about" className="cta-secondary">Learn More</a>
        </div>
      </div>
      <div className="hero-image">
        <img src={hero} alt="Bookshelf with books" />
      </div>
    </div>
  );
};

export default Hero;
