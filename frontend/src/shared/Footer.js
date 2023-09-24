import React, { useEffect, useState } from 'react';
import './Footer.css';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay showing the footer for 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // 30 seconds in milliseconds

    return () => {
      // Clear the timer if the component unmounts
      clearTimeout(timer);
    };
  }, []);

  return isVisible ? (
    <div className="footerdiv">
      <footer className="footer">
        <div className="footer-content">
        <h2 className="footer-title">GALAXY CINEMA</h2>
          <div className="footer-buttons">
            <button className="footer-button">About Us</button>
            <button className="footer-button">Contact Us</button>
          </div>
        </div>
      </footer>
    </div>
  ) : null;
}

export default Footer;
