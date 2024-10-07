import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Documenti from './Documenti';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';

function App() {
  return (
    <Router>
      <div className="App">
        <Drawer variant="permanent" anchor="left">
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/documenti" selected>
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="Documenti" />
            </ListItem>
          </List>
        </Drawer>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/documenti" element={<Documenti />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
