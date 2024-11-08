import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="header-logo">NextChapter</h1>
      
      <div className="search-bar">
        <input type="text" placeholder="Search for books, authors..." />
      </div>
      
      <ul className="nav-links">
        <li><a href="/books">Books</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/account">Account</a></li>
      </ul>
    </div>
  );
};

export default Header;
