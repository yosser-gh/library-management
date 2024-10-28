import React from 'react';
//import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <section>
        <h3>Manage Books</h3>
        <button>Add New Book</button>
        <button>Edit Book</button>
        <button>Delete Book</button>
      </section>
      <section>
        <h3>Manage Users</h3>
        <button>View Users</button>
        <button>Edit User</button>
      </section>
      <section>
        <h3>Manage Events</h3>
        <button>Add New Event</button>
        <button>Edit Event</button>
      </section>
    </div>
  );
}

export default AdminDashboard;
