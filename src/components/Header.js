import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="header-logo">
        <Link to="/">NextChapter</Link>
      </h1>

      <div className="search-bar">
        <input type="text" placeholder="Search for books, authors..." />
      </div>

      <ul className="nav-links">
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
};


export default Header;
