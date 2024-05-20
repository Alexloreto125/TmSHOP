import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "../assets/AnimatedCss.css";
import { FaHome, FaUser, FaCog, FaTimes } from "react-icons/fa";

const DeveloperMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        {isOpen ? <FaCog /> : <FaTimes />}
      </button>
      <ul className="menu-items">
        <li>
          <FaHome />
        </li>
        <li>
          <FaUser />
        </li>
        <li>
          <FaCog />
        </li>
      </ul>
    </div>
  );
};

export default DeveloperMenu;
