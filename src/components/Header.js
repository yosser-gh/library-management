import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const Header = ({ user, setUser }) => {
  return (
    <div className="header-container">
      <h1 className="header-logo">
        <Link to="/">NextChapter</Link>
      </h1>

      {/* Show the search bar only for logged-in users */}
      {user && (
        <div className="search-bar">
          <input type="text" placeholder="Search for books, authors..." />
        </div>
      )}

      <ul className="nav-links">
        {/* Conditional Links */}
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        ) : user.role === "admin" ? (
          <>
            <li><Link to="/dashboard">Admin Dashboard</Link></li>
            <li><button  onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
