import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './NewBooks.css';

function NewBooks() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="new-book-section">
      <h2>Recent Books</h2>
      <div className="book-slider">
        {books.map((book) => (
          <div className="book-card" key={book.ISBN} onClick={() => handleBookClick(book._id)}>
            <img src={book["Image-URL-M"]} alt={book.Title} className="book-image" />
            <h3 className="book-title">{book.Title}</h3>
            <p className="book-author">{book.Authors}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewBooks;
