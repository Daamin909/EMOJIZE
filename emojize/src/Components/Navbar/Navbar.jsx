import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div>
        <h1 className="logo">E M O J I Z E</h1>
      </div>
      <div className="tagline-container">
        <div className="music-bars">
          <div className="bar bar-1"></div>
          <div className="bar bar-2"></div>
          <div className="bar bar-3"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
