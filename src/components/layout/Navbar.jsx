import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="navbar glass">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logogawecv2.png" alt="GaweCV Logo" className="logo-image" />
          <div className="logo-text-wrapper">
            <span className="logo-title">Gawe <span className="logo-accent">CV</span></span>
            <span className="logo-subtitle">CV Profesional & Modern</span>
          </div>
        </Link>

        <nav className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/builder"
            className={`nav-link ${location.pathname === '/builder' ? 'active' : ''}`}
          >
            Buat CV
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
