import React from 'react';
import './Footer.css';
import { FaInstagram, FaTwitter, FaPinterest, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Get Involved</h2>
          <ul>
            <li><a href="#">Donate</a></li>
            <li><a href="#">Volunteer</a></li>
            <li><a href="#">Suggest a program</a></li>
            <li><a href="#">Organize an event</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>About NC</h2>
          <ul>
            <li><a href="#">Administration</a></li>
            <li><a href="#">Library Policies</a></li>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Connect</h2>
          <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">News and Press</a></li>
            <li><a href="#">Carrers</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Social</h2>
          <ul>
            <li><a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer"><FaPinterest /> Pinterest</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /> Facebook</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <hr className="footer-line" />
      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2024 Yosser ghrairi. All rights reserved.
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="#">English</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Cookie preferences</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;