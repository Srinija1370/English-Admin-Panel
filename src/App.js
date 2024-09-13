import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import './App.css';

// Import your component files here
import FacultyList from './Components/Faculty/FacultyList';
import PUCContent from './Components/PUCContent/PUCContent';
import EnggContent from './Components/EnggContent/EnggContent';
import Achievements from './Components/Achievements/Achievements';
import Library from './Components/Library/Library';
import CompetitiveEnglish from './Components/CompetitiveEnglish/CompetitiveEnglish';
import WelcomePage from './Components/WelcomePage/WelcomePage';

function App() {
  const [activeSection, setActiveSection] = useState('');

  const renderContent = () => {
    switch (activeSection) {
      case 'Faculty':
        return <FacultyList />;
      case 'PUC-P1':
      case 'PUC-P2':
        return <PUCContent />;
      case 'Engg-E1':
      case 'Engg-E2':
      case 'Engg-E3':
      case 'Engg-E4':
        return <EnggContent />;
      case 'Achievements':
        return <Achievements />;
      case 'Library':
        return <Library />;
      case 'English':
        return <CompetitiveEnglish />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-container">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
