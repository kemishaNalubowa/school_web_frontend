// src/Components/Navbar/Navbar.js
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Navbar.css";

const CustomNavbar = () => {

  const [darkMode, setDarkMode] = useState(false);

  // Apply class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container fluid>
        
        {/* LEFT: Brand with Logo */}
        <Navbar.Brand as={Link} to="/" className="brand-logo-container">
          <img
            src="/greenlogo.jpeg"
            alt="JOKS School Logo"
            className="brand-logo-img"
          />
          <span className="brand-text">JOKS SCHOOL</span>
        </Navbar.Brand>

        {/* RIGHT: Toggle, Links, and Icons */}
        <div className="navbar-right-wrapper">
          
          {/* Dark Mode Icon */}
          <div className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible Menu */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-links-wrapper">
              <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link-custom">About Us</Nav.Link>
              <Nav.Link as={Link} to="/admissions" className="nav-link-custom">Admissions</Nav.Link>
              <Nav.Link as={Link} to="/events" className="nav-link-custom">Events</Nav.Link>
              <Nav.Link as={Link} to="/gallery" className="nav-link-custom">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>

              <Nav.Link as={Link} to="/login" className="signin-btn">
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;