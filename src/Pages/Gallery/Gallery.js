import React, { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import Masonry from "react-masonry-css";
import "./Gallery.css";

const Gallery = () => {
  // Gallery Images Data with Descriptions
  const images = [
    { 
      id: 1, 
      src: "/kidswithlaptops.jpeg", 
      title: "Computer Lab", 
      category: "Academics",
      description: "Students exploring technology and digital literacy" 
    },
    { 
      id: 2, 
      src: "/swimming.jpeg", 
      title: "Sports Day", 
      category: "Sports",
      description: "Champions in the making, building teamwork and confidence" 
    },
    { 
      id: 3, 
      src: "/cultureday.jpg", 
      title: "Cultural Dance", 
      category: "Culture",
      description: "Celebrating our rich heritage through music and movement" 
    },
    { 
      id: 4, 
      src: "/library.jpg", 
      title: "Library Session", 
      category: "Academics",
      description: "Quiet moments of learning and discovery" 
    },
    { 
      id: 5, 
      src: "/graduation.jpeg", 
      title: "Graduation", 
      category: "Events",
      description: "Milestones achieved, futures bright" 
    },
    { 
      id: 6, 
      src: "/cultureday1.jpg", 
      title: "Art Class", 
      category: "Creativity",
      description: "Unleashing young artists and creative minds" 
    },
    { 
      id: 7, 
      src: "/playground.jpg", 
      title: "Playground", 
      category: "Sports",
      description: "Where fun, friendship, and physical activity thrive" 
    },
    { 
      id: 8, 
      src: "/greenschool.jpg", 
      title: "Assembly", 
      category: "Events",
      description: "Together as one community, united in purpose" 
    },
  ];

  // Filter State
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = ["all", "academics", "sports", "culture", "creativity", "events"];

  // Filtered Images
  const filteredImages = activeFilter === "all" 
    ? images 
    : images.filter(img => img.category.toLowerCase() === activeFilter);

  // Lightbox State
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Masonry Breakpoints
  const breakpointCols = {
    default: 3,  // Desktop: 3 columns
    992: 2,      // Tablet: 2 columns  
    576: 1       // Mobile: 1 column
  };

  // Handle Image Click
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  // Keyboard Navigation: Escape to close, Arrow keys for navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showModal) {
        handleCloseModal();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  return (
    <div className="gallery-page">
      
      {/* ✨ Hero Section */}
      <div className="gallery-hero">
        <Container>
          <h1>Our Gallery</h1>
          <p>A picture is worth a thousand words. Explore our memories.</p>
          <div className="hero-underline"></div>
        </Container>
      </div>

      <Container className="gallery-container">
        
        {/* ✨ Filter Buttons */}
        <div className="gallery-filters" role="tablist" aria-label="Filter gallery images">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
              aria-controls="gallery-grid"
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* ✨ Masonry Grid with react-masonry-css */}
        <Masonry
          breakpointCols={breakpointCols}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
          id="gallery-grid"
        >
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="masonry-item"
              onClick={() => handleImageClick(image)}
              onKeyDown={(e) => e.key === "Enter" && handleImageClick(image)}
              role="button"
              tabIndex={0}
              aria-label={`View ${image.title} - ${image.description}`}
            >
              <img 
                src={image.src} 
                alt={image.title} 
                loading="lazy"
                decoding="async"
              />
              
              {/* ✨ Hover Overlay */}
              <div className="image-overlay">
                <span className="overlay-category">{image.category}</span>
                <h3>{image.title}</h3>
                <span>{image.description}</span>
                <button 
                  className="overlay-view-btn" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleImageClick(image); 
                  }}
                  aria-label={`View full size: ${image.title}`}
                >
                  View <span className="arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </Masonry>

        {/* ✨ Load More Button (Optional - can add pagination logic) */}
        <div className="load-more-section">
          <button 
            className="load-more-btn"
            aria-label="Load more gallery images"
          >
            Load More <span className="arrow">→</span>
          </button>
        </div>

      </Container>

      {/* ✨ Lightbox Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered 
        size="lg"
        className="lightbox-modal"
        aria-labelledby="lightbox-title"
        role="dialog"
        aria-modal="true"
      >
        <Modal.Body className="p-0 position-relative">
          {/* Close Button */}
          <button 
            className="lightbox-close" 
            onClick={handleCloseModal}
            aria-label="Close image viewer"
          >
            ×
          </button>
          
          {selectedImage && (
            <div className="lightbox-content">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                id="lightbox-title"
              />
              <div className="lightbox-caption">
                <h4>{selectedImage.title}</h4>
                <p>{selectedImage.description}</p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      
    </div>
  );
};

export default Gallery;