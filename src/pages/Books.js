// BooksPage.js
import React from "react";
import "./Books.css";

const Books = () => {
  const categories = [
    {
      title: "Fiction",
      books: [
        { id: 1, title: "1984", author: "George Orwell", image: 'https://via.placeholder.com/150x250' },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: 'https://via.placeholder.com/150x250' },
        {
          "id": 3,
          "title": "Pride and Prejudice",
          "author": "Jane Austen",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 4,
          "title": "The Great Gatsby",
          "author": "F. Scott Fitzgerald",
          "image": 'https://via.placeholder.com/150x250'
        },
        { id: 1, title: "1984", author: "George Orwell", image: 'https://via.placeholder.com/150x250' },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: 'https://via.placeholder.com/150x250' },
        {
          "id": 3,
          "title": "Pride and Prejudice",
          "author": "Jane Austen",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 4,
          "title": "The Great Gatsby",
          "author": "F. Scott Fitzgerald",
          "image": 'https://via.placeholder.com/150x250'
        }
        
      ],
    },
    {
      title:"Romance",
      books:[
        {
          "id": 1,
          "title": "Me Before You",
          "author": "Jojo Moyes",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 2,
          "title": "Outlander",
          "author": "Diana Gabaldon",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 3,
          "title": "The Notebook",
          "author": "Nicholas Sparks",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 1,
          "title": "Me Before You",
          "author": "Jojo Moyes",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 2,
          "title": "Outlander",
          "author": "Diana Gabaldon",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 3,
          "title": "The Notebook",
          "author": "Nicholas Sparks",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 1,
          "title": "Me Before You",
          "author": "Jojo Moyes",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 2,
          "title": "Outlander",
          "author": "Diana Gabaldon",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 3,
          "title": "The Notebook",
          "author": "Nicholas Sparks",
          "image": 'https://via.placeholder.com/150x250'
        }
        
        
        
      ]

    },
    {
      title: "Non-Fiction",
      books: [
        { id: 1, title: "Sapiens", author: "Yuval Noah Harari", image: 'https://via.placeholder.com/150x250' },
        { id: 2, title: "Educated", author: "Tara Westover", image: 'https://via.placeholder.com/150x250'},
        {
          "id": 3,
          "title": "Becoming",
          "author": "Michelle Obama",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 4,
          "title": "The Immortal Life of Henrietta Lacks",
          "author": "Rebecca Skloot",
          "image": 'https://via.placeholder.com/150x250'
        },
        { id: 1, title: "Sapiens", author: "Yuval Noah Harari", image: 'https://via.placeholder.com/150x250' },
        { id: 2, title: "Educated", author: "Tara Westover", image: 'https://via.placeholder.com/150x250'},
        {
          "id": 3,
          "title": "Becoming",
          "author": "Michelle Obama",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 4,
          "title": "The Immortal Life of Henrietta Lacks",
          "author": "Rebecca Skloot",
          "image": 'https://via.placeholder.com/150x250'
        }
        
      ],
    },
    {
      title: "Mystery",
      books:[
        {
          "id": 1,
          "title": "The Girl with the Dragon Tattoo",
          "author": "Stieg Larsson",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 2,
          "title": "Gone Girl",
          "author": "Gillian Flynn",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 3,
          "title": "The Da Vinci Code",
          "author": "Dan Brown",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 1,
          "title": "The Girl with the Dragon Tattoo",
          "author": "Stieg Larsson",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 2,
          "title": "Gone Girl",
          "author": "Gillian Flynn",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 3,
          "title": "The Da Vinci Code",
          "author": "Dan Brown",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 1,
          "title": "The Girl with the Dragon Tattoo",
          "author": "Stieg Larsson",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 2,
          "title": "Gone Girl",
          "author": "Gillian Flynn",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 3,
          "title": "The Da Vinci Code",
          "author": "Dan Brown",
          "image": 'https://via.placeholder.com/150x250'
        }
        
        
        
      ]
    },
    {
      title: "Fantasy",
      books:[
        {
          "id": 1,
          "title": "Harry Potter and the Sorcerer's Stone",
          "author": "J.K. Rowling",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 2,
          "title": "The Hobbit",
          "author": "J.R.R. Tolkien",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 3,
          "title": "A Game of Thrones",
          "author": "George R.R. Martin",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 1,
          "title": "Harry Potter and the Sorcerer's Stone",
          "author": "J.K. Rowling",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 2,
          "title": "The Hobbit",
          "author": "J.R.R. Tolkien",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 3,
          "title": "A Game of Thrones",
          "author": "George R.R. Martin",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 1,
          "title": "Harry Potter and the Sorcerer's Stone",
          "author": "J.K. Rowling",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 2,
          "title": "The Hobbit",
          "author": "J.R.R. Tolkien",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 3,
          "title": "A Game of Thrones",
          "author": "George R.R. Martin",
          "image": 'https://via.placeholder.com/150x250'
        }
        
      ]
    },
    
    {
      title: "Science Fiction",
      books: [
        { id: 1, title: "Dune", author: "Frank Herbert", image: 'https://via.placeholder.com/150x250' },
        { id: 2, title: "The Martian", author: "Andy Weir", image: 'https://via.placeholder.com/150x250' },
        {
          "id": 3,
          "title": "Foundation",
          "author": "Isaac Asimov",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 4,
          "title": "Neuromancer",
          "author": "William Gibson",
          "image": 'https://via.placeholder.com/150x250'
        },
        { id: 1, title: "Dune", author: "Frank Herbert", image: 'https://via.placeholder.com/150x250' },
        { id: 2, title: "The Martian", author: "Andy Weir", image: 'https://via.placeholder.com/150x250' },
        {
          "id": 3,
          "title": "Foundation",
          "author": "Isaac Asimov",
          "image": 'https://via.placeholder.com/150x250'
        },
        {
          "id": 4,
          "title": "Neuromancer",
          "author": "William Gibson",
          "image": 'https://via.placeholder.com/150x250'
        }
        
        
      ],
    },
  ];

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

      {categories.map((category, index) => (
        <div className="category-section" key={index}>
          <h2>{category.title}</h2>
          <div className="books-row">
            {category.books.map((book) => (
              <div className="book-cards" key={book.id}>
                <img src={book.image} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
