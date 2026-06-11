import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaEye, FaBullseye, FaCalendarAlt, FaUsers, FaTrophy, FaAward,
  FaCheck, FaArrowRight, FaQuoteLeft, FaChild, FaGraduationCap,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// ─── Reusable Fade-Up Wrapper ───────────────────────────────────────────────
const FadeInSection = ({ children, delay = 0, threshold = 0.15 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // ─── Design Tokens ────────────────────────────────────────────────────────
  const c = {
    navy: "#1a0f2e", red: "#c41e3a", bgLight: "#FAF8F5",
    white: "#ffffff", textSecondary: "#495057", border: "#E9ECEF",
  };
  const shadowSm = "0 10px 25px rgba(21,9,32,0.08)";
  const shadowMd = "0 20px 40px rgba(21,9,32,0.12)";

  // ─── Data ────────────────────────────────────────────────────────────────
  const slides = ["/daycare.jpg", "/primary.jpg", "/swimming.jpeg", "/graduation2.jpg"];
  const stats = [
    { icon: <FaCalendarAlt />, value: "2018", label: "FOUNDED" },
    { icon: <FaUsers />, value: "500+", label: "STUDENTS" },
    { icon: <FaTrophy />, value: "12", label: "AWARDS WON" },
    { icon: <FaAward />, value: "100%", label: "DEDICATION" },
  ];
  const testimonials = [
    {
      quote: "JJokolera Junior School has been transformative for my children. The teachers are dedicated, nurturing, and truly care about each child's development. My daughter has grown into a confident, articulate young lady thanks to the supportive environment.",
      author: "MRS. SARAH K.",
      role: "Parent — Primary 5"
    },
    {
      quote: "The blend of academic rigor and Christian values at JJokolera is exactly what we were looking for. My son looks forward to school every day, and his progress in both academics and character has been remarkable.",
      author: "MR. DAVID M.",
      role: "Parent — Primary 3"
    },
    {
      quote: "From the moment we toured the campus, we knew this was the right place. The staff's warmth, the clean facilities, and the structured yet joyful learning environment give us complete peace of mind.",
      author: "MRS. GRACE N.",
      role: "Parent — Nursery"
    }
  ];

  // ─── Auto-slide (Hero) ────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);
  
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  // ─── Reusable Styles ──────────────────────────────────────────────────────
  const label = { color: c.red, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase", display: "block", marginBottom: "10px" };
  const heading = { fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: c.navy, marginBottom: "20px", lineHeight: 1.2 };
  const bodyText = { fontSize: "1rem", lineHeight: 1.7, color: c.textSecondary, marginBottom: "18px" };
  const linkStyle = { color: c.navy, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", letterSpacing: "1px", textTransform: "uppercase", transition: "all 0.3s ease" };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Global CSS for Reliable Hover & Transitions ── */}
      <style>{`
        .jjs-btn-outline, .jjs-btn-solid, .jjs-link, .jjs-card, .jjs-stat-box, .jjs-gallery-item img, .wwa-img-box img {
          transition: all 0.3s ease;
        }
        .jjs-btn-outline:hover { background:${c.white} !important; color:${c.navy} !important; }
        .jjs-btn-solid:hover { background:${c.red} !important; border-color:${c.red} !important; color:${c.white} !important; }
        .jjs-link:hover { color:${c.red} !important; transform:translateX(4px); }
        .jjs-card:hover, .jjs-stat-box:hover { transform:translateY(-6px); box-shadow:${shadowMd}; }
        
        .wwa-img-box { position:relative; border-radius:8px; overflow:hidden; box-shadow:${shadowMd}; aspect-ratio:4/3; }
        .wwa-img-box img { width:100%; height:100%; object-fit:cover; display:block; }
        .wwa-img-box:hover img { transform:scale(1.03); }
        .wwa-accent { position:absolute; bottom:0; left:0; right:0; height:4px; background:linear-gradient(90deg,${c.red},transparent); }
        .wwa-badge { position:absolute; top:20px; right:-10px; background:${c.white}; color:${c.navy}; padding:12px 20px; border-radius:4px; box-shadow:${shadowSm}; font-weight:700; font-size:0.9rem; display:flex; align-items:center; gap:8px; z-index:1; }

        .jjs-gallery-grid { display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:300px 200px; gap:16px; padding:0 20px; }
        .jjs-gallery-item { border-radius:8px; overflow:hidden; }
        .jjs-gallery-item img { width:100%; height:100%; object-fit:cover; display:block; }
        .jjs-gallery-item:hover img { transform:scale(1.05); }

        @media (max-width:991px){ .jjs-vm-row{flex-direction:column !important; gap:20px;} .jjs-vm-col{padding:0 !important;} }
        @media (max-width:768px){ .jjs-gallery-grid{grid-template-columns:1fr 1fr !important;} .jjs-gallery-large{grid-row:auto !important; grid-column:1/-1;} .jjs-stats-grid{grid-template-columns:repeat(2,1fr) !important;} }
        @media (max-width:480px){ .jjs-hero-title{font-size:2rem !important;} .jjs-hero-btns{flex-direction:column; align-items:center;} .jjs-btn-outline,.jjs-btn-solid{width:100%; max-width:300px; text-align:center;} .jjs-stats-grid{grid-template-columns:1fr !important;} .jjs-gallery-grid{grid-template-columns:1fr !important;} .hero-content-card{padding:40px 30px !important;} }
      `}</style>

      <div style={{ fontFamily:"'Segoe UI',Tahoma,Geneva,Verdana,sans-serif", overflowX:"hidden", backgroundColor:c.white }}>

      {/* ══════════════════════════════════════════ HERO ══════════════════════════════════════════ */}
      <FadeInSection>
        <section style={{ position:"relative", minHeight:"90vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 20px 40px", overflow:"hidden" }}>
          {slides.map((img, i) => (
            <div key={i} style={{ position:"absolute", inset:0, backgroundImage:`url(${img})`, backgroundSize:"cover", backgroundPosition:"center", opacity: i===currentSlide?1:0, transition:"opacity 1.2s ease-in-out", zIndex: i===currentSlide?1:0 }} />
          ))}
          
          <div style={{ position:"relative", zIndex:2, textAlign:"center", maxWidth:"900px", padding:"0 20px" }}>
            <div style={{ 
              display:"inline-block",
              padding:"16px 32px",
              backgroundColor: "rgba(26, 15, 46, 0.85)",
              backdropFilter: "blur(8px)",
              borderRadius: "8px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: "20px"
            }}>
              <span style={{ display:"block", color:c.red, fontWeight:700, fontSize:"0.85rem", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"10px" }}>WELCOME TO EXCELLENCE</span>
              <h1 className="jjs-hero-title" style={{ fontSize:"clamp(2.2rem,5vw,4rem)", fontWeight:800, lineHeight:1.1, textTransform:"uppercase", color:c.white, margin:0 }}>JJOKOLERA JUNIOR SCHOOL</h1>
            </div>
            
            <div className="jjs-hero-btns" style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
              <Link to="/admissions" className="jjs-btn-solid" style={{ padding:"12px 28px", fontWeight:700, fontSize:"0.85rem", textTransform:"uppercase", letterSpacing:"1px", borderRadius:"2px", textDecoration:"none", background:c.red, border:`2px solid ${c.red}`, color:c.white, boxShadow:"0 4px 15px rgba(196,30,58,0.4)" }}>APPLY NOW</Link>
              <Link to="/about" className="jjs-btn-outline" style={{ padding:"12px 28px", fontWeight:700, fontSize:"0.85rem", textTransform:"uppercase", letterSpacing:"1px", borderRadius:"2px", textDecoration:"none", background:"transparent", border:`2px solid ${c.white}`, color:c.white, boxShadow:"0 4px 15px rgba(0,0,0,0.2)" }}>LEARN MORE</Link>
            </div>
          </div>
          
          <div style={{ position:"absolute", bottom:"25px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"10px", zIndex:2 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Go to slide ${i+1}`} style={{ width: i===currentSlide?"28px":"10px", height:"10px", borderRadius: i===currentSlide?"5px":"50%", background: i===currentSlide?c.red:"rgba(255,255,255,0.4)", transition:"all 0.3s ease", border:"none", cursor:"pointer", padding:0 }} />
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* ══════════════════════════════════════════ STATS (MOVED + COMPACT) ══════════════════════════════════════════ */}
      <FadeInSection delay={0.05}>
        <section style={{ padding:"20px 0 30px", backgroundColor:c.navy }}>
          <Container>
            <div className="jjs-stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:"15px" }}>
              {stats.map((st, i) => (
                <div key={i} className="jjs-stat-box" style={{ textAlign:"center", padding:"12px 10px", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"4px" }}>
                  <div style={{ fontSize:"1.2rem", color:c.red, marginBottom:"6px" }}>{st.icon}</div>
                  <div style={{ fontSize:"1.25rem", fontWeight:800, color:c.white, marginBottom:"3px", lineHeight:1 }}>{st.value}</div>
                  <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.7)", letterSpacing:"0.5px", textTransform:"uppercase" }}>{st.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </FadeInSection>

      {/* ══════════════════════════════════════════ WHO WE ARE ══════════════════════════════════════════ */}
      <FadeInSection delay={0.1}>
        <section style={{ padding:"40px 0", backgroundColor:c.white }}>
          <Container>
            <Row className="align-items-center g-4">
              <Col lg={6} className="order-2 order-lg-1">
                <div style={{ paddingRight:"15px" }}>
                  <span style={label}>WHO WE ARE</span>
                  <h1 style={heading}>A LEGACY OF EXCELLENCE IN EARLY EDUCATION</h1>
                  <p style={bodyText}>JJokolera Junior School stands as a beacon of quality early childhood and primary education, combining traditional values with modern teaching methodologies. We don't just teach; we inspire, nurture, and guide every child to reach their full potential.</p>
                  <p style={{...bodyText, marginBottom:"20px"}}>Our safe, stimulating campus is designed to foster creativity, critical thinking, and physical well-being, ensuring every child develops a love for learning that lasts a lifetime.</p>
                  <Link to="/about" className="jjs-link" style={linkStyle}>READ OUR HISTORY <FaArrowRight /></Link>
                </div>
              </Col>
              <Col lg={6} className="order-1 order-lg-2">
                <div className="wwa-img-box">
                  <img src="/daycare.jpg" alt="Students engaged in digital learning at JJokolera Junior School" />
                  <div className="wwa-accent" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </FadeInSection>

      {/* ══════════════════════════════════════════ VISION & MISSION ══════════════════════════════════════════ */}
      <FadeInSection delay={0.15}>
        <section style={{ padding:"40px 0", backgroundColor:c.bgLight }}>
          <Container>
            <div style={{ textAlign:"center", marginBottom:"25px" }}>
              <span style={label}>OUR PURPOSE</span>
              <h2 style={{...heading, marginBottom:0}}>VISION &amp; MISSION</h2>
              <div style={{ width:"50px", height:"3px", background:c.red, margin:"12px auto 0" }} />
            </div>
            <div className="jjs-vm-row" style={{ display:"flex", alignItems:"stretch", position:"relative", gap:"16px" }}>
              {[
                { title:"Our Vision", icon:<FaEye />, accent:c.navy, iconBg:"rgba(26,15,46,0.07)", iconColor:c.navy, text:"To be a leading nursery and primary school that nurtures well-rounded, confident, and academically excellent children who positively impact society." },
                { title:"Our Mission", icon:<FaBullseye />, accent:c.red, iconBg:"rgba(196,30,58,0.08)", iconColor:c.red, text:"To provide quality, holistic education in a safe and nurturing environment that develops each child's intellectual, social, emotional, and physical potential through innovative teaching and Christian values." }
              ].map((vm, i) => (
                <div key={i} className="jjs-vm-col" style={{ flex:1 }}>
                  <div className="jjs-card" style={{ backgroundColor:c.white, borderRadius:"8px", boxShadow:shadowSm, padding:"28px 24px", textAlign:"center", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden", border:`1px solid ${c.border}` }}>
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:vm.accent }} />
                    <div style={{ width:"56px", height:"56px", borderRadius:"50%", background:vm.iconBg, color:vm.iconColor, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", fontSize:"1.4rem" }}>{vm.icon}</div>
                    <h3 style={{ fontSize:"1.2rem", fontWeight:700, color:c.navy, marginBottom:"12px" }}>{vm.title}</h3>
                    <p style={{ color:c.textSecondary, lineHeight:1.6, margin:0, fontSize:"0.9rem" }}>{vm.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </FadeInSection>

      {/* ══════════════════════════════════════════ PROGRAMS ══════════════════════════════════════════ */}
      <FadeInSection delay={0.15}>
        <section style={{ padding:"40px 0", backgroundColor:c.bgLight }}>
          <Container>
            <div style={{ textAlign:"center", marginBottom:"32px" }}>
              <span style={label}>OUR PROGRAMS</span>
              <h2 style={{...heading, marginBottom:0}}>Our Educational Programs</h2>
              <div style={{ width:"50px", height:"3px", background:c.red, margin:"12px auto 0" }} />
            </div>
            
            <Row className="g-3">
              {[
                {
                  title:"Nursery Program",
                  image:"/graduation.jpeg",
                  color:c.navy,
                  button:"Nursery Baby–Top",
                  desc:"A nurturing foundation designed for children aged 3–6 years, focusing on play-based discovery and social skills.",
                  features:["Creative & Moral Growth", "Interactive Activities", "Play-Based Learning"]
                },
                {
                  title:"Primary Program",
                  image:"/graduation.jpeg",
                  color:c.red,
                  button:"Primary P.1–P.7",
                  desc:"Rigorous academics fostering critical thinking and preparing students for lifelong learning and success.",
                  features:["STEM-Based Curriculum", "Holistic Development", "Character Formation"]
                }
              ].map((prog, i) => (
                <Col lg={6} key={i}>
                  <div className="jjs-card" style={{ 
                    backgroundColor:c.white, 
                    borderRadius:"10px", 
                    overflow:"hidden", 
                    height:"100%", 
                    display:"flex", 
                    flexDirection:"column", 
                    border:"1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
                    transition: "all 0.3s ease"
                  }}>
                    <div style={{ position:"relative", height:"200px", overflow:"hidden" }}>
                      <img src={prog.image} alt={prog.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    </div>
                    <div style={{ padding:"20px", flexGrow:1, display:"flex", flexDirection:"column" }}>
                      <h3 style={{ fontSize:"1.3rem", fontWeight:700, color:prog.color, marginBottom:"8px", lineHeight:1.3, textAlign:"center" }}>{prog.title}</h3>
                      <p style={{ color:c.textSecondary, lineHeight:1.6, marginBottom:"16px", fontSize:"0.9rem" }}>{prog.desc}</p>
                      <div style={{ marginBottom:"18px" }}>
                        {prog.features.map((feat, fi) => (
                          <div key={fi} style={{ display:"flex", alignItems:"flex-start", gap:"8px", padding:"4px 0", color:c.textSecondary, fontSize:"0.85rem" }}>
                            <div style={{ width:"16px", height:"16px", borderRadius:"50%", background:prog.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"0.55rem", color:c.white, marginTop:"1px" }}><FaCheck /></div>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop:"auto", paddingTop:"14px", borderTop:`1px solid ${c.border}` }}>
                        <Link to="/admissions" className="jjs-btn-solid" style={{ display:"inline-block", width:"100%", textAlign:"center", padding:"10px 20px", fontWeight:700, fontSize:"0.8rem", textTransform:"uppercase", letterSpacing:"1px", borderRadius:"5px", textDecoration:"none", background:prog.color, border:`2px solid ${prog.color}`, color:c.white, transition:"all 0.3s ease" }}>{prog.button}</Link>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </FadeInSection>

      {/* ══════════════════════════════════════════ GALLERY ══════════════════════════════════════════ */}
      <FadeInSection delay={0.1}>
        <section style={{ padding:"40px 0", backgroundColor:"#f5f5f5" }}>
          <Container>
            <div style={{ marginBottom:"20px" }}>
              <h2 style={{ fontSize:"1.6rem", fontWeight:700, color:c.navy, marginBottom:"5px" }}>The Jjokolera Experience</h2>
              <p style={{ color:"#777", fontSize:"0.88rem", margin:0 }}>A glimpse into the daily life of our learners on campus.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gridTemplateRows:"140px 140px", gap:"8px" }}>
              <div style={{ gridRow:"1 / span 2", borderRadius:"4px", overflow:"hidden" }}><img src="/swimming.jpeg" alt="Swimming" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} /></div>
              <div style={{ gridColumn:"2 / span 2", borderRadius:"4px", overflow:"hidden" }}><img src="/graduation2.jpg" alt="Graduation" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} /></div>
              <div style={{ borderRadius:"4px", overflow:"hidden" }}><img src="/primary.jpg" alt="Primary" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} /></div>
              <div style={{ borderRadius:"4px", overflow:"hidden" }}><img src="/niceschool.jpg" alt="Classroom" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} /></div>
            </div>
          </Container>
        </section>
      </FadeInSection>

      {/* ══════════════════════════════════════════ TESTIMONIAL (ROTATING) ══════════════════════════════════════════ */}
      <FadeInSection delay={0.15}>
        <section style={{ padding:"40px 0", backgroundColor:c.navy, textAlign:"center", color:c.white }}>
          <Container>
            <FaQuoteLeft style={{ fontSize:"2.2rem", color:c.red, marginBottom:"16px", opacity:0.5 }} />
            <div style={{ minHeight: "130px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {testimonials.map((t, i) => (
                <blockquote key={i} style={{ fontSize:"clamp(1rem,2.5vw,1.4rem)", fontStyle:"italic", lineHeight:1.5, maxWidth:"750px", margin:"0 auto 24px", fontWeight:300, border:"none", padding:0, opacity: i === currentTestimonial ? 1 : 0, position: i === currentTestimonial ? "relative" : "absolute", transition: "opacity 0.5s ease", pointerEvents: i === currentTestimonial ? "auto" : "none" }}>"{t.quote}"</blockquote>
              ))}
            </div>
            <h4 style={{ fontSize:"1rem", fontWeight:700, letterSpacing:"1px", color:c.white, marginBottom:"2px" }}>{testimonials[currentTestimonial].author}</h4>
            <span style={{ color:c.red, fontSize:"0.85rem" }}>{testimonials[currentTestimonial].role}</span>
            <div style={{ display:"flex", justifyContent:"center", gap:"8px", marginTop:"24px" }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrentTestimonial(i)} aria-label={`View testimonial ${i+1}`} style={{ width: i===currentTestimonial?"24px":"9px", height:"9px", borderRadius: i===currentTestimonial?"4px":"50%", background: i===currentTestimonial?c.red:"rgba(255,255,255,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
              ))}
            </div>
          </Container>
        </section>
      </FadeInSection>

      {/* ══════════════════════════════════════════ NEWS & EVENTS ══════════════════════════════════════════ */}
      <FadeInSection delay={0.1}>
        <section style={{ padding:"40px 0", backgroundColor:c.white }}>
          <Container>
            <div style={{ textAlign:"center", marginBottom:"32px" }}>
              <span style={label}>LATEST UPDATES</span>
              <h2 style={{ ...heading, marginBottom:"8px" }}>Latest Updates & Events</h2>
              <p style={{ ...bodyText, maxWidth:"600px", margin:"0 auto 10px", fontSize:"0.92rem" }}>Stay informed about our recent achievements, activities, and exciting moments at Jjokolera Junior School.</p>
              <div style={{ width:"55px", height:"3px", background:c.red, margin:"0 auto" }} />
            </div>
            <Row className="g-3 justify-content-center">
              <Col lg={6}>
                <article className="jjs-card" style={{ backgroundColor:c.white, borderRadius:"8px", overflow:"hidden", border:`1px solid ${c.border}`, boxShadow:"0 8px 24px rgba(0,0,0,0.07)", height:"100%" }}>
                  <div style={{ position:"relative", height:"180px", overflow:"hidden" }}>
                    <img src="/graduation1.jpg" alt="Primary Exams" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", top:"12px", left:"12px", background:c.white, color:c.red, padding:"5px 12px", fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"1px", borderRadius:"3px", boxShadow:"0 3px 10px rgba(0,0,0,0.08)" }}>Academics</div>
                  </div>
                  <div style={{ padding:"18px" }}>
                    <h3 style={{ fontSize:"1.3rem", fontWeight:700, color:c.navy, marginBottom:"12px", lineHeight:1.4 }}>Primary 7 National Exams Excellence</h3>
                    <p style={{ ...bodyText, marginBottom:"18px", fontSize:"0.92rem" }}>Our Primary Seven candidates achieved outstanding results in the national examinations, reflecting the dedication of both learners and teachers.</p>
                    <Link to="/events" className="jjs-link" style={linkStyle}>READ MORE <FaArrowRight /></Link>
                  </div>
                </article>
              </Col>
              <Col lg={6}>
                <article className="jjs-card" style={{ backgroundColor:c.white, borderRadius:"8px", overflow:"hidden", border:`1px solid ${c.border}`, boxShadow:"0 8px 24px rgba(0,0,0,0.07)", height:"100%" }}>
                  <div style={{ position:"relative", height:"180px", overflow:"hidden" }}>
                    <img src="/swimming.jpeg" alt="Sports" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", top:"12px", left:"12px", background:c.white, color:c.red, padding:"5px 12px", fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"1px", borderRadius:"3px", boxShadow:"0 3px 10px rgba(0,0,0,0.08)" }}>Sports</div>
                  </div>
                  <div style={{ padding:"18px" }}>
                    <h3 style={{ fontSize:"1.3rem", fontWeight:700, color:c.navy, marginBottom:"12px", lineHeight:1.4 }}>Inter-School Sports Competition Winners</h3>
                    <p style={{ ...bodyText, marginBottom:"18px", fontSize:"0.92rem" }}>Jjokolera Junior School emerged among the best-performing schools during the district sports competitions, showcasing teamwork and talent.</p>
                    <Link to="/events" className="jjs-link" style={linkStyle}>READ MORE <FaArrowRight /></Link>
                  </div>
                </article>
              </Col>
            </Row>
          </Container>
        </section>
      </FadeInSection>

      </div>
    </>
  );
};

export default Home;