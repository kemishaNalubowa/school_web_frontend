import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
// import "./pages/Contact/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! We will get back to you soon.");
    console.log(formData);
  };

  return (
    <div className="contact-page">
      
      <Container fluid className="p-0">
        <div className="split-layout">
          
          {/* Left Side: Form */}
          <div className="contact-form-side">
            <div className="form-wrapper">
              <h1>Get In Touch</h1>
              <p className="lead">Have a question? We'd love to hear from you.</p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name" 
                    placeholder="John Doe" 
                    onChange={handleChange}
                    className="custom-input"
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    onChange={handleChange}
                    className="custom-input"
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    name="message" 
                    placeholder="Write your message here..." 
                    onChange={handleChange}
                    className="custom-input"
                    required 
                  />
                </Form.Group>

                <Button type="submit" className="submit-btn">
                  Send Message
                </Button>
              </Form>
            </div>
          </div>

          {/* Right Side: Map + Info Cards */}
          <div className="contact-info-side">
            
            {/* Floating Info Cards */}
            <div className="info-cards-container">
              <div className="info-card">
                <div className="icon-circle">📍</div>
                <div>
                  <h5>Location</h5>
                  <p>123 Education Lane, Nairobi, Kenya</p>
                </div>
              </div>

              <div className="info-card">
                <div className="icon-circle">📞</div>
                <div>
                  <h5>Phone</h5>
                  <p>+254 700 123 456</p>
                </div>
              </div>

              <div className="info-card">
                <div className="icon-circle">✉️</div>
                <div>
                  <h5>Email</h5>
                  <p>info@joksschool.com</p>
                </div>
              </div>
            </div>

            {/* Map Embed (Placeholder) */}
            <div className="map-container">
              {/* Replace src with your actual Google Maps Embed link */}
              <iframe 
                title="School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8175839774893!2d36.8219459!3d-1.2841508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMDMuMCJTIDM2wrA0OScxOS4wIkU!5e0!3m2!1sen!2ske!4v1234567890"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Contact;