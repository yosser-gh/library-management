import React from 'react';
import { FaBookOpen, FaUserGraduate, FaCalendarAlt, FaLaptop } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Welcome to NextChapter Library</h1>
        <p>Inspiring curiosity, promoting literacy, and cultivating a love of reading since 1985.</p>
      </header>

      <main>
        <section className="about-section">
          <div className="section-icon">
            <FaBookOpen size={40} color="#007bff" />
          </div>
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              At NextChapter Library, our mission is to provide the residents of NextCity with access to a vast collection of books, resources, and educational programs.
              We believe that a vibrant public library is the cornerstone of a thriving community, and we strive to be a welcoming and inclusive space for everyone.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="section-icon">
            <FaCalendarAlt size={40} color="#007bff" />
          </div>
          <div className="section-content">
            <h2>Our History</h2>
            <div className="highlight">
              <p>
                NextChapter Library was established in 1985 by a group of passionate community members who recognized the need for a centralized hub for knowledge and learning.
                Over the years, we have grown to become one of the largest public library systems in the region, with three branches located throughout NextCity.
              </p>
              <p>
                Our original location, the Main Branch, has undergone several renovations and expansions to keep up with the changing needs of our patrons.
                In 2010, we opened the West Branch to serve the growing population in that area of the city, and in 2018, we launched the East Branch to provide greater accessibility to our services.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="section-icon">
            <FaLaptop size={40} color="#007bff" />
          </div>
          <div className="section-content">
            <h2>Our Collection and Services</h2>
            <p>
              NextChapter Library boasts a vast and diverse collection of over 500,000 physical books, as well as a growing digital library of e-books, audiobooks, and online resources.
              Our collection spans a wide range of genres, from fiction and non-fiction to children's books and foreign language materials.
            </p>
            <p>
              In addition to our extensive collection, we offer a variety of services and programs to the community, including:
            </p>
            <ul>
              <li>Children's story time and educational workshops</li>
              <li>Teen book clubs and coding classes</li>
              <li>Adult literacy classes and language learning programs</li>
              <li>Community events, author talks, and cultural celebrations</li>
              <li>Free access to public computers and high-speed internet</li>
              <li>Interlibrary loan services and research assistance</li>
            </ul>
          </div>
        </section>
      </main>

    </div>
  );
};

export default About;