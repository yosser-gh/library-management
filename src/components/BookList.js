import React from 'react';
import { books } from '../data';

function Catalog() {
  return (
    <div className="catalog">
      <h2>Catalog</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Year: {book.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catalog;
