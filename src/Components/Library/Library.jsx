import React, { useState } from 'react';
import './Library.css';

const Library = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    type: 'stories',
    title: '',
    img: null,
    pdf: null
  });

  const [books, setBooks] = useState({
    stories: [],
    novels: [],
    journals: [],
    newspapers: [],
  });

  // Open the form for adding a new book
  const openFormForNewBook = () => {
    setFormData({ type: 'stories', title: '', img: null, pdf: null }); // Default to 'stories'
    setEditing(null);
    setShowForm(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Handle form submission (for both add and edit)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { type, title, img, pdf } = formData;

    // Prepare the updated book object
    const newBook = {
      title,
      img: img ? URL.createObjectURL(img) : books[type][editing?.index]?.img,
      pdf: pdf ? URL.createObjectURL(pdf) : books[type][editing?.index]?.pdf,
    };

    if (editing === null) {
      // Add new book
      setBooks((prevBooks) => ({
        ...prevBooks,
        [type]: [...prevBooks[type], newBook],
      }));
    } else {
      // Update existing book
      const updatedBooks = books[type].map((book, index) =>
        index === editing.index ? newBook : book
      );

      setBooks((prevBooks) => ({
        ...prevBooks,
        [type]: updatedBooks,
      }));
    }

    setShowForm(false);
  };

  // Edit book functionality
  const handleEdit = (type, index) => {
    const book = books[type][index];
    setFormData({
      type,
      title: book.title,
      img: null, // Reset file input
      pdf: null, // Reset file input
    });
    setEditing({ type, index });
    setShowForm(true);
  };

  // Delete book functionality
  const handleDelete = (type, index) => {
    setBooks((prevBooks) => {
      const updatedBooks = { ...prevBooks };
      updatedBooks[type].splice(index, 1);
      return updatedBooks;
    });
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="library-page">
      <h1>Library Management</h1>
      <button className="add-book-btn" onClick={openFormForNewBook}>
        Add Book
      </button>

      {/* Add/Edit Book Form Overlay */}
      {showForm && (
        <div className="form-overlay">
          <form className="add-book-form" onSubmit={handleFormSubmit}>
            <h2>{editing ? 'Edit Book' : 'Add Book'}</h2>
            <label>
              Type of Book:
              <select name="type" value={formData.type} onChange={handleInputChange} required>
                <option value="stories">Stories</option>
                <option value="novels">Novels</option>
                <option value="journals">Journals</option>
                <option value="newspapers">Newspapers</option>
              </select>
            </label>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Image Upload:
              <input type="file" name="img" onChange={handleFileChange} />
            </label>
            <label>
              PDF Upload:
              <input type="file" name="pdf" onChange={handleFileChange} />
            </label>
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button type="button" className="cancel-btn" onClick={closeForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Display books */}
      {['stories', 'novels', 'journals', 'newspapers'].map((type) => (
        <div key={type}>
          <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <div className="book-grid">
            {books[type].map((book, index) => (
              <div className="book-card" key={index}>
                <img src={book.img} alt={book.title} className="book-image" />
                <h3>{book.title}</h3>
                <a href={book.pdf} target="_blank" rel="noopener noreferrer">
                  <b>View PDF</b>
                </a>
                <div className='editdelbtn'>
                  <button className="edit-btn" onClick={() => handleEdit(type, index)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(type, index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Library;
