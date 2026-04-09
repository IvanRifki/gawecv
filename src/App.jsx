import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CvProvider } from './context/CvContext';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Navbar from './components/layout/Navbar';
import './index.css';

function App() {
  return (
    <CvProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder" element={<Builder />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CvProvider>
  );
}

export default App;
