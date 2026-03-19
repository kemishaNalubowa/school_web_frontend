// src/Pages/Events/Events.jsx
import React, { useState, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight, FaTimes } from "react-icons/fa";
import "./Events.css";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample events data - Replace with API calls
  const eventsData = [
    {
      id: 1,
      title: "Annual Sports Day",
      description: "Join us for a day of athletic competition and school spirit. All students and parents are welcome.",
      date: "March 25, 2026",
      time: "8:00 AM - 4:00 PM",
      location: "School Main Field",
      category: "sports",
      image: "/sports.jpeg"
    },
    {
      id: 2,
      title: "Science Fair Exhibition",
      description: "Showcasing innovative student projects in science, technology, and engineering.",
      date: "April 10, 2026",
      time: "9:00 AM - 3:00 PM",
      location: "Science Block",
      category: "academic",
      image: "/science.jpeg"
    },
    {
      id: 3,
      title: "Cultural Day Celebration",
      description: "Celebrating our diverse community through music, dance, food, and traditional attire.",
      date: "April 22, 2026",
      time: "10:00 AM - 5:00 PM",
      location: "School Hall",
      category: "cultural",
      image: "/cultural.jpeg"
    },
    {
      id: 4,
      title: "Parent-Teacher Conference",
      description: "Meet with teachers to discuss your child's progress and academic development.",
      date: "May 5, 2026",
      time: "2:00 PM - 7:00 PM",
      location: "Classrooms",
      category: "meeting",
      image: "/meeting.jpeg"
    },
    {
      id: 5,
      title: "Music & Arts Performance",
      description: "An evening of talented student performances in music, drama, and visual arts.",
      date: "May 18, 2026",
      time: "6:00 PM - 9:00 PM",
      location: "Auditorium",
      category: "arts",
      image: "/arts.jpeg"
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
    { id: "meeting", label: "Meetings" }
  ];

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Handle event card click
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
        <h1>School Events</h1>
        <p className="hero-subtitle">
          Stay updated with all school activities, celebrations, and important gatherings.
        </p>
        
        {/* Search Bar */}
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm("")}>
              <FaTimes />
            </button>
          )}
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="events-main">
        
        {/* Filter Chips */}
        <div className="events-controls">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-chip ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className={`events-layout ${viewMode}`}>
            {filteredEvents.map(event => (
              <article
                key={event.id}
                className={`event-card ${viewMode === "list" ? "list-view" : ""}`}
                onClick={() => handleEventClick(event)}
              >
                {/* Event Image */}
                <div className="event-image-container">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="event-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200/1a0f2e/c41e3a?text=" + encodeURIComponent(event.title);
                    }}
                  />
                </div>

                {/* Event Content */}
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  {/* Event Meta */}
                  <div className="event-meta">
                    <div className="meta-item">
                      <FaCalendarAlt />
                      <span>{event.date}</span>
                    </div>
                    <div className="meta-item">
                      <FaClock />
                      <span>{event.time}</span>
                    </div>
                    <div className="meta-item">
                      <FaMapMarkerAlt />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="event-actions-footer">
                    <button className="details-btn">
                      View Details <FaArrowRight />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-state">
            <h3>No Events Found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

      </main>

      {/* ===== EVENT DETAILS MODAL ===== */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className="event-modal"
        size="lg"
      >
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-content-grid">
                {/* Modal Image */}
                <div className="modal-image">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300/1a0f2e/c41e3a?text=" + encodeURIComponent(selectedEvent.title);
                    }}
                  />
                </div>

                {/* Modal Details */}
                <div className="modal-details">
                  <div className="detail-section">
                    <h5>About This Event</h5>
                    <p>{selectedEvent.description}</p>
                  </div>

                  <div className="detail-section">
                    <h5>Event Details</h5>
                    <p><strong>Date:</strong> {selectedEvent.date}</p>
                    <p><strong>Time:</strong> {selectedEvent.time}</p>
                    <p><strong>Location:</strong> {selectedEvent.location}</p>
                  </div>

                  <div className="modal-actions">
                    <Button className="modal-register-btn" onClick={handleCloseModal}>
                      Register Now
                    </Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>
                      Close
                    </Button>
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