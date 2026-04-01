import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="custom-footer">
      <p>
        © {new Date().getFullYear()} Spicer Memorial College | Designed & Developed by <strong>KALANGIAM</strong>
      </p>
    </footer>
  );
}

export default Footer;