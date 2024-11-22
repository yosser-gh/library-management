import React, { useState } from 'react';
import './Profile.css'; 

const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');

  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    memberSince: 'January 2023',
    avatar: 'https://via.placeholder.com/120'
  };

  const registeredEvents = [
    { 
      id: 1, 
      name: 'Summer Reading Challenge', 
      date: 'August 15, 2024', 
      location: 'City Library'
    },
    { 
      id: 2, 
      name: 'Author Meet & Greet', 
      date: 'September 5, 2024', 
      location: 'Community Center'
    }
  ];

  const loanedBooks = [
    { 
      id: 1, 
      title: 'The Midnight Library', 
      author: 'Matt Haig', 
      dueDate: 'July 20, 2024'
    },
    { 
      id: 2, 
      title: 'Atomic Habits', 
      author: 'James Clear', 
      dueDate: 'August 1, 2024'
    }
  ];

  const recommendedBooks = [
    { 
      id: 1, 
      title: 'Project Hail Mary', 
      author: 'Andy Weir', 
      coverImage: 'https://via.placeholder.com/150x250'
    },
    { 
      id: 2, 
      title: 'Sapiens', 
      author: 'Yuval Noah Harari', 
      coverImage: 'https://via.placeholder.com/150x250'
    }
  ];

  const renderAccountDetails = () => (
    <div className="content-section">
      <div className="profile-header">
        <img 
          src={userData.avatar} 
          alt="Profile" 
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
          <p>Member since {userData.memberSince}</p>
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
      {registeredEvents.map(event => (
        <div key={event.id} className="event-item">
          <div>
            <h4>{event.name}</h4>
            <p>{event.date}</p>
          </div>
          <span>{event.location}</span>
        </div>
      ))}
    </div>
  );

  const renderLoanedBooks = () => (
    <div className="content-section">
      <h3>Loaned Books</h3>
      {loanedBooks.map(book => (
        <div key={book.id} className="book-item">
          <div>
            <h4>{book.title}</h4>
            <p>{book.author}</p>
          </div>
          <span>Due: {book.dueDate}</span>
        </div>
      ))}
    </div>
  );

  const renderRecommendedBooks = () => (
    <div className="content-section">
      <h3>Recommended Books</h3>
      <div className="recommended-books">
        {recommendedBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.coverImage} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
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
      case 'recommended': return renderRecommendedBooks();
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