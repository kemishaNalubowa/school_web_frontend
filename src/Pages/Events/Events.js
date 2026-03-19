import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Container, Row, Col, Badge, Button, Modal, Form } from "react-bootstrap";
import { 
  Calendar, MapPin, Clock, Users, Search, Filter, 
  Share2, Bell, ChevronRight, X, ExternalLink, Star 
} from "lucide-react";
import "./Events.css";

const Events = () => {
  // ===== STATE MANAGEMENT =====
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== ENHANCED EVENT DATA =====
  const eventsData = useMemo(() => [
    {
      id: 1,
      date: "2024-10-15",
      title: "Annual Science Fair",
      description: "Students showcase innovative science projects with live demonstrations, robotics competitions, and interactive exhibits. Winners receive scholarships and mentorship opportunities.",
      longDescription: "Join us for the most anticipated academic event of the year! Our Science Fair features over 50 student projects across biology, physics, chemistry, and engineering categories. Meet young innovators, witness live experiments, and participate in hands-on workshops led by industry professionals.",
      time: { start: "9:00 AM", end: "1:00 PM" },
      location: { name: "Main Hall", address: "Building A, JOKS Campus", mapLink: "#" },
      category: "Academic",
      image: "/graduation.jpeg",
      capacity: 300,
      registered: 247,
      speakers: ["Dr. Sarah Chen - MIT", "Prof. James Wilson - Stanford"],
      tags: ["STEM", "Innovation", "Competition"],
      status: "open", // 'open' | 'full' | 'closed' | 'past'
      featured: true,
      countdown: true
    },
    {
      id: 2,
      date: "2024-10-22",
      title: "Cultural Day Celebration",
      description: "A vibrant celebration of global diversity! Experience traditional dances, authentic cuisine, cultural exhibitions, and student performances from 30+ countries.",
      longDescription: "Immerse yourself in a world of cultures! Our Cultural Day features traditional attire parades, international food stalls, folk music performances, and interactive cultural workshops. Students share their heritage through art, storytelling, and dance.",
      time: { start: "10:00 AM", end: "4:00 PM" },
      location: { name: "School Playground", address: "Central Campus Grounds", mapLink: "#" },
      category: "Cultural",
      image: "/cultureday1.jpg",
      capacity: 500,
      registered: 412,
      activities: ["Dance Performances", "Food Festival", "Art Exhibition", "Cultural Quiz"],
      tags: ["Diversity", "Community", "Arts"],
      status: "open",
      featured: true,
      countdown: true
    },
    {
      id: 3,
      date: "2024-11-05",
      title: "Parents' Open Day",
      description: "Connect with educators, explore classrooms, review student portfolios, and discuss academic progress in a personalized setting.",
      longDescription: "An exclusive opportunity for parents to engage directly with teachers, counselors, and administrators. Tour specialized facilities, review curriculum updates, attend workshops on supporting student success, and schedule one-on-one progress consultations.",
      time: { start: "8:00 AM", end: "12:00 PM" },
      location: { name: "Various Classrooms", address: "All Academic Buildings", mapLink: "#" },
      category: "Meeting",
      image: "/kidswithlaptops.jpeg",
      capacity: 200,
      registered: 156,
      sessions: ["Curriculum Overview", "Student Progress Reviews", "Q&A with Leadership", "Facility Tours"],
      tags: ["Parents", "Education", "Community"],
      status: "open",
      featured: false,
      countdown: true
    },
    {
      id: 4,
      date: "2024-12-12",
      title: "End of Year Concert",
      description: "A spectacular showcase of student talent featuring orchestral performances, theatrical productions, choir ensembles, and festive carols.",
      longDescription: "Celebrate the year's achievements with our grand finale! The concert features performances by our award-winning choir, drama club productions, instrumental ensembles, and special guest appearances. Dress code: Festive Formal.",
      time: { start: "2:00 PM", end: "6:00 PM" },
      location: { name: "Auditorium", address: "Performing Arts Center", mapLink: "#" },
      category: "Entertainment",
      image: "/graduation.jpeg",
      capacity: 400,
      registered: 389,
      performers: ["School Orchestra", "Drama Society", "Choir Ensemble", "Dance Troupe"],
      tags: ["Music", "Performance", "Celebration"],
      status: "almost-full",
      featured: true,
      countdown: true
    },
  ], []);

  // ===== CATEGORIES & UTILS =====
  const categories = ["All", "Academic", "Cultural", "Meeting", "Entertainment"];
  
  const categoryColors = {
    Academic: "var(--academic)",
    Cultural: "var(--cultural)", 
    Meeting: "var(--meeting)",
    Entertainment: "var(--entertainment)"
  };

  const getStatusConfig = (status) => {
    const configs = {
      open: { label: "Registration Open", variant: "success", icon: "✓" },
      full: { label: "Waitlist Only", variant: "warning", icon: "⚠" },
      "almost-full": { label: "Limited Seats", variant: "info", icon: "●" },
      closed: { label: "Registration Closed", variant: "secondary", icon: "✕" },
      past: { label: "Event Completed", variant: "muted", icon: "✓" }
    };
    return configs[status] || configs.open;
  };

  // ===== FILTERING LOGIC =====
  const filterEvents = useCallback(() => {
    let result = [...eventsData];
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Category filter
    if (activeCategory !== "All") {
      result = result.filter(event => event.category === activeCategory);
    }
    
    // Sort: featured first, then by date
    result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(a.date) - new Date(b.date);
    });
    
    setFilteredEvents(result);
  }, [searchQuery, activeCategory, eventsData]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [eventsData]);

  useEffect(() => {
    filterEvents();
  }, [filterEvents]);

  // ===== EVENT ACTIONS =====
  const handleRegister = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => [...prev, eventId]);
      // Show toast/notification here in production
    }
  };

  const handleAddToCalendar = (event) => {
    const startDate = new Date(`${event.date}T${event.time.start.replace(' ', '')}`);
    const endDate = new Date(`${event.date}T${event.time.end.replace(' ', '')}`);
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location.name)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const handleShare = async (event) => {
    const shareData = {
      title: event.title,
      text: `Join me at ${event.title} - ${event.description}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show copied toast
    }
  };

  // ===== COUNTDOWN COMPONENT =====
  const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      const calculate = () => {
        const difference = new Date(targetDate) - new Date();
        if (difference <= 0) return;
        
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      };
      
      calculate();
      const timer = setInterval(calculate, 1000);
      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="countdown">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="countdown-item">
            <span className="countdown-value">{String(value).padStart(2, '0')}</span>
            <span className="countdown-label">{unit}</span>
          </div>
        ))}
      </div>
    );
  };

  // ===== SKELETON LOADING =====
  if (loading) {
    return (
      <div className="events-page loading">
        <Container>
          <div className="skeleton-hero" />
          <div className="skeleton-filters" />
          <div className="skeleton-grid">
            {[1,2,3,4].map(i => <div key={i} className="skeleton-card" />)}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="events-page">
      
      {/* ===== HERO SECTION ===== */}
      <section className="events-hero">
        <Container className="hero-content">
          <Badge className="hero-badge animate-fade-in">🎉 Upcoming Events</Badge>
          <h1 className="animate-slide-up">
            Discover <span className="highlight-gradient">Amazing Events</span>
          </h1>
          <p className="hero-subtitle animate-slide-up delay-1">
            From academic excellence to cultural celebrations — stay connected with everything happening at JOKS School Connect.
          </p>
          
          {/* Search Bar */}
          <div className="search-wrapper animate-slide-up delay-2">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search events, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="search-clear">
                <X size={16} />
              </button>
            )}
          </div>
        </Container>
        
        {/* Decorative Elements */}
        <div className="hero-decoration decoration-1" />
        <div className="hero-decoration decoration-2" />
      </section>

      <Container className="events-main">
        
        {/* ===== CONTROLS BAR ===== */}
        <div className="events-controls">
          
          {/* Category Filters */}
          <div className="filter-group">
            <Filter size={18} />
            <div className="filter-chips">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  style={activeCategory === cat ? { borderColor: categoryColors[cat] } : {}}
                >
                  {cat}
                  {activeCategory === cat && <span className="chip-indicator" />}
                </button>
              ))}
            </div>
          </div>
          
          {/* View Toggle & Stats */}
          <div className="controls-right">
            <span className="events-count">{filteredEvents.length} events found</span>
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                ▦
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* ===== EVENTS GRID/LIST ===== */}
        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No events found</h3>
            <p>Try adjusting your search or filters to discover more events.</p>
            <Button variant="outline-primary" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`events-layout ${viewMode}`}>
            {filteredEvents.map((event, index) => {
              const status = getStatusConfig(event.status);
              const isRegistered = registeredEvents.includes(event.id);
              const seatsLeft = event.capacity - event.registered;
              
              return (
                <article 
                  key={event.id} 
                  className={`event-card ${event.featured ? 'featured' : ''} ${viewMode === 'list' ? 'list-view' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Featured Ribbon */}
                  {event.featured && <div className="featured-ribbon">★ Featured</div>}
                  
                  {/* Event Image */}
                  <div className="event-image-container">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="event-image"
                      loading="lazy"
                    />
                    <div className="image-overlay" />
                    
                    {/* Category Badge */}
                    <Badge 
                      className="category-badge"
                      style={{ backgroundColor: categoryColors[event.category] }}
                    >
                      {event.category}
                    </Badge>
                    
                    {/* Status Badge */}
                    <Badge className={`status-badge status-${status.variant}`}>
                      {status.icon} {status.label}
                    </Badge>
                    
                    {/* Quick Actions */}
                    <div className="event-actions">
                      <button 
                        className="action-btn"
                        onClick={(e) => { e.stopPropagation(); handleShare(event); }}
                        title="Share Event"
                      >
                        <Share2 size={16} />
                      </button>
                      <button 
                        className="action-btn"
                        onClick={(e) => { e.stopPropagation(); handleAddToCalendar(event); }}
                        title="Add to Calendar"
                      >
                        <Calendar size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Event Content */}
                  <div className="event-content">
                    <div className="event-header">
                      <h3 className="event-title">{event.title}</h3>
                      {event.countdown && event.status !== 'past' && (
                        <CountdownTimer targetDate={event.date} />
                      )}
                    </div>
                    
                    <p className="event-description">{event.description}</p>
                    
                    {/* Event Meta */}
                    <div className="event-meta">
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{event.time.start} - {event.time.end}</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={16} />
                        <span>{event.location.name}</span>
                      </div>
                      <div className="meta-item">
                        <Users size={16} />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="event-tags">
                      {event.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    
                    {/* Progress Bar for Capacity */}
                    {event.status !== 'past' && (
                      <div className="capacity-progress">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${(event.registered / event.capacity) * 100}%`,
                            backgroundColor: seatsLeft < 20 ? 'var(--warning)' : categoryColors[event.category]
                          }}
                        />
                        <span className="progress-text">
                          {seatsLeft < 20 ? `Only ${seatsLeft} seats left!` : `${Math.round((event.registered/event.capacity)*100)}% filled`}
                        </span>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="event-actions-footer">
                      <Button
                        className={`register-btn ${isRegistered ? 'registered' : ''} ${event.status === 'full' ? 'disabled' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleRegister(event.id); }}
                        disabled={event.status === 'full' || isRegistered}
                        style={{ borderColor: categoryColors[event.category] }}
                      >
                        {isRegistered ? '✓ Registered' : 
                         event.status === 'full' ? 'Join Waitlist' : 
                         'Reserve Spot'}
                      </Button>
                      
                      <Button variant="outline" className="details-btn" onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}>
                        Details <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </Container>

      {/* ===== EVENT DETAILS MODAL ===== */}
      <Modal 
        show={!!selectedEvent} 
        onHide={() => setSelectedEvent(null)}
        className="event-modal"
        centered
        size="lg"
      >
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-content-grid">
                <div className="modal-image">
                  <img src={selectedEvent.image} alt={selectedEvent.title} />
                  <Badge style={{ backgroundColor: categoryColors[selectedEvent.category] }}>
                    {selectedEvent.category}
                  </Badge>
                </div>
                
                <div className="modal-details">
                  <div className="detail-section">
                    <h5>About This Event</h5>
                    <p>{selectedEvent.longDescription || selectedEvent.description}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h5>📅 Date & Time</h5>
                    <p>
                      <strong>{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong><br/>
                      {selectedEvent.time.start} - {selectedEvent.time.end}
                    </p>
                  </div>
                  
                  <div className="detail-section">
                    <h5>📍 Location</h5>
                    <p>
                      <strong>{selectedEvent.location.name}</strong><br/>
                      {selectedEvent.location.address}<br/>
                      <a href={selectedEvent.location.mapLink} className="map-link" target="_blank" rel="noopener noreferrer">
                        View on Map <ExternalLink size={14} />
                      </a>
                    </p>
                  </div>
                  
                  {selectedEvent.speakers && (
                    <div className="detail-section">
                      <h5>🎤 Featured Speakers</h5>
                      <ul>
                        {selectedEvent.speakers.map((speaker, i) => <li key={i}>{speaker}</li>)}
                      </ul>
                    </div>
                  )}
                  
                  <div className="detail-section">
                    <h5>👥 Attendance</h5>
                    <div className="attendance-stats">
                      <div className="stat">
                        <span className="stat-number">{selectedEvent.registered}</span>
                        <span className="stat-label">Registered</span>
                      </div>
                      <div className="stat">
                        <span className="stat-number">{selectedEvent.capacity - selectedEvent.registered}</span>
                        <span className="stat-label">Seats Left</span>
                      </div>
                      <div className="stat">
                        <span className="stat-number">{Math.round((selectedEvent.registered/selectedEvent.capacity)*100)}%</span>
                        <span className="stat-label">Filled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="modal-actions">
                <Button variant="outline" onClick={() => handleShare(selectedEvent)}>
                  <Share2 size={16} /> Share
                </Button>
                <Button variant="outline" onClick={() => handleAddToCalendar(selectedEvent)}>
                  <Calendar size={16} /> Add to Calendar
                </Button>
                <Button 
                  className="modal-register-btn"
                  style={{ backgroundColor: categoryColors[selectedEvent.category], borderColor: categoryColors[selectedEvent.category] }}
                  onClick={() => { handleRegister(selectedEvent.id); setSelectedEvent(null); }}
                  disabled={registeredEvents.includes(selectedEvent.id)}
                >
                  {registeredEvents.includes(selectedEvent.id) ? '✓ Already Registered' : 'Register Now'}
                </Button>
              </div>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* ===== FOOTER ===== */}
      <footer className="events-footer">
        <Container>
          <div className="footer-content">
            <p>© {new Date().getFullYear()} <strong>JOKS SCHOOL CONNECT</strong>. All Rights Reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Use</a>
              <a href="#contact">Contact Support</a>
            </div>
          </div>
        </Container>
      </footer>

      {/* ===== FLOATING ACTION BUTTON ===== */}
      <button className="fab-notification" title="Event Reminders">
        <Bell size={20} />
        <span className="fab-badge">3</span>
      </button>

    </div>
  );
};

export default Events;