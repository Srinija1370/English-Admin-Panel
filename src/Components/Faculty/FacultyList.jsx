import React, { useState, useEffect } from 'react';
import './FacultyList.css';
import FacultyCard from './FacultyCard';

const initialFacultyData = [
  {
    name: 'Dr. N. Vijaykumar',
    degree: 'M.A, PGDTE',
    title: 'Mentor',
    email: 'vijaykumar.neerudu@gmail.com',
    profilePic: 'https://via.placeholder.com/150',
  },
  {
    name: 'Gujjari Shankar',
    degree: 'M.A.(EFLU), UGC-NET, APSET, (Ph.D)*',
    title: 'Assistant Professor',
    email: 'gujjarishan1502@gmail.com',
    profilePic: 'https://via.placeholder.com/150',
  },
];

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    degree: '',
    title: '',
    email: '',
    profilePic: '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    const storedFaculty = localStorage.getItem('facultyData');
    if (storedFaculty) {
      setFaculty(JSON.parse(storedFaculty));
    } else {
      setFaculty(initialFacultyData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('facultyData', JSON.stringify(faculty));
  }, [faculty]);

  const handleDelete = (index) => {
    const updatedFaculty = faculty.filter((_, i) => i !== index);
    setFaculty(updatedFaculty);
  };

  const handleEdit = (index) => {
    setNewFaculty(faculty[index]);
    setCurrentIndex(index);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleAddFaculty = () => {
    setNewFaculty({
      name: '',
      degree: '',
      title: '',
      email: '',
      profilePic: '',
    });
    setProfilePicFile(null);
    setCurrentIndex(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty({
      ...newFaculty,
      [name]: value,
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewFaculty({ ...newFaculty, profilePic: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedFaculty = faculty.map((item, index) =>
        index === currentIndex ? newFaculty : item
      );
      setFaculty(updatedFaculty);
    } else {
      setFaculty([...faculty, newFaculty]);
    }
    setNewFaculty({
      name: '',
      degree: '',
      title: '',
      email: '',
      profilePic: '',
    });
    setProfilePicFile(null);
    setShowForm(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="faculty-page">
      <h1>Faculty Management</h1>
      <button className="add-faculty-btn" onClick={handleAddFaculty}>
        Add Faculty
      </button>

      {/* Modal Form Overlay */}
      {showForm && (
        <div className="form-overlay">
          <form className="faculty-form" onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Edit Faculty' : 'Add New Faculty'}</h2>
            <input
              type="text"
              name="name"
              value={newFaculty.name}
              onChange={handleFormChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="degree"
              value={newFaculty.degree}
              onChange={handleFormChange}
              placeholder="Qualifications"
              required
            />
            <input
              type="text"
              name="title"
              value={newFaculty.title}
              onChange={handleFormChange}
              placeholder="Designation"
              required
            />
            <input
              type="email"
              name="email"
              value={newFaculty.email}
              onChange={handleFormChange}
              placeholder="Email"
              required
            />
            <input
              type="file"
              name="profilePic"
              onChange={handleProfilePicChange}
              accept="image/*"
              required
            />
            <div className='addcancelbutton'>
              <button type="submit" className="submit-btn">
                {isEditing ? 'Update' : 'Add'}
              </button>
              <button type="button" className="cancel-btn" onClick={closeForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="faculty-cards">
        {faculty.map((member, index) => (
          <FacultyCard
            key={index}
            faculty={member}
            onDelete={() => handleDelete(index)}
            onEdit={() => handleEdit(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FacultyList;
