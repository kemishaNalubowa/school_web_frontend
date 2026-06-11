// src/Components/NavBar/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ isAuthenticated, currentUser, onLogout }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) setDarkMode(JSON.parse(savedMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
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
    <nav className={`navbar-component ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="nb-container">

        {/* ===== BRAND ===== */}
  {/* ===== BRAND ===== */}
<Link to="/" className="nb-brand-link">
  <div className="nb-badge-wrapper">
    {/* Primary Badge */}
    <img 
      src="/lmss.png" 
      alt="JJokolera Junior School Badge" 
      className="nb-badge"
      onError={(e) => {
        // Hide primary if it fails to load
        e.target.style.display = 'none';
        // Show fallback image
        const fallback = e.target.parentElement?.querySelector('.nb-badge-fallback');
        if (fallback) fallback.style.display = 'block';
      }}
    />
    {/* ✅ Fallback Badge Image (NOT text) */}
    <img 
      src="/joks.png" 
      alt="JJokolera Junior School Logo" 
      className="nb-badge-fallback"
    />
  </div>
  
  <div className="nb-brand-text">
    <span className="nb-brand-name">Jjokolera Junior School</span>
    <span className="nb-brand-tagline">Excellence · Faith · Service</span>
  </div>
</Link>

        {/* ===== DESKTOP NAV ===== */}
        <ul className="nb-desktop-nav">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link to={link.path} className={`nb-nav-link ${isActive ? 'active' : ''}`}>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ===== ACTIONS ===== */}
        <div className="nb-desktop-actions">
          <button className="nb-dark-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link 
            to={isAuthenticated ? "/parent" : "/login"} 
            className="nb-signin-btn"
          >
            Child Progress
          </Link>
          {isAuthenticated && (
            <button className="nb-logout-btn" onClick={onLogout}>Logout</button>
          )}
        </div>

        {/* ===== MOBILE TOGGLE ===== */}
        <button className="nb-mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div className={`nb-mobile-menu ${open ? 'open' : ''}`}>
        <div className="nb-mobile-content">
          <button 
            className="nb-mobile-dark-toggle"
            onClick={() => { toggleDarkMode(); setOpen(false); }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={`nb-mobile-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to={isAuthenticated ? "/parent" : "/login"} 
            className="nb-mobile-signin-btn"
            onClick={() => setOpen(false)}
          >
            Child Progress
          </Link>
          {isAuthenticated && (
            <button className="nb-mobile-logout" onClick={() => { onLogout(); setOpen(false); }}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}