import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Documenti from './Documenti';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import { CssBaseline } from '@mui/material';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <CssBaseline />
      <div className="sidebar">
        <Link to="/" className="sidebar-item">
          <HomeIcon className={`sidebar-icon ${location.pathname === '/' ? 'active' : ''}`} />
          <span>Home</span>
        </Link>
        <Link to="/documenti" className="sidebar-item">
          <DescriptionIcon className={`sidebar-icon ${location.pathname === '/documenti' ? 'active' : ''}`} />
          <span>Doc</span>
        </Link>
        <Link to="/settings" className="sidebar-item">
          <SettingsIcon className={`sidebar-icon ${location.pathname === '/settings' ? 'active' : ''}`} />
          <span>Gestisci</span>
        </Link>
      </div>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documenti" element={<Documenti />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
