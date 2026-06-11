// src/Pages/Events/Events.jsx
import React, { useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { 
  FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaClock, 
  FaArrowRight, FaTimes, FaList, FaThLarge 
} from "react-icons/fa";
import "./Events.css";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample events data - Replace with Django API call later
  const eventsData = [
    {
      id: 1,
      title: "Annual Sports Day",
      description: "Join us for a day of athletic competition and school spirit. All students and parents are welcome.",
      date: "March 25, 2026",
      time: "8:00 AM - 4:00 PM",
      location: "School Main Field",
      category: "sports",
      image: "/swimming.jpeg"
    },
    {
      id: 2,
      title: "Science Fair Exhibition",
      description: "Showcasing innovative student projects in science, technology, and engineering.",
      date: "April 10, 2026",
      time: "9:00 AM - 3:00 PM",
      location: "Science Block",
      category: "academic",
      image: "/graduation1.jpg"
    },
    {
      id: 3,
      title: "Cultural Day Celebration",
      description: "Celebrating our diverse community through music, dance, food, and traditional attire.",
      date: "April 22, 2026",
      time: "10:00 AM - 5:00 PM",
      location: "School Hall",
      category: "cultural",
      image: "/cultureday1.jpg"
    },
    {
      id: 4,
      title: "Parent-Teacher Conference",
      description: "Meet with teachers to discuss your child's progress and academic development.",
      date: "May 5, 2026",
      time: "2:00 PM - 7:00 PM",
      location: "Classrooms",
      category: "meeting",
      image: "/teacher1.jpeg"
    },
    {
      id: 5,
      title: "Music & Arts Performance",
      description: "An evening of talented student performances in music, drama, and visual arts.",
      date: "May 18, 2026",
      time: "6:00 PM - 9:00 PM",
      location: "Auditorium",
      category: "arts",
      image: "/cultureday1.jpg"
    },
    {
      id: 6,
      title: "Graduation Ceremony",
      description: "Celebrating our graduating class as they embark on their next journey.",
      date: "June 15, 2026",
      time: "10:00 AM - 1:00 PM",
      location: "Main Hall",
      category: "ceremony",
      image: "/graduation.jpeg"
    }
  ];

  const categories = [
    { id: "all", label: "All Events" },
    { id: "sports", label: "Sports" },
    { id: "academic", label: "Academic" },
    { id: "cultural", label: "Cultural" },
    { id: "arts", label: "Arts" },
    { id: "meeting", label: "Meetings" },
    { id: "ceremony", label: "Ceremonies" }
  ];

  // 🔍 REAL-TIME SEARCH + CATEGORY FILTER
  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "all" || 
        event.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Handle event card click → open modal
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="events-page">
      
      {/* ===== HERO SECTION ===== */}
      <section className="events-hero">
        <div className="events-hero-content">
          <h1>School Events</h1>
          <p className="events-hero-subtitle">
            Stay updated with all school activities, celebrations, and important gatherings.
          </p>
          
          {/* ✅ WORKING SEARCH BAR */}
          <div className="events-search-wrapper">
            <FaSearch className="events-search-icon" aria-hidden="true" />
            <input
              type="text"
              className="events-search-input"
              placeholder="Search events by name, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search events"
            />
            {searchTerm && (
              <button 
                className="events-search-clear" 
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="events-main">
        
        {/* Filter Chips + View Toggle */}
        <div className="events-controls">
          <div className="events-filter-chips" role="tablist" aria-label="Filter events by category">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`events-filter-chip ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
                role="tab"
                aria-selected={selectedCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          <div className="events-view-toggle">
            <button
              className={`events-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
            >
              <FaThLarge />
            </button>
            <button
              className={`events-view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
            >
              <FaList />
            </button>
          </div>
        </div>

        {/* Events Count */}
        <p className="events-count" aria-live="polite">
          Showing {filteredEvents.length} of {eventsData.length} events
        </p>

        {/* Events Grid/List */}
        {filteredEvents.length > 0 ? (
          <div className={`events-layout ${viewMode === "grid" ? "grid" : "list"}`}>
            {filteredEvents.map((event, index) => (
              <article
                key={event.id}
                className={`events-card ${viewMode === "list" ? "list-view" : ""}`}
                onClick={() => handleEventClick(event)}
                onKeyDown={(e) => e.key === "Enter" && handleEventClick(event)}
                role="button"
                tabIndex={0}
                style={{ animationDelay: `${index * 0.05}s` }}
                aria-label={`View details for ${event.title}`}
              >
                {/* Event Image */}
                <div className="events-image-container">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="events-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x200/1a0f2e/c41e3a?text=${encodeURIComponent(event.title)}`;
                    }}
                  />
                  <span className={`events-category-badge events-cat-${event.category}`}>
                    {event.category}
                  </span>
                </div>

                {/* Event Content */}
                <div className="events-content">
                  <h3 className="events-title">{event.title}</h3>
                  <p className="events-description">{event.description}</p>
                  
                  {/* Event Meta */}
                  <div className="events-meta">
                    <div className="events-meta-item">
                      <FaCalendarAlt aria-hidden="true" />
                      <span>{event.date}</span>
                    </div>
                    <div className="events-meta-item">
                      <FaClock aria-hidden="true" />
                      <span>{event.time}</span>
                    </div>
                    <div className="events-meta-item">
                      <FaMapMarkerAlt aria-hidden="true" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="events-actions-footer">
                    <button className="events-details-btn" onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}>
                      View Details <FaArrowRight aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="events-empty-state">
            <div className="events-empty-icon">🔍</div>
            <h3>No Events Found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
            <button 
              className="events-reset-btn"
              onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* ✅ EVENT DETAILS MODAL (NO REGISTER BUTTON) */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className="events-modal"
        size="lg"
        aria-labelledby="event-modal-title"
        role="dialog"
        aria-modal="true"
      >
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="event-modal-title">{selectedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="events-modal-grid">
                {/* Modal Image */}
                <div className="events-modal-image">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/1a0f2e/c41e3a?text=${encodeURIComponent(selectedEvent.title)}`;
                    }}
                  />
                  <span className={`events-modal-category events-cat-${selectedEvent.category}`}>
                    {selectedEvent.category}
                  </span>
                </div>

                {/* Modal Details */}
                <div className="events-modal-details">
                  <div className="events-modal-section">
                    <h5>About This Event</h5>
                    <p>{selectedEvent.description}</p>
                  </div>

                  <div className="events-modal-section">
                    <h5>Event Details</h5>
                    <p><strong>Date:</strong> {selectedEvent.date}</p>
                    <p><strong>Time:</strong> {selectedEvent.time}</p>
                    <p><strong>Location:</strong> {selectedEvent.location}</p>
                  </div>

                  {/* ✅ NO REGISTER BUTTON - Just Close */}
                  <div className="events-modal-actions">
                    <button 
                      className="events-modal-close-btn"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>

    </div>
  );
};

export default Events;