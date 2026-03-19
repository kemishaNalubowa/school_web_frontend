// src/Pages/Homepage/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import {
  FaGraduationCap, FaBookOpen, FaUsers, FaTrophy, FaArrowRight,
  FaChild, FaChalkboardTeacher, FaStar, FaQuoteLeft
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const slides = [
    { image: "/plainschool.jpeg", title: "Academic Excellence", text: "Providing a strong foundation for future leaders." },
    { image: "/kidswithlaptops.jpeg", title: "Digital Learning", text: "Integrating technology into everyday classrooms." },
    { image: "/swimming.jpeg", title: "Holistic Growth", text: "Celebrating talent in sports and the arts." },
  ];

  const programs = [
    { icon: <FaChild />, title: "Nursery", desc: "Nurturing young minds through play-based learning." },
    { icon: <FaBookOpen />, title: "Primary", desc: "Building strong academic foundations and character." },
    { icon: <FaChalkboardTeacher />, title: "Mentorship", desc: "Guiding students with personalized pastoral care." },
  ];

  const features = [
    { icon: <FaGraduationCap />, title: "Modern Curriculum", desc: "Blending Cambridge & UBE standards." },
    { icon: <FaUsers />, title: "Small Classes", desc: "1:15 Teacher-Student ratio." },
    { icon: <FaTrophy />, title: "Award Winning", desc: "Excellence in academics & sports." },
    { icon: <FaStar />, title: "Values Based", desc: "Character & integrity first." }
  ];

  const testimonials = [
    { image: "/teacher1.jpeg", name: "Sarah Nakato", role: "Parent", text: "JOKS School has transformed my child's confidence. The teachers truly care!", rating: 5 },
    { image: "/teacher2.jpeg", name: "James Mukasa", role: "Parent", text: "The holistic approach here is exceptional. My daughter loves school every day.", rating: 5 },
    { image: "/teacher3.jpeg", name: "Grace Akello", role: "Parent", text: "Outstanding facilities and dedicated staff. Best decision for our son's education.", rating: 5 },
    { image: "/teacher4.jpeg", name: "Peter Okello", role: "Parent", text: "Traditional values and modern teaching - exactly what we were looking for.", rating: 5 }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [stats, setStats] = useState({ s: 0, t: 0, a: 0, y: 0 });
  const statsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true);
    }, { threshold: 0.4 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = { s: 400, t: 20, a: 15, y: 10 };
    let current = { s: 0, t: 0, a: 0, y: 0 };
    const inc = { s: targets.s / 40, t: targets.t / 40, a: targets.a / 40, y: targets.y / 40 };
    const timer = setInterval(() => {
      current = { s: current.s + inc.s, t: current.t + inc.t, a: current.a + inc.a, y: current.y + inc.y };
      setStats({ s: Math.round(current.s), t: Math.round(current.t), a: Math.round(current.a), y: Math.round(current.y) });
      if (current.s >= targets.s) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [statsVisible]);

  return (
    <div className="home-page">

      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="hero-slides-wrapper">
          {slides.map((s, i) => (
            <div key={i} className={`hero-slide ${i === currentSlide ? "active" : ""}`} style={{ backgroundImage: `url(${s.image})` }} />
          ))}
        </div>
        <div className="hero-glass-overlay"></div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title-block">JOKS SCHOOL</h1>
          <p className="hero-tagline">Empowering Tomorrow's Leaders Through Excellence in Education</p>
          <div className="hero-card-container">
            <div className="hero-info-card">
              <div className="card-icon"><FaGraduationCap /></div>
              <div className="card-content">
                <h3>{slides[currentSlide].title}</h3>
                <p>{slides[currentSlide].text}</p>
              </div>
            </div>
          </div>
          <Link to="/admissions" className="btn-main">
            Apply Now <FaArrowRight style={{ marginLeft: 8 }} />
          </Link>
        </div>
      </section>

      {/* ===== METRICS SECTION ===== */}
      <section className="metrics-section" ref={statsRef}>
        <Container>
          <div className="metrics-container">
            <div className="metric-item">
              <div className="metric-value">{stats.s}+</div>
              <div className="metric-label">Students</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">{stats.t}+</div>
              <div className="metric-label">Teachers</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">{stats.a}+</div>
              <div className="metric-label">Awards</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">{stats.y}+</div>
              <div className="metric-label">Years</div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="about-section-new">
        <Container>
          <div className="about-header">
            <span className="section-tag">About Us</span>
            <h2 className="section-title">
              A Legacy of <span className="text-gradient">Excellence</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-image-wrapper">
              <div className="image-main-container">
                <img src="/graduation.jpeg" alt="Students" className="image-main" />
              </div>
              <div className="stroke-box"></div>
              <div className="exp-badge">
                <h3>10+</h3>
                <p>Years</p>
              </div>
            </div>
            <div className="about-content">
              <h3>Why Choose JOKS School?</h3>
              <p className="section-desc">
                We provide a nurturing environment where academic excellence meets character development. Our holistic approach ensures every child reaches their full potential.
              </p>
              <div className="features-bento">
                {features.map((f, i) => (
                  <div key={i} className="feature-card">
                    <div className="feature-icon">{f.icon}</div>
                    <div className="feature-title">{f.title}</div>
                    <div className="feature-desc">{f.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <Link to="/about" className="btn-main">
                  Learn More <FaArrowRight style={{ marginLeft: 8 }} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="programs-section">
        <Container>
          <div className="programs-header">
            <span className="section-tag">Our Programs</span>
            <h2 className="section-title">Education that <span className="text-gradient">Transforms</span></h2>
          </div>
          <div className="programs-grid">
            {programs.map((p, i) => (
              <div key={i} className="program-card">
                <div className="p-icon">{p.icon}</div>
                <h3 className="p-title">{p.title}</h3>
                <p className="p-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ✨ TESTIMONIALS SECTION */}
      <section className="testimonials-section">
        <Container>
          <div className="testimonials-header">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our <span className="text-gradient">Parents Say</span></h2>
          </div>
          <div className="testimonials-carousel">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card ${i === currentTestimonial ? "active" : ""}`}
              >
                <div className="testimonial-image-wrapper">
                  <img src={t.image} alt={t.name} className="testimonial-image" />
                  <div className="testimonial-rating">
                    {[...Array(t.rating)].map((_, j) => (
                      <FaStar key={j} className="star" />
                    ))}
                  </div>
                </div>
                <div className="testimonial-content">
                  <FaQuoteLeft className="quote-icon" />
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <h4>{t.name}</h4>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === currentTestimonial ? "active" : ""}`}
                onClick={() => setCurrentTestimonial(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
};

export default Home;