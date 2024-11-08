import React from "react";
import book1 from '../images/book1.jpg';
import book2 from '../images/book2.jpg';
import book3 from '../images/book3.jpg';
import './NewBooks.css';



const NewBooks = () => (
  <section className="new-books">
    <h2>New Books</h2>
    <div className="book-grid">
      <div className="book"><img src={book1} alt="Book 1" /> <h5>book1</h5> </div>
      <div className="book"><img src={book2} alt="Book 2" /> <h5>book1</h5></div>
      <div className="book"><img src={book3} alt="Book 3" /><h5>book1</h5></div>
      <div className="book"><img src={book1} alt="Book 1" /><h5>book1</h5></div>
      <div className="book"><img src={book2} alt="Book 2" /><h5>book1</h5></div>
      <div className="book"><img src={book3} alt="Book 3" /><h5>book1</h5></div>
    </div>
  </section>
);

export default NewBooks;
