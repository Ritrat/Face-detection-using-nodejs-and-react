import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="welcome-text">FACE DETECTION</h1>
      <div className="links-container">
        <Link to="/age-detection" className="navigation-link">
          AGE DETECTION
        </Link>
        <Link to="/expression-detection" className="navigation-link">
          EXPRESSION DETECTION
        </Link>
        <Link to="/gender-detection" className="navigation-link">
          GENDER DETECTION
        </Link>
      </div>
    </div>
  );
}

export default Home;
