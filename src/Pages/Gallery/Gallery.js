import React, { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import "./Gallery.css";

const Gallery = () => {
  // Dummy Data - Replace with your real images
  const images = [
    { id: 1, src: "/kidswithlaptops.jpeg", title: "Computer Lab", category: "Academics" },
    { id: 2, src: "/swimming.jpeg", title: "Sports Day", category: "Sports" },
    { id: 3, src: "/cultureday.jpg", title: "Cultural Dance", category: "Culture" },
    { id: 4, src: "/library.jpg", title: "Library Session", category: "Academics" },
    { id: 5, src: "/graduation.jpeg", title: "Graduation", category: "Events" },
    { id: 6, src: "/cultureday1.jpg", title: "Art Class", category: "Creativity" },
    { id: 7, src: "/playground.jpg", title: "Playground", category: "Sports" },
    { id: 8, src: "/greenschool.jpg", title: "Assembly", category: "Events" },
  ];

  // State for Lightbox Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <div className="gallery-page">
      
      {/* Hero Section */}
      <div className="gallery-hero">
        <Container>
          <h1>Our Gallery</h1>
          <p>A picture is worth a thousand words. Explore our memories.</p>
        </Container>
      </div>

      <Container className="gallery-container">
        
        {/* Masonry Grid */}
        <div className="masonry-grid">
          {images.map((image, index) => (
            <div 
                key={image.id} 
                className={`masonry-item item-${index % 3}`} // Alternates heights
                onClick={() => handleImageClick(image)}
            >
              <img src={image.src} alt={image.title} />
              <div className="image-overlay">
                <h3>{image.title}</h3>
                <span>{image.category}</span>
              </div>
            </div>
          ))}
        </div>

      </Container>

      {/* Lightbox Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        centered 
        size="lg"
        className="lightbox-modal"
      >
        <Modal.Body className="p-0">
          {selectedImage && (
            <div className="lightbox-content">
              <img src={selectedImage.src} alt={selectedImage.title} />
              <div className="lightbox-caption">
                <h4>{selectedImage.title}</h4>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <p>&copy; {new Date().getFullYear()} JOKS SCHOOL CONNECT. All Rights Reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Gallery;