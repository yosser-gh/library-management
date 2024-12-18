import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch profile data.");
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Error loading profile data.</div>;
  }

  const { user, registeredEvents, loanedBooks } = profileData;

  const renderAccountDetails = () => (
    <div className="content-section">
      <div className="profile-header">
        <img src={user.avatar} alt="Profile" className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>Member since {new Date(user.memberSince).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="profile-buttons">
        <button className="btn btn-edit">Edit Profile</button>
        <button className="btn btn-logout">Logout</button>
      </div>
    </div>
  );

  const renderRegisteredEvents = () => (
    <div className="content-section">
      <h3>Registered Events</h3>
      {registeredEvents.map((event) => (
        <div key={event._id} className="event-item">
          <div>
            <h4>{event.name}</h4>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
          <span>{event.location}</span>
        </div>
      ))}
    </div>
  );

  const renderLoanedBooks = () => (
    <div className="content-section">
      <h3>Loaned Books</h3>
      {loanedBooks.map((book) => (
        <div key={book._id} className="book-item">
          <div>
            <h4>{book.title}</h4>
            <p>{book.author}</p>
          </div>
          <span>Due: {new Date(book.dueDate).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );


  const renderSettings = () => (
    <div className="content-section">
      <h3>Account Settings</h3>
      <div className="settings-item">
        <span>Notifications</span>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="toggle-slider"></span>
        </label>
      </div>
      <div className="settings-item">
        <span>Dark Mode</span>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'account': return renderAccountDetails();
      case 'events': return renderRegisteredEvents();
      case 'books': return renderLoanedBooks();
      case 'settings': return renderSettings();
      default: return renderAccountDetails();
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <nav className="sidebar-nav">
          {[
            { key: 'account', label: 'Account' },
            { key: 'events', label: 'Events' },
            { key: 'books', label: 'Loaned Books' },
            { key: 'recommended', label: 'Recommendations' },
            { key: 'settings', label: 'Settings' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={activeTab === item.key ? 'active' : ''}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="profile-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;