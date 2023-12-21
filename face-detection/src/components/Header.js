import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">🏠</Link>
          </li>
          <li>
            <Link to="/age-detection" className="age">
              👤
            </Link>
          </li>
          <li>
            <Link to="/expression-detection" className="expression">
              😊
            </Link>
          </li>
          <li>
            <Link to="/gender-detection" className="gender">
              ⚧️ 
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;