import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Documenti from './Documenti';
import DettaglioDocumento from './DettaglioDocumento';
import { CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <main className="App-main" style={{ flexGrow: 1, paddingLeft: 90 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documenti" element={<Documenti />} />
          <Route path="/documenti/:id" element={<DettaglioDocumento />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
