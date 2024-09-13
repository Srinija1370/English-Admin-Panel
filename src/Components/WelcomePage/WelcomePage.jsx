import React from 'react';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to the Admin Panel</h1>
      <p>Manage the various aspects of the system from the sidebar.</p>
      <p>Use the sidebar to navigate between different sections like Faculty List, Department Courses, Achievements, Library, and more.</p>
      <p>For assistance, please refer to the help documentation or contact support.</p>
    </div>
  );
};

export default WelcomePage;
