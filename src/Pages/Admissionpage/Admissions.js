import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Admissions.css";

const Admissions = () => {
  return (
    <div className="admissions-page">
      
      {/* Hero Section */}
      <div className="admissions-hero">
        <Container>
          <h1>Admissions</h1>
          <p>Begin your journey with JOKS School Connect</p>
        </Container>
      </div>

      {/* The "Card Board" Section */}
      <Container className="options-board">
        <div className="board-intro">
          <h2>What would you like to view?</h2>
          <p>Select an option below to get started.</p>
        </div>

        <div className="cards-wrapper">
          
          {/* Option 1: Admission Info - Links to /admission-info */}
          <Link to="/admission-info" className="card-link-wrapper">
            <div className="option-card card-info">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                  <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208z"/>
                </svg>
              </div>
              <h3>Admission Info</h3>
              <p>Learn about requirements, intake dates, and the application process.</p>
              <button className="card-btn">View Details</button>
            </div>
          </Link>

          {/* Option 2: Fees Structure - Links to /fees-structure */}
          <Link to="/fees-structure" className="card-link-wrapper">
            <div className="option-card card-fees">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                </svg>
              </div>
              <h3>Fees Structure</h3>
              <p>Download the termly fees structure and payment methods.</p>
              <button className="card-btn">View Fees</button>
            </div>
          </Link>

        </div>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <div className="social-icons">
            <a href="#" className="social-link">FB</a>
            <a href="#" className="social-link">TW</a>
            <a href="#" className="social-link">IG</a>
          </div>
          <p> JOKS SCHOOL CONNECT. </p>
        </Container>
      </footer>
    </div>
  );
};

export default Admissions;