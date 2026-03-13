import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", formData);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    
    // Clear status after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  // Smooth scroll to form when hash is #contact
  useEffect(() => {
    if (window.location.hash === "#contact") {
      document.querySelector(".contact-form-side")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="contact-page">
      
      {/* ✨ Animated Background Elements */}
      <div className="contact-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <Container fluid className="p-0">
        <div className="split-layout">
          
          {/* ✨ Left Side: Form */}
          <div className="contact-form-side">
            <div className="form-wrapper">
              
              {/* Decorative Header */}
              <div className="form-header">
                <div className="header-icon">💬</div>
                <h1>Get In Touch</h1>
                <p className="lead">Have a question? We'd love to hear from you.</p>
              </div>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="success-message" role="alert">
                  <span className="success-icon">✓</span>
                  <p>Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="form-group mb-4">
                  <Form.Label htmlFor="name">Your Name <span className="required">*</span></Form.Label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <Form.Control 
                      id="name"
                      type="text" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleChange}
                      className="custom-input"
                      required 
                      aria-required="true"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group mb-4">
                  <Form.Label htmlFor="email">Email Address <span className="required">*</span></Form.Label>
                  <div className="input-wrapper">
                    <span className="input-icon">✉️</span>
                    <Form.Control 
                      id="email"
                      type="email" 
                      name="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      className="custom-input"
                      required 
                      aria-required="true"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="form-group mb-4">
                  <Form.Label htmlFor="message">Message <span className="required">*</span></Form.Label>
                  <div className="input-wrapper textarea-wrapper">
                    <span className="input-icon">💬</span>
                    <Form.Control 
                      id="message"
                      as="textarea" 
                      rows={5} 
                      name="message" 
                      placeholder="Write your message here..." 
                      value={formData.message}
                      onChange={handleChange}
                      className="custom-input"
                      required 
                      aria-required="true"
                    />
                  </div>
                </Form.Group>

                <Button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <span className="btn-arrow">→</span>
                    </>
                  )}
                </Button>
              </Form>

              {/* Trust Badges */}
              <div className="trust-badges">
                <span className="badge-item">🔒 Secure</span>
                <span className="badge-item">⚡ Quick Response</span>
                <span className="badge-item">💯 Confidential</span>
              </div>

            </div>
          </div>

          {/* ✨ Right Side: Map + Info Cards */}
          <div className="contact-info-side">
            
            {/* ✨ Floating Info Cards */}
            <div className="info-cards-container">
              <a href="https://maps.google.com/?q=JJ+Kolera+School+Kawanda+Uganda" target="_blank" rel="noopener noreferrer" className="info-card-link">
                <div className="info-card">
                  <div className="icon-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h5>Visit Us</h5>
                    <p>JJ Kolera School, Kawanda<br/>Uganda, East Africa</p>
                  </div>
                  <span className="card-arrow">↗</span>
                </div>
              </a>

              <a href="tel:+256700123456" className="info-card-link">
                <div className="info-card">
                  <div className="icon-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <h5>Call Us</h5>
                    <p>+256 700 123 456<br/>Mon-Fri, 8AM-5PM</p>
                  </div>
                  <span className="card-arrow">↗</span>
                </div>
              </a>

              <a href="mailto:info@joksschool.com" className="info-card-link">
                <div className="info-card">
                  <div className="icon-circle">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h5>Email Us</h5>
                    <p>info@joksschool.com<br/>We reply within 24 hours</p>
                  </div>
                  <span className="card-arrow">↗</span>
                </div>
              </a>
            </div>

            {/* ✨ Map Container with Glow Effect */}
            <div className="map-container">
              <div className="map-overlay"></div>
              <iframe 
                title="JJ Kolera School Location - Kawanda, Uganda"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6!2d32.52!3d0.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjUnMDAuMCJOIDMywrAzMScxMi4wIkU!5e0!3m2!1sen!2sug!4v1234567890"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Map showing JJ Kolera School location in Kawanda, Uganda"
              ></iframe>
              <div className="map-label">
                <span className="map-pin">📍</span>
                <span>JJ Kolera School, Kawanda</span>
              </div>
            </div>

            {/* ✨ Social Links */}
            <div className="social-links">
              <span>Connect with us:</span>
              <div className="social-icons">
                <a href="#" aria-label="Facebook" className="social-icon">f</a>
                <a href="#" aria-label="Twitter" className="social-icon">𝕏</a>
                <a href="#" aria-label="Instagram" className="social-icon">📷</a>
                <a href="#" aria-label="LinkedIn" className="social-icon">in</a>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </div>
  );
};

export default Contact;