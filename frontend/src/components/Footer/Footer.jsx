import React from 'react';
import { FaInstagram, FaPinterest, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
      
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          {/* Replace the image tag with the corresponding React icon */}
          <FaInstagram />
        </div>
        <div className="footer-icons-container">
          <FaPinterest />
        </div>
        <div className="footer-icons-container">
          <FaWhatsapp />
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright @ 2024 -All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
