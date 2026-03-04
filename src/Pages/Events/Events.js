import React, { useEffect, } from "react"; // Added useEffect and useRef
import { Container, Button } from "react-bootstrap";
import "./Events.css";

const Events = () => {
  // Updated Data with Images
  const eventsData = [
    {
      id: 1,
      date: "15",
      month: "Oct",
      title: "Annual Science Fair",
      description: "Students showcase innovative science projects. Parents are invited to witness the creativity of our future scientists.",
      time: "9:00 AM - 1:00 PM",
      location: "Main Hall",
      category: "Academic",
      image: "/graduation.jpeg" 
    },
    {
      id: 2,
      date: "22",
      month: "Oct",
      title: "Cultural Day Celebration",
      description: "A day to celebrate diversity! Students perform traditional dances and songs.",
      time: "10:00 AM - 4:00 PM",
      location: "School Playground",
      category: "Cultural",
      image: "/cultureday1.jpg"
    },
    {
      id: 3,
      date: "05",
      month: "Nov",
      title: "Parents' Open Day",
      description: "An opportunity for parents to meet teachers and discuss student progress.",
      time: "8:00 AM - 12:00 PM",
      location: "Various Classrooms",
      category: "Meeting",
      image: "/kidswithlaptops.jpeg"
    },
    {
      id: 4,
      date: "12",
      month: "Dec",
      title: "End of Year Concert",
      description: "Music, drama, and carols to wrap up the year.",
      time: "2:00 PM - 6:00 PM",
      location: "Auditorium",
      category: "Entertainment",
      image: "/graduation.jpeg"
    },
  ];

  // Animation Logic: Watch for scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of item is visible
    );

    // Select all items with the class 'timeline-item'
    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => observer.observe(item));

    // Cleanup observer
    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <div className="events-page">
      
      {/* Hero Section */}
      <div className="events-hero">
        <Container>
          <h1>Don't Miss Out!</h1>
          <p>Stay updated with the vibrant happenings at JOKS School Connect.</p>
        </Container>
      </div>

      <Container className="events-container">
        
        <div className="events-intro text-center">
          <h2>Upcoming Events</h2>
          <p>From academic fairs to cultural festivals, there is always something thrilling happening.</p>
        </div>

        {/* Vertical Timeline */}
        <div className="timeline">
          {eventsData.map((event, index) => (
            <div 
              key={event.id} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              {/* The Date Badge */}
              <div className="timeline-badge">
                <span className="date">{event.date}</span>
                <span className="month">{event.month}</span>
              </div>

              {/* The Content Card */}
              <div className="timeline-content">
                
                <div className="event-image-wrapper">
                  <img src={event.image} alt={event.title} className="event-image" />
                  <span className="image-category-tag">{event.category}</span>
                </div>

                <div className="event-body">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span><i className="icon">🕐</i> {event.time}</span>
                    <span><i className="icon">📍</i> {event.location}</span>
                  </div>
                  <Button className="event-btn">View Details</Button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </Container>

      <footer className="footer">
        <Container>
          <p>&copy; {new Date().getFullYear()} JOKS SCHOOL CONNECT. All Rights Reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Events;