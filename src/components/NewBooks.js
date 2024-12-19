import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './NewBooks.css';

function NewBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  
  return (
    <div className="new-book-section">
      <h2>Recent Books</h2>
      <div className="book-slider">
        {books.map((book) => (
          
          <div className="book-card" >
            <Link to={`/book/${book.ISBN}`} key={book.ISBN}>
            <img src={book["Image-URL-M"]} alt={book.Title} className="book-image" />
            </Link>
            <h3 className="book-title">{book.Title}</h3>
            <p className="book-author">{book.Authors}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewBooks;
