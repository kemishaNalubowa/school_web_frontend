import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import AdmissionCTA from "../../Components/AdmissionCTA/AdmissionCTA";
import "./Home.css";

const Home = () => {
  const slides = [
    { image: "/plainschool.jpeg", title: "Academic Excellence", text: "Providing a strong foundation for future leaders." },
    { image: "/kidswithlaptops.jpeg", title: "Digital Learning", text: "Integrating technology into everyday classrooms." },
    { image: "/cultureday.jpg", title: "Cultural Diversity", text: "Celebrating heritage and unity in our community." },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="home-page">

      {/* --- Hero Section --- */}
      <section
        id="hero"
        className="home-hero"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        {/* Overlay only covers hero image, not the CTA below */}
        <div className="overlay"></div>

        <Container className="main-container d-flex flex-column justify-content-center align-items-center">
          <div className="welcome-text-wrapper text-center">
            <h1 className="text-line-1">WELCOME</h1>
            <h1 className="text-line-2">TO</h1>
            <h1 className="text-line-3">JOKS SCHOOL CONNECT</h1>
          </div>

          <div className="hero-cards-container">
            <div className="dynamic-card" key={currentSlide}>
              <h2>{slides[currentSlide].title}</h2>
              <p>{slides[currentSlide].text}</p>
            </div>
          </div>

          {/* --- Admission Button stays on Hero --- */}
          <div className="hero-admission-btn">
            <Button className="admission-btn">Admission Ongoing</Button>
          </div>
        </Container>
      </section>

      {/* --- Independent Admission CTA Section (White Background) --- */}
      <section id="admissions" className="admissions-cta-section">
        <Container className="admissions-cta-container text-center">
          <AdmissionCTA />
        </Container>
      </section>

      {/* --- You can add more sections here (Options, About, Contact) --- */}
    </div>
  );
};

export default Home;