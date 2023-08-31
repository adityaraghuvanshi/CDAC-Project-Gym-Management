import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section about-us">
        <h3>About Us</h3>
        <p>We are a fitness and wellness company dedicated to helping you achieve your health goals.</p>
      </div>
      <div className="footer-section important-links">
        <h3>Important Links</h3>
        <ul>
          <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
          <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
          <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
        </ul>
      </div>
      <div className="footer-section group-info">
        <h3>Group Information</h3>
        
        <p>Contact: info@example.com</p>
      </div>
    </footer>
  );
};

export default Footer;
