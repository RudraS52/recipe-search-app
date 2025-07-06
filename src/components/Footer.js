import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Recipe Search App. Made with ❤️ by Rudra Singh.</p>
    </footer>
  );
};

export default Footer;
