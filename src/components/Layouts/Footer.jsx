// Footer.jsx
import React from 'react';
import '../../assets/Footer.css';

const Footer = () => {
  return (
    <div className="footer-simple">
      <div className="social-icons">
        <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
        <a href="#"><ion-icon name="logo-snapchat"></ion-icon></a>
        <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
        <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
      </div>
      
      <div className="footer-links">
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">About</a>
        <a href="#">Terms</a>
        <a href="#">Privacy Policy</a>
      </div>
      
      <div className="footer-copyright">
        Company Name © 2025
      </div>
    </div>
  );
};

export default Footer;