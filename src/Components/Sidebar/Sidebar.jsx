import React, { useState } from 'react';
import './Sidebar.css';
import profilePic from '../../assets/vijaykumar.jpg';
// import Profile from '../Profile/Profile'

// Optional: You can create a separate ProfileName component if needed
const ProfileName = () => (
  <div className="additional-profile">
    <h4>Dr. N. Vijaykumar</h4>
    <p>Head of the Department</p>
    <p><b style={{color:'black'}}>Email:</b> vijaykumar.neerudu@gmail.com</p>
  </div>
);

const Sidebar = ({ setActiveSection }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDeptOpen, setDeptOpen] = useState(false);
  const [isPUCOpen, setPUCOpen] = useState(false);
  const [isEnggOpen, setEnggOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Faculty');

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDeptDropdown = () => {
    setDeptOpen(!isDeptOpen);
  };

  const togglePUCDropdown = () => {
    setPUCOpen(!isPUCOpen);
  };

  const toggleEnggDropdown = () => {
    setEnggOpen(!isEnggOpen);
  };

  const handleSectionClick = (section) => {
    setActiveItem(section);
    setActiveSection(section);
    // Close all dropdowns except for the active path
    if (!section.startsWith('PUC') && !section.startsWith('Engg')) {
      setDeptOpen(false);
      setPUCOpen(false);
      setEnggOpen(false);
    }
  };

  const handleProfileClick = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <div className="sidebar-content">
        <div className="profile-section" onClick={handleProfileClick}>
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <h3 className="profile-name">Dr. N. Vijaykumar</h3>
          {isProfileOpen && <ProfileName />}
        </div>
        <hr />
        <ul className="sidebar-list">
          <li
            onClick={() => handleSectionClick('Faculty')}
            className={activeItem === 'Faculty' ? 'active' : ''}
          >
            Faculty List
          </li>
          <li onClick={toggleDeptDropdown} className={activeItem.startsWith('Department') ? 'active' : ''}>
            Department Courses
            <span className="dropdown-icon">{isDeptOpen ? '▲' : '▼'}</span>
          </li>
          {isDeptOpen && (
            <ul className="nested-dropdown">
              <li onClick={togglePUCDropdown} className={activeItem.startsWith('PUC') ? 'active' : ''}>
                PUC
                <span className="dropdown-icon">{isPUCOpen ? '▲' : '▼'}</span>
              </li>
              {isPUCOpen && (
                <ul className="nested-dropdown">
                  <li
                    onClick={() => handleSectionClick('PUC-P1')}
                    className={activeItem === 'PUC-P1' ? 'active' : ''}
                  >
                    P1
                  </li>
                  <li
                    onClick={() => handleSectionClick('PUC-P2')}
                    className={activeItem === 'PUC-P2' ? 'active' : ''}
                  >
                    P2
                  </li>
                </ul>
              )}
              <li onClick={toggleEnggDropdown} className={activeItem.startsWith('Engg') ? 'active' : ''}>
                Engineering
                <span className="dropdown-icon">{isEnggOpen ? '▲' : '▼'}</span>
              </li>
              {isEnggOpen && (
                <ul className="nested-dropdown">
                  <li
                    onClick={() => handleSectionClick('Engg-E1')}
                    className={activeItem === 'Engg-E1' ? 'active' : ''}
                  >
                    E1
                  </li>
                  <li
                    onClick={() => handleSectionClick('Engg-E2')}
                    className={activeItem === 'Engg-E2' ? 'active' : ''}
                  >
                    E2
                  </li>
                  <li
                    onClick={() => handleSectionClick('Engg-E3')}
                    className={activeItem === 'Engg-E3' ? 'active' : ''}
                  >
                    E3
                  </li>
                  <li
                    onClick={() => handleSectionClick('Engg-E4')}
                    className={activeItem === 'Engg-E4' ? 'active' : ''}
                  >
                    E4
                  </li>
                </ul>
              )}
            </ul>
          )}
          <li
            onClick={() => handleSectionClick('Achievements')}
            className={activeItem === 'Achievements' ? 'active' : ''}
          >
            Achievements
          </li>
          <li
            onClick={() => handleSectionClick('Library')}
            className={activeItem === 'Library' ? 'active' : ''}
          >
            Library
          </li>
          <li
            onClick={() => handleSectionClick('English')}
            className={activeItem === 'English' ? 'active' : ''}
          >
            Competitive English
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
