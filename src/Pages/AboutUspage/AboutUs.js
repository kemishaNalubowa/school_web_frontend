// src/Pages/AboutUspage/AboutUs.jsx
import React from "react";
import { Container, Card } from "react-bootstrap";
 // ← Only addition
import "./AboutUs.css";
import CTAPopup from "../../Components/CTAPopup";
const AboutUs = () => {
  // Team Data - Updated to use 'public' folder images
  // Create a folder 'team' inside 'public/images' and put your photos there
  const teamMembers = [
    { 
      name: "Mr. Sam Ssebageya", 
      role: "Director", 
      // Pointing to: public/images/team/sam.jpg
      image: "/teacher4.jpeg" 
    },
    { 
      name: "Mrs. Mazzi Shifah", 
      role: "Vice Principal", 
      image: "/teacher1.jpeg" 
    },
    { 
      name: "Ms. Emily Johnson", 
      role: "Head of Academics", 
      image: "/teacher2.jpeg" 
    },
    { 
      name: "Mr. Michael Brown", 
      role: "Admin Manager", 
      image: "/teacher3.jpeg" 
    },
  ];

  return (
    <div className="about-page">
      
      {/* ✨ CTA Popup - Only addition: shows on About Us page */}
      <CTAPopup autoCloseDelay={10000} />
      
      {/* Hero Section */}
      <div className="about-hero">
        <Container>
          <h1>About JOKS School Connect</h1>
          <p>Building the future, one student at a time.</p>
        </Container>
      </div>

      {/* Main Content Section */}
      <Container className="about-container">
        <div className="about-content-wrapper">
          <div className="about-image-box">
            <img src="/plainschool.jpeg" alt="JOKS School" />
          </div>
          <div className="about-text-box">
            <h2>Who We Are</h2>
            <p>
              JOKS School Connect is committed to providing quality education 
              that nurtures creativity, independence, and excellence. 
              Our programs are designed to develop confident learners 
              prepared for the future.
            </p>
            <button className="about-btn">Learn More</button>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="mission-vision-section">
          <div className="mv-card">
            <h3>Our Mission</h3>
            <p>
              To provide a safe, engaging, and inspiring learning environment 
              that empowers every child to achieve their full potential.
            </p>
          </div>
          <div className="mv-card">
            <h3>Our Vision</h3>
            <p>
              To be a leading primary institution recognized for academic 
              excellence and character development.
            </p>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="team-section">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-img-wrapper">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    // This fallback helps if an image is missing
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
                  />
                </div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Footer has been removed because it is now in App.js */}
    </div>
  );
};

export default AboutUs;