import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2>Library</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/events">Events</Link>
        <Link to="/profile">Profile</Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin">Admin Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
