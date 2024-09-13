import React from 'react';
import './Navbar.css';
import logo from '../../assets/logoHUB.png';

const Navbar = () => {
  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-language">
          <p>ENGLISH</p>
        </div>
      </div>
      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
