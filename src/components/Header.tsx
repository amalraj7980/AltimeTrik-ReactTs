import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import altimetrik from '../assects/Altimetrik.webp';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-img">
        <img src={altimetrik} height={30} />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/results">Search Filter</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;