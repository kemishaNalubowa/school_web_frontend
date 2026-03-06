import React, { useState, useEffect, useRef } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import {
  FaGraduationCap,
  FaBookOpen,
  FaUsers,
  FaTrophy,
  FaCalendarAlt,
  FaArrowRight,
  FaChild,
  FaChalkboardTeacher,
  FaPalette,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AdmissionCTA from "../../Components/AdmissionCTA/AdmissionCTA";
import "./Home.css";

const Home = () => {
  const slides = [
    {
      image: "/plainschool.jpeg",
      title: "Academic Excellence",
      text: "Providing a strong foundation for future leaders through innovative teaching.",
    },
    {
      image: "/kidswithlaptops.jpeg",
      title: "Digital Learning",
      text: "Integrating cutting-edge technology into everyday classrooms.",
    },
    {
      image: "/cultureday.jpg",
      title: "Cultural Diversity",
      text: "Celebrating heritage and unity in our school community.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const sectionRefs = { stats: useRef(null) };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => setIsLoaded(true), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.target === sectionRefs.stats.current
          ) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRefs.stats.current)
      observer.observe(sectionRefs.stats.current);

    return () => observer.disconnect();
  }, []);

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    awards: 0,
    years: 0,
  });

  useEffect(() => {
    if (statsVisible) {
      const targets = {
        students: 400,
        teachers: 20,
        awards: 10,
        years: 10,
      };

      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let current = {
        students: 0,
        teachers: 0,
        awards: 0,
        years: 0,
      };

      const increment = {
        students: targets.students / steps,
        teachers: targets.teachers / steps,
        awards: targets.awards / steps,
        years: targets.years / steps,
      };

      const timer = setInterval(() => {
        current = {
          students: Math.min(
            current.students + increment.students,
            targets.students
          ),
          teachers: Math.min(
            current.teachers + increment.teachers,
            targets.teachers
          ),
          awards: Math.min(
            current.awards + increment.awards,
            targets.awards
          ),
          years: Math.min(
            current.years + increment.years,
            targets.years
          ),
        };

        setStats({
          students: Math.round(current.students),
          teachers: Math.round(current.teachers),
          awards: Math.round(current.awards),
          years: Math.round(current.years),
        });

        if (current.students >= targets.students)
          clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [statsVisible]);

  const programs = [
    {
      icon: <FaChild />,
      title: "Nursery",
      desc: "Nurturing young minds with play-based learning.",
      link: "/programs/nursery",
    },
    {
      icon: <FaBookOpen />,
      title: "Primary",
      desc: "Building strong foundations in literacy and character.",
      link: "/programs/primary",
    },
    {
      icon: <FaPalette />,
      title: "Extracurricular",
      desc: "Sports, arts, debate, and clubs for well-rounded growth.",
      link: "/programs/extracurricular",
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Pastoral Care",
      desc: "Counseling and mentorship for every student's journey.",
      link: "/programs/support",
    },
  ];

  return (
    <div className={`home-page ${isLoaded ? "loaded" : ""}`}>
      
      {/* HERO */}
      <section id="hero" className="home-hero">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${
              index === currentSlide ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        <div className="hero-overlay"></div>

        <Container className="hero-content text-center">
          <h1 className="hero-title-block">JOKS SCHOOL</h1>

          <p className="hero-tagline">
            Empowering Tomorrow's Leaders Through Excellence in Education
          </p>

          <div className="hero-info-card" key={currentSlide}>
            <div className="card-icon">✨</div>
            <div className="card-content">
              <h3>{slides[currentSlide].title}</h3>
              <p>{slides[currentSlide].text}</p>
            </div>
          </div>

          <div className="hero-ctas">
            <Button
              as={Link}
              to="/admissions"
              className="btn-primary btn-lg"
            >
              Apply Now <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section
        id="stats"
        className="stats-section"
        ref={sectionRefs.stats}
      >
        <Container>
          <div className="stats-horizontal-wrapper">
            {[
              {
                icon: <FaUsers />,
                value: stats.students,
                label: "Students",
              },
              {
                icon: <FaGraduationCap />,
                value: stats.teachers,
                label: "Expert Teachers",
              },
              {
                icon: <FaTrophy />,
                value: stats.awards,
                label: "Awards Won",
              },
              {
                icon: <FaCalendarAlt />,
                value: stats.years,
                label: "Years of Excellence",
              },
            ].map((stat, index) => (
              <React.Fragment key={index}>
                <div className="stat-card-horizontal">
                  <div className="stat-icon-horizontal">
                    {stat.icon}
                  </div>
                  <div className="stat-value-horizontal">
                    {stat.value}+
                  </div>
                  <div className="stat-label-horizontal">
                    {stat.label}
                  </div>
                </div>
                {index < 3 && <div className="stat-divider" />}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="section-title">
                Legacy of{" "}
                <span className="text-gradient">Excellence</span> &
                Innovation
              </h2>

              <p className="section-description">
                JOKS School stands as a beacon of learning,
                combining traditional values with modern
                educational methodologies.
              </p>

              <p className="section-description">
                Our campus features smart classrooms, science
                labs, sports facilities and creative arts
                studios.
              </p>

              <div className="about-features">
                {[
                  "Cambridge & UBE Curriculum",
                  "1:15 Teacher-Student Ratio",
                  "100% University Placement",
                  "Holistic Development Focus",
                ].map((feature, i) => (
                  <div key={i} className="feature-item">
                    <span className="feature-check">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={6}>
              <div className="about-image-wrapper">
                <img
                  src="/graduation.jpeg"
                  alt="Graduation"
                  className="about-image-main"
                />

                <div className="about-image-accent">
                  <img
                    src="/kidswithlaptops.jpeg"
                    alt="Technology"
                  />
                </div>

                <div className="experience-badge">
                  <span className="badge-number">10+</span>
                  <span className="badge-text">
                    Years Excellence
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="programs-section">
        <Container>
          <div className="section-header text-center">
            <span className="section-tag">OUR PROGRAMS</span>
            <h2 className="section-title">
              Education that{" "}
              <span className="text-gradient">Transforms</span>
            </h2>
          </div>

          <Row className="programs-grid-compact">

            {programs.map((program, index) => (
              <Col xs={12} md={6} key={index}>
                <Card className="program-card-compact">
                  <Card.Body>
                    <div className="program-icon-compact">
                      {program.icon}
                    </div>

                    <Card.Title className="program-title-compact">
                      {program.title}
                    </Card.Title>

                    <Card.Text className="program-desc-compact">
                      {program.desc}
                    </Card.Text>

                  </Card.Body>
                </Card>
              </Col>
            ))}

          </Row>
        </Container>
      </section>

      {/* ADMISSIONS CTA */}
      <section
        id="admissions"
        className="admissions-cta-section"
      >
        <Container className="text-center">
          <AdmissionCTA />
        </Container>
      </section>
    </div>
  );
};

export default Home;