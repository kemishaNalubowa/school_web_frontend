// src/Components/CTAPopup/CTAPopup.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Removed FaGraduationCap import
import './CTAPopup.css';

const CTAPopup = ({ 
  autoCloseDelay = 10000,
  showDelay = 3000,
  title = "Ready to Join JOKS?",
  description = "JOKS is a supportive community that nurtures students in both intellectual, talent-oriented and ethically built ways.",
  buttonText = "Apply Now",
  buttonLink = "/admissions"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(autoCloseDelay / 1000);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, showDelay);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const autoCloseTimer = setTimeout(() => {
      setIsVisible(false);
    }, autoCloseDelay);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoCloseTimer);
      clearInterval(countdownInterval);
    };
  }, [autoCloseDelay, showDelay]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cta-popup-overlay" onClick={handleClose}>
      <div className="cta-popup" onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          className="cta-popup-close" 
          onClick={handleClose}
          aria-label="Close popup"
        >
          <FaTimes />
        </button>

        {/* Popup Title */}
        <h3>{title}</h3>

        {/* Popup Description */}
        <p>{description}</p>

        {/* CTA Button - Smaller & Centered */}
        <Link to={buttonLink} className="cta-popup-btn" onClick={handleClose}>
          {buttonText} <span className="arrow">→</span>
        </Link>

        {/* Countdown Timer */}
        <div className="cta-popup-timer">
          Closing in <span>{countdown}s</span>
        </div>

        {/* Progress Bar */}
        <div className="cta-popup-progress" style={{ '--delay': `${autoCloseDelay}ms` }}></div>

      </div>
    </div>
  );
};

export default CTAPopup;