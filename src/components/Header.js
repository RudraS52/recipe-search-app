
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="header-icon" aria-hidden="true">
          🍽️
        </span>
        <h1>Recipe Search</h1>
      </div>

      <p className="header-tagline">
        Discover delicious recipes and find inspiration
        for your next meal.
      </p>
    </header>
  );
};

export default Header;
