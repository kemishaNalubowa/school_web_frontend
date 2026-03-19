// src/Components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapPin, FaFacebookF, FaTwitter, FaInstagram, FaArrowUp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      
      {/* ===== MAIN FOOTER ===== */}
      <div className="footer-main">
        <div className="footer-container">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Jjokolera Junior School
            </Link>
            <p className="footer-tagline">
              Nurturing excellence, character & lifelong learning.
            </p>
            
            {/* Social Links */}
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/admissions">Admissions</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li>
                <FaMapPin />
                <span>Bukoto, Kampala, Uganda</span>
              </li>
              <li>
                <FaPhone />
                <a href="tel:+256752711909">+256 752 711 909</a>
              </li>
              <li>
                <FaEnvelope />
                <a href="mailto:info@jjokolera.ac.ug">info@jjokolera.ac.ug</a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-policies">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/admissions">Admissions</Link></li>
              <li><Link to="/admissions">Enrolment</Link></li>
              <li><Link to="/about">Safeguarding</Link></li>
              <li><Link to="/contact">Privacy</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; {new Date().getFullYear()} Jjokolera Junior School Uganda. All rights reserved.</p>
          
          {/* Scroll to Top Button */}
          <button 
            className="footer-scroll-top" 
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>

    </footer>
  );
};

export default Footer;