import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import stats from "../components/stats";
import Stats from "../components/stats";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loans, setLoans] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [recentBooks, setRecentBooks] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [eventRegisteredUsers, setEventRegisteredUsers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchBooks(searchQuery, currentPage);
  }, [searchQuery, currentPage]);


  const fetchData = async () => {
    await fetchUsers();
    await fetchLoans();
    await fetchEvents();
    await fetchRecentBooks();
  };

  const fetchRecentBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/books/recent", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setRecentBooks(data);
    } catch (error) {
      console.error("Error fetching recent books:", error);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      // Filter out admin users
      setUsers(data.filter(user => user.role !== 'admin'));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/loans", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/events", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };




  const handleDelete = async (type, id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/${type}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchData();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleAddOrEditSubmit = async (type, formData) => {
    try {
      const method = editItem ? "PUT" : "POST"; // Determine method based on whether editing or adding
      const url = editItem
        ? `http://localhost:5000/api/admin/${type}/${editItem._id}` // Edit endpoint
        : `http://localhost:5000/api/admin/${type}`; // Add endpoint
  
      await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      setShowAddForm(false);
      setEditItem(null);
      fetchData(); // Refresh the data
    } catch (error) {
      console.error(`Error ${editItem ? "editing" : "adding"} ${type}:`, error);
    }
  };
  

  const handleAddNew = (type) => {
    setFormType(type); // Set the type (user, book, event, loan)
    setEditItem(null); // Clear any existing edit data
    setShowAddForm(true); // Show the form
  };

  const handleEditItem = (type, item) => {
    setFormType(type); // Set the type
    setEditItem(item); // Populate the form with existing data
    setShowAddForm(true); // Show the form
    setFormData(item);
  };
  


  const renderAddEditForm = () => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value }); // Update form data state
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddOrEditSubmit(formType, formData); // Call submission handler
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{editItem ? `Edit ${formType}` : `Add New ${formType}`}</h2>
          <form onSubmit={handleSubmit}>
            {/* Render fields based on formType */}
            {formType === "user" && (
              <>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required={!editItem} // Password required for Add only
                />
              </>
            )}
            {formType === "book" && (
              <>
                <input
                  name="Title"
                  type="text"
                  placeholder="Title"
                  value={formData.Title || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  name="Authors"
                  type="text"
                  placeholder="Authors"
                  value={formData.Authors || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  name="ISBN"
                  type="text"
                  placeholder="ISBN"
                  value={formData.ISBN || ""}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="Description"
                  placeholder="Description"
                  value={formData.Description || ""}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            {formType === "event" && (
              <>
                <input
                  name="name"
                  type="text"
                  placeholder="Event Name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  name="date"
                  type="datetime-local"
                  value={formData.date || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  name="location"
                  type="text"
                  placeholder="Location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            {formType === "loan" && (
              <>
                <input
                  name="userId"
                  type="text"
                  placeholder="User ID"
                  value={formData.userId || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  name="bookId"
                  type="text"
                  placeholder="Book ID"
                  value={formData.bookId || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  name="loanDate"
                  type="date"
                  value={formData.loanDate || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  name="dueDate"
                  type="date"
                  value={formData.dueDate || ""}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <div className="form-buttons">
            <button type="submit" className="submit-btn">
              {editItem ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditItem(null);
                setFormData({});
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

  const renderStats = () => (
    < Stats/>
  );

  const renderUsers = () => (
    <div className="tab-content">
      <div className="content-header">
        <h2>Manage Users</h2>
        <button className="add-btn" onClick={() => handleAddNew("user")}>Add New User</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
              <button className="edit-btn" onClick={() =>  handleEditItem("user", user)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete("users", user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


  const ITEMS_PER_PAGE = 5; // Limit of items per page
  const fetchBooks = async (query = '', page = 1) => {
    try {
      if (!query.trim()) {
        // If there's no search query, fetch recent books instead
        const response = await fetch("http://localhost:5000/api/admin/books/recent", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setRecentBooks(data);
        setTotalPages(1); // Reset pagination when showing recent books
      } else {
        // If there's a search query, fetch search results with pagination
        const response = await fetch(
          `http://localhost:5000/api/admin/books/search?query=${query}&page=${page}&limit=${ITEMS_PER_PAGE}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        const data = await response.json();
        setRecentBooks(data.books);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  
    
    // Handle the search input change
    const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value); // Update the query
      setCurrentPage(1); // Reset to the first page on a new search
    };
  
    // Render pagination buttons
    const renderPagination = () => {
      const maxVisiblePages = 5; // Show maximum 5 page numbers at a time
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
      // Adjust start page if we're near the end
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
  
      return (
        <div className="pagination">
          {/* Previous button */}
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="pagination-nav"
          >
            Previous
          </button>
  
          {/* First page if not visible */}
          {startPage > 1 && (
            <>
              <button onClick={() => setCurrentPage(1)}>1</button>
              {startPage > 2 && <span className="pagination-ellipsis">...</span>}
            </>
          )}
  
          {/* Visible page numbers */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
  
          {/* Last page if not visible */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
              <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
            </>
          )}
  
          {/* Next button */}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="pagination-nav"
          >
            Next
          </button>
        </div>
      );
    };
  
  
    
  const renderBooks = () => {

    return (
      <div className="tab-content">
        <div className="content-header">
          <h2>Manage Books</h2>
          <button className="add-btn" onClick={() => handleAddNew('book')}>
            Add New Book
          </button>
        </div>
  
        {/* Search Section */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search books..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="search-btn" onClick={() => fetchBooks(searchQuery, 1)}>
            Search
          </button>
        </div>
  
        {/* Book List Section */}
        <h3>Recently Added Books</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentBooks.length > 0 ? (
              recentBooks.map((book) => (
                <tr key={book._id}>
                  <td>{book.Title}</td>
                  <td>{book.Authors}</td>
                  <td>{book.ISBN}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditItem('book', book)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete('books', book._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No books found.</td>
              </tr>
            )}
          </tbody>
        </table>
  
        {/* Pagination Section */}
        {totalPages > 1 && renderPagination()}
      </div>
    );
  };
  
  const renderLoans = () => (
    <div className="tab-content">
      <h2>Manage Loans</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Loan Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td>{loan.userId.username}</td>
              <td>{loan.bookId.Title}</td>
              <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
              <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
              <td>{loan.returnDate ? 'Returned' : 'Active'}</td>
              <td>
              <button className="edit-btn" onClick={() =>  handleEditItem("loan", loan)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete("loans", loan._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const fetchEventRegisteredUsers = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/event/${eventId}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setEventRegisteredUsers(data);
    } catch (error) {
      console.error("Error fetching registered users for event:", error);
    }
  };
  

  const renderEvents = () => (
    <div className="tab-content">
      <div className="content-header">
        <h2>Manage Events</h2>
        <button className="add-btn" onClick={() => handleAddNew("event")}>Add New Event</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>
              <button className="edit-btn" onClick={() =>  handleEditItem("event", event)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete("events", event._id)}>Delete</button>
              <button className="details-button" onClick={() => {
                setSelectedEvent(event); // Set the selected event
                fetchEventRegisteredUsers(event._id); // Fetch users for that event
              }}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEvent && (
        <div className="registered-users-modal">
          <h3>Registered Users for {selectedEvent.name}</h3>
          <ul>
            {eventRegisteredUsers.map((user) => (
              <li key={user._id}>
                {user.username} - {user.email}
                <button className="delete-btn" onClick={() => handleDelete("users", user._id)}>Delete</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedEvent(null)} className="close-btn">Close</button>
        </div>
      )}

  </div>
);

  const renderContent = () => {
    switch (activeTab) {
      case "stats":
        return renderStats();
      case "users":
        return renderUsers();
      case "books":
        return renderBooks();
      case "events":
        return renderEvents();
      case "loans":
        return renderLoans();
      default:
        return renderStats();
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-sidebar">
        <h3>Navigation</h3>
        <button
          onClick={() => setActiveTab("stats")}
          className={activeTab === "stats" ? "active" : ""}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={activeTab === "users" ? "active" : ""}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab("books")}
          className={activeTab === "books" ? "active" : ""}
        >
          Manage Books
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={activeTab === "events" ? "active" : ""}
        >
          Manage Events
        </button>
        <button
          onClick={() => setActiveTab("loans")}
          className={activeTab === "loans" ? "active" : ""}
        >
          Manage Loans
        </button>
      </div>
      <div className="admin-main">
        {renderContent()}
        {showAddForm && renderAddEditForm()}

      </div>
    </div>
  );
};

export default AdminDashboard;