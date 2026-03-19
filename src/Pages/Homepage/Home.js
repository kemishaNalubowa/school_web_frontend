// src/Pages/Homepage/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaGraduationCap, FaBookOpen, FaUsers, FaTrophy, FaArrowRight,
  FaChild, FaChalkboardTeacher, FaStar, FaQuoteLeft, FaCalendarAlt,
  FaImage, FaPlay, FaCheckCircle, FaHeart
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
    { 
      icon: <FaChild />, 
      title: "Nursery", 
      desc: "Nurturing young minds through play-based learning in a safe, loving environment.",
      color: "#c41e3a",
    },
    { 
      icon: <FaBookOpen />, 
      title: "Primary", 
      desc: "Building strong academic foundations and character development for lifelong success.",
      color: "#1a0f2e",
    },
    { 
      icon: <FaChalkboardTeacher />, 
      title: "Mentorship", 
      desc: "Guiding students with personalized pastoral care and academic support.",
      color: "#c41e3a",
    },
  ];

  const features = [
    { icon: <FaGraduationCap />, title: "Modern Curriculum", desc: "Blending Cambridge & UBE standards for global readiness." },
    { icon: <FaUsers />, title: "Small Classes", desc: "Personalized attention with 1:15 teacher-student ratio." },
    { icon: <FaTrophy />, title: "Award Winning", desc: "Excellence recognized in academics, sports & arts." },
    { icon: <FaStar />, title: "Values Based", desc: "Character, integrity & leadership at our core." }
  ];

  const testimonials = [
    { image: "/teacher1.jpeg", name: "Sarah Nakato", role: "Parent", text: "JOKS School has transformed my child's confidence. The teachers truly care!", rating: 5 },
    { image: "/teacher2.jpeg", name: "James Mukasa", role: "Parent", text: "The holistic approach here is exceptional. My daughter loves school every day.", rating: 5 },
    { image: "/teacher3.jpeg", name: "Grace Akello", role: "Parent", text: "Outstanding facilities and dedicated staff. Best decision for our son's education.", rating: 5 },
  ];

  const newsItems = [
    { date: "Mar 15", title: "Science Fair Winners", excerpt: "Our young scientists shine at the regional competition.", image: "/science.jpeg" },
    { date: "Mar 10", title: "Sports Day Success", excerpt: "Record-breaking performances at our annual sports day.", image: "/sports.jpeg" },
    { date: "Mar 05", title: "New Library Launch", excerpt: "State-of-the-art learning resource center now open.", image: "/library.jpeg" },
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

      {/* ===== HERO SECTION ===== */}
      <section className="home-hero">
        <div className="hero-slides-wrapper">
          {slides.map((s, i) => (
            <div 
              key={i} 
              className={`hero-slide ${i === currentSlide ? "active" : ""}`} 
              style={{ backgroundImage: `url(${s.image})` }} 
            />
          ))}
        </div>
        <div className="hero-gradient-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">JOKS SCHOOL</h1>
          <p className="hero-tagline">Empowering Tomorrow's Leaders Through Excellence in Education</p>
          
          <div className="hero-cta-group">
            <Link to="/admissions" className="btn-primary">
              Apply Now <FaArrowRight />
            </Link>
            <Link to="/about" className="btn-secondary">
              <FaPlay /> Virtual Tour
            </Link>
          </div>
        </div>
      </section>

      {/* ===== METRICS BAR ===== */}
      <section className="metrics-section" ref={statsRef}>
        <Container>
          <div className="metrics-container">
            <div className="metric-item">
              <div className="metric-icon"><FaUsers /></div>
              <div className="metric-value">{stats.s}+</div>
              <div className="metric-label">Happy Students</div>
            </div>
            <div className="metric-item">
              <div className="metric-icon"><FaChalkboardTeacher /></div>
              <div className="metric-value">{stats.t}+</div>
              <div className="metric-label">Expert Teachers</div>
            </div>
            <div className="metric-item">
              <div className="metric-icon"><FaTrophy /></div>
              <div className="metric-value">{stats.a}+</div>
              <div className="metric-label">Awards Won</div>
            </div>
            <div className="metric-item">
              <div className="metric-icon"><FaCalendarAlt /></div>
              <div className="metric-value">{stats.y}+</div>
              <div className="metric-label">Years Excellence</div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="about-section-elite">
        <Container fluid className="px-0">
          <Row className="g-0">
            {/* Image Side */}
            <Col lg={6} className="about-image-col">
              <div className="about-image-elite">
                <img src="/graduation.jpeg" alt="Students celebrating" className="about-main-img" />
                <div className="about-image-overlay"></div>
                
                {/* Floating Card */}
                <div className="about-float-card">
                  <div className="float-card-icon"><FaCheckCircle /></div>
                  <div className="float-card-text">
                    <strong>10+ Years</strong>
                    <span>Of Educational Excellence</span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="about-deco-circle deco-1"></div>
                <div className="about-deco-circle deco-2"></div>
              </div>
            </Col>

            {/* Content Side */}
            <Col lg={6} className="about-content-col">
              <div className="about-content-elite">
                <span className="section-eyebrow">About JOKS</span>
                <h2 className="section-heading">
                  Where <span className="text-accent">Potential</span> Meets <span className="text-accent">Purpose</span>
                </h2>
                <p className="section-lead">
                  For over a decade, we've been nurturing young minds in an environment where academic excellence and character development go hand in hand.
                </p>
                
                <div className="about-highlights">
                  {features.map((f, i) => (
                    <div key={i} className="highlight-item">
                      <div className="highlight-icon">{f.icon}</div>
                      <div className="highlight-text">
                        <strong>{f.title}</strong>
                        <span>{f.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="about-cta-row">
                  <Link to="/about" className="btn-primary">
                    Learn More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== PROGRAMS SECTION ===== */}
      <section className="programs-section-elite">
        <Container>
          <div className="section-header-centered">
            <span className="section-eyebrow">Our Programs</span>
            <h2 className="section-heading">
              Education That <span className="text-accent">Transforms</span> Lives
            </h2>
            <p className="section-subtitle">
              Tailored learning pathways for every stage of your child's journey
            </p>
          </div>

          <div className="programs-grid-elite">
            {programs.map((p, i) => (
              <div key={i} className="program-card-elite">
                <div className="program-card-header" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}dd)` }}>
                  <div className="program-icon-large">{p.icon}</div>
                  <span className="program-level">{i === 0 ? 'Ages 3-5' : i === 1 ? 'Ages 6-12' : 'All Levels'}</span>
                </div>
                <div className="program-card-body">
                  <h3 className="program-title">{p.title}</h3>
                  <p className="program-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="programs-cta">
            <p>Not sure which program is right for your child?</p>
            <Link to="/admissions" className="btn-primary">
              Book a Consultation <FaArrowRight />
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="gallery-section-elite">
        <Container>
          <div className="section-header-centered">
            <span className="section-eyebrow">Campus Life</span>
            <h2 className="section-heading">A Glimpse Into <span className="text-accent">Our World</span></h2>
          </div>
          
          <div className="gallery-grid">
            <div className="gallery-item gallery-large">
              <img src="/plainschool.jpeg" alt="Campus" />
              <div className="gallery-overlay">
                <FaImage /> Modern Facilities
              </div>
            </div>
            <div className="gallery-item">
              <img src="/kidswithlaptops.jpeg" alt="Learning" />
              <div className="gallery-overlay">
                <FaBookOpen /> Digital Learning
              </div>
            </div>
            <div className="gallery-item">
              <img src="/swimming.jpeg" alt="Sports" />
              <div className="gallery-overlay">
                <FaTrophy /> Sports & Arts
              </div>
            </div>
            <div className="gallery-item">
              <img src="/graduation.jpeg" alt="Achievement" />
              <div className="gallery-overlay">
                <FaGraduationCap /> Celebrations
              </div>
            </div>
          </div>
          
          <div className="gallery-cta">
            <Link to="/gallery" className="btn-outline">
              View Gallery <FaArrowRight />
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section-elite">
        <Container>
          <div className="section-header-centered">
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="section-heading">What <span className="text-accent">Parents Say</span></h2>
          </div>
          
          <div className="testimonials-carousel-elite">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card-elite ${i === currentTestimonial ? "active" : ""}`}
              >
                <div className="testimonial-header">
                  <img src={t.image} alt={t.name} className="testimonial-avatar" />
                  <div className="testimonial-author">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(t.rating)].map((_, j) => <FaStar key={j} />)}
                  </div>
                </div>
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-text">"{t.text}"</p>
              </div>
            ))}
          </div>
          
          <div className="testimonial-nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === currentTestimonial ? "active" : ""}`}
                onClick={() => setCurrentTestimonial(i)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ===== NEWS & EVENTS ===== */}
      <section className="news-section-elite">
        <Container>
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">Latest News</span>
              <h2 className="section-heading">Stay <span className="text-accent">Updated</span></h2>
            </div>
            <Link to="/events" className="btn-link">
              View All <FaArrowRight />
            </Link>
          </div>
          
          <div className="news-grid">
            {newsItems.map((news, i) => (
              <article key={i} className="news-card">
                <div className="news-image">
                  <img src={news.image} alt={news.title} />
                  <span className="news-date">{news.date}</span>
                </div>
                <div className="news-content">
                  <h3>{news.title}</h3>
                  <p>{news.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section-elite">
        <div className="cta-bg-overlay"></div>
        <Container className="position-relative">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <FaHeart className="cta-icon" />
              <h2 className="cta-heading">Ready to Begin Your Child's Journey?</h2>
              <p className="cta-subtitle">
                Join the JOKS family today and give your child the foundation they deserve.
              </p>
              <div className="cta-buttons">
                <Link to="/admissions" className="btn-primary btn-lg">
                  Apply Now <FaArrowRight />
                </Link>
                <Link to="/contact" className="btn-outline btn-lg">
                  Contact Us
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default Home;