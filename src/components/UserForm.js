import React, { useState } from 'react';

const UserForm = ({ addBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ title, author });
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title: </label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Author: </label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default UserForm;
