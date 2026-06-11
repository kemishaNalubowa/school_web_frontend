import React, { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import Masonry from "react-masonry-css";
import "./Gallery.css";

const Gallery = () => {
  const images = [
    { id: 1, src: "/kidswithlaptops.jpeg", title: "Computer Lab", category: "Academics", description: "Students exploring technology and digital literacy" },
    { id: 2, src: "/swimming.jpeg", title: "Sports Day", category: "Sports", description: "Champions in the making, building teamwork and confidence" },
    { id: 3, src: "/cultureday.jpg", title: "Cultural Dance", category: "Culture", description: "Celebrating our rich heritage through music and movement" },
    { id: 4, src: "/library.jpg", title: "Library Session", category: "Academics", description: "Quiet moments of learning and discovery" },
    { id: 5, src: "/graduation.jpeg", title: "Graduation", category: "Events", description: "Milestones achieved, futures bright" },
    { id: 6, src: "/cultureday1.jpg", title: "Art Class", category: "Creativity", description: "Unleashing young artists and creative minds" },
    { id: 7, src: "/playground.jpg", title: "Playground", category: "Sports", description: "Where fun, friendship, and physical activity thrive" },
    { id: 8, src: "/greenschool.jpg", title: "Assembly", category: "Events", description: "Together as one community, united in purpose" },
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const filters = ["all", "academics", "sports", "culture", "creativity", "events"];

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category.toLowerCase() === activeFilter);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const breakpointCols = {
    default: 3,
    992: 2,
    576: 1,
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

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
      <div className="gallery-hero">
        <Container>
          <h1>Our Gallery</h1>
          <p>A picture is worth a thousand words. Explore our memories.</p>
          <div className="hero-underline"></div>
        </Container>
      </div>

      <Container className="gallery-container">
        <div className="gallery-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <Masonry
          breakpointCols={breakpointCols}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="masonry-item fixed-item"
              onClick={() => handleImageClick(image)}
            >
              <img src={image.src} alt={image.title} loading="lazy" />

              <div className="image-overlay">
                <span className="overlay-category">{image.category}</span>
                <h3>{image.title}</h3>
                <span>{image.description}</span>
              </div>
            </div>
          ))}
        </Masonry>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="p-0">
          <button className="lightbox-close" onClick={handleCloseModal}>
            ×
          </button>

          {selectedImage && (
            <div className="lightbox-content">
              <img src={selectedImage.src} alt={selectedImage.title} />
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