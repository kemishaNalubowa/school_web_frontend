// src/Components/NavBar/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Dark mode persistence
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) setDarkMode(JSON.parse(savedMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${open ? 'mobile-open' : ''} ${darkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">
        
        {/* ===== BRAND SECTION ===== */}
        <Link to="/" className="brand-link" onClick={() => setOpen(false)}>
          <div className="brand-badge-wrapper">
            <img 
              src="/lmss.png" 
              alt="School Badge" 
              className="brand-badge"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <img 
              src="/joks.jpeg" 
              alt="Fallback Logo"
              className="brand-badge-fallback"
            />
          </div>
          
          <div className="brand-text-wrapper">
            <span className="brand-name">Jjokolera Junior School</span>
            <span className="brand-tagline">Excellence · Faith · Service</span>
          </div>
        </Link>

        {/* ===== DESKTOP NAVIGATION ===== */}
        <ul className="desktop-nav">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path} className="nav-item">
                <Link 
                  to={link.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                  {isActive && <span className="nav-link-indicator" />}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ===== DESKTOP ACTIONS ===== */}
        <div className="desktop-actions">
          {/* Dark Mode Toggle */}
          <button 
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* ✅ Sign In Button - Links to LoginPage */}
          <Link to="/login" className="signin-btn">
            Sign In
          </Link>
        </div>

        {/* ===== MOBILE MENU TOGGLE ===== */}
        <button 
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {/* Mobile Dark Mode Toggle */}
          <button 
            className="mobile-dark-mode-toggle"
            onClick={() => {
              toggleDarkMode();
              setOpen(false);
            }}
          >
            <span className="toggle-icon">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </span>
            <span className="toggle-text">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-link-text">{link.name}</span>
                {isActive && <span className="mobile-link-indicator" />}
              </Link>
            );
          })}
          
          {/* ✅ Mobile Sign In Button */}
          <div className="mobile-portal-section">
            <Link to="/login" className="mobile-signin-btn" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* ===== SCROLL SHADOW OVERLAY ===== */}
      <div className="navbar-shadow" />
    </nav>
  );
}