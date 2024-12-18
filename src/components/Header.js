import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Header.css';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user state and token
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

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
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
