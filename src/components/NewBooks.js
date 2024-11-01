import React from "react";
import styled from "styled-components";

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1em;
  padding: 2em;
`;

const Book = styled.div`
  background: #ddd;
  padding: 1em;
  border-radius: 8px;
`;

const NewBooks = () => (
  <section>
    <h2>New Books</h2>
    <BookGrid>
      <Book><img src="./src/images/book1.jpg" alt="Book 1" /></Book>
      <Book><img src="./src/images/book2.jpg" alt="Book 2" /></Book>
      <Book><img src="./src/images/book3.jpg" alt="Book 3" /></Book>
    </BookGrid>
  </section>
);

export default NewBooks;
