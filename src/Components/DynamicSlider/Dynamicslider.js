import React, { useState, useEffect } from "react";
import "./DynamicSlider.css";

import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";

function DynamicSlider() {
  const images = [slide1, slide2, slide3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider">
      <img src={images[currentIndex]} alt="School Slide" />
    </div>
  );
}

export default DynamicSlider;