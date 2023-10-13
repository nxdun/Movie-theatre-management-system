import React, { useState } from "react";

export function Slideshow({ images }) {
  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    const newIndex = slideIndex + n;
    if (newIndex >= 1 && newIndex <= images.length) {
      setSlideIndex(newIndex);
    }
  };

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
          className={`mySlides ${index + 1 === slideIndex ? "active" : ""}`}
          key={index}
        >
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
      <a className="prev" onClick={() => plusSlides(-1)}>
        &#10094;
      </a>
      <a className="next" onClick={() => plusSlides(1)}>
        &#10095;
      </a>
    </div>
  );
}
