import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Books.css";

const Books = () => {
  const [booksByCategory, setBooksByCategory] = useState({});
  const categories = [
    "Romance",
    "Thrillers",
    "Science",
    "Fiction",
    "History",
    "Fantasy",
    "Biography",
    "Children",
    "Mystery",
    "General",
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryBooks = {};

      for (const category of categories) {
        try {
          const response = await fetch(`http://localhost:5000/api/books/category/${category}`);
          const books = await response.json();
          categoryBooks[category] = books;
        } catch (error) {
          console.error(`Error fetching books for category ${category}:`, error);
        }
      }

      setBooksByCategory(categoryBooks);
    };

    fetchBooks();
  },);

  return (
    <div className="books-page">
      <section className="intro-section">
        <h2>Explore Our Library</h2>
        <p>With thousands of books spanning dozens of categories, you'll always find something new to read.</p>
        <div className="stats">
          <div>
            <h3>10,000+</h3>
            <p>Books Available</p>
          </div>
          <div>
            <h3>50+</h3>
            <p>Categories</p>
          </div>
          <div>
            <h3>1,000+</h3>
            <p>Members</p>
          </div>
        </div>
      </section>

      {categories.map((category) => (
      <div key={category} className="category-section">
        <h2>{category}</h2>
        <div className="books-row">
        {booksByCategory[category] && booksByCategory[category].length > 0 ? (
              booksByCategory[category].map((book) => (
              <div className="book-card" >
                <Link to={`/book/${book.ISBN}`} key={book.ISBN}>
                  <img src={book["Image-URL-M"]} alt={book.Title} className="book-image" />
                </Link>
                  <h3 className="book-title">{book.Title}</h3>
                  <p className="book-author">{book.Authors}</p>
              </div>
            ))
          ) : (
            <p>No books found in this category.</p>
          )}
        </div>
      </div>
    ))}
  </div>
);
};

export default Books;
