import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${isbn}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [isbn]);

  if (!book) return <p>Loading book details...</p>;

  const handleLoan = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
        body: JSON.stringify({ bookId: book._id }),
      });
  
      if (response.ok) {
        alert("Book loaned successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error loaning book.");
      }
    } catch (error) {
      console.error("Error loaning book:", error);
      alert("Server error. Please try again later.");
    }
  };
  
  return (
    <div className="book-details">
      <div className="book-img">
        <img src={book["Image-URL-L"]} alt={book.Title} />
      </div>
      <div className="book-info">
        <h1>{book.Title}</h1>
        <p><strong>Author:</strong> {book.Authors}</p>
        <p><strong>Publisher:</strong> {book.Publisher}</p>
        <p><strong>Category:</strong> {book.Category}</p>
        <p><strong>Description:</strong> {book.Description}</p>
        <div className="btns">
        <button onClick={() => navigate(-1)} className="back-bttn">Go Back</button>
        <button onClick={handleLoan} className="loan-btn">Loan Book</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
