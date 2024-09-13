import React from 'react';
import './FacultyList.css';

const FacultyCard = ({ faculty, onDelete, onEdit }) => {
  return (
    <div className="faculty-card">
      <img src={faculty.profilePic} alt={faculty.name} className="faculty-pic" />
      <h3 className="faculty-name">{faculty.name}</h3>
      <p className="faculty-degree">{faculty.degree}</p>
      <p className="faculty-title">{faculty.title}</p>
      <p className="faculty-email">Email: {faculty.email}</p>
      <div className='editdeletebtn'>
      <button className="edit-btn" onClick={onEdit}>Edit</button>
      <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default FacultyCard;
