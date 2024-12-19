import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    avatar: ""
  });

  useEffect(() => {
    fetchProfileData();
  }, []);


  const handleRemoveEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to unregister from this event?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/user/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to remove event");
      
      // Refresh profile data
      await fetchProfileData();
    } catch (error) {
      console.error("Error removing event:", error);
    }
  };


  const handleReturnBook = async (loanId) => {
    if (!window.confirm("Are you sure you want to return this book?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/user/loans/${loanId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to return book");
      
      // Refresh profile data
      await fetchProfileData();
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch profile data");
      const data = await response.json();
      setProfileData(data);
      setEditForm({
        username: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
        currentPassword: "",
        newPassword: ""
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error("Failed to update profile");
      
      await fetchProfileData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const renderAccountDetails = () => (
    <div className="content-section">
      <div className="profile-header">
        <img src={profileData.user.avatar} alt="Profile" className="profile-avatar" />
        <div className="profile-info">
          <h2>{profileData.user.name}</h2>
          <p>{profileData.user.email}</p>
          <p>Member since {new Date(profileData.user.memberSince).toLocaleDateString()}</p>
        </div>
      </div>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            placeholder="Username"
            value={editForm.username}
            onChange={(e) => setEditForm({...editForm, username: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            value={editForm.email}
            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
          />
          <input
            type="password"
            placeholder="Current Password"
            value={editForm.currentPassword}
            onChange={(e) => setEditForm({...editForm, currentPassword: e.target.value})}
          />
          <input
            type="password"
            placeholder="New Password (optional)"
            value={editForm.newPassword}
            onChange={(e) => setEditForm({...editForm, newPassword: e.target.value})}
          />
          <input
            type="url"
            placeholder="Avatar URL"
            value={editForm.avatar}
            onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
          />
          <div className="profile-buttons">
            <button type="submit" className="btn btn-edit">Save Changes</button>
            <button type="button" className="btn btn-logout" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-buttons">
          <button className="btn btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );

  const renderRegisteredEvents = () => (
    <div className="content-section">
      <h3>Registered Events</h3>
      {profileData.registeredEvents.length === 0 ? (
        <p>No registered events found.</p>
      ) : (
        profileData.registeredEvents.map((event) => (
          <div key={event._id} className="event-item">
            <div>
              <h4>{event.name}</h4>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.location}</p>
            </div>
            <button 
              onClick={() => handleRemoveEvent(event._id)}
              className="btn btn-remove"
            >
              Unregister
            </button>
          </div>
        ))
      )}
    </div>
  );

  const renderLoanedBooks = () => (
    <div className="content-section">
      <h3>Loaned Books</h3>
      {profileData.loanedBooks.length === 0 ? (
        <p>No loaned books found.</p>
      ) : (
        profileData.loanedBooks.map((book) => (
          <div key={book._id} className="book-item">
            <div>
              <h4>{book.title}</h4>
              <p>{book.author}</p>
              <p>Borrowed: {new Date(book.loanDate).toLocaleDateString()}</p>
            </div>
            <div className="book-actions">
              <span>Due: {new Date(book.dueDate).toLocaleDateString()}</span>
              {!book.returnDate && (
                <button 
                  onClick={() => handleReturnBook(book._id)}
                  className="btn btn-remove"
                >
                  Return Book
                </button>
              )}
            </div>
          </div>
        ))
      )}
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

  if (loading) return <div>Loading...</div>;
  if (!profileData) return <div>Error loading profile data.</div>;

  return (
    <div className="profile-container">
      <div className="sidebar">
        <nav className="sidebar-nav">
          {[
            { key: 'account', label: 'Account' },
            { key: 'events', label: 'Events' },
            { key: 'books', label: 'Loaned Books' },
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