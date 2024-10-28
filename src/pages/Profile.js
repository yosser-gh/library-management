import React from 'react';
//import './Profile.css';

function Profile() {
  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <section className="info">
        <h3>Personal Information</h3>
        <p>Name: John Doe</p>
        <p>Library Card Number: 12345</p>
      </section>
      <section className="borrowed-books">
        <h3>Currently Borrowed Books</h3>
        <ul>
          <li>The Great Gatsby - Due: 2024-11-30</li>
          <li>1984 - Due: 2024-12-10</li>
        </ul>
      </section>
      <section className="history">
        <h3>Borrowing History</h3>
        <ul>
          <li>To Kill a Mockingbird - Returned: 2024-10-10</li>
        </ul>
      </section>
    </div>
  );
}

export default Profile;
