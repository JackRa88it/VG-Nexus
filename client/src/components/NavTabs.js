import React from "react";
import { Link } from "react-router-dom";

const NavTabs = () => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link
        to="/"
        className={
          window.location.pathname === "/" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/about"
        className={
          window.location.pathname === "/about" ? "nav-link active" : "nav-link"
        }
      >
        About
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/all"
        className={
          window.location.pathname === "/all"
            ? "nav-link active"
            : "nav-link"
        }
      >
        Choose Game
      </Link>
   </li>
   <li className="nav-item">
      <Link
        to="/upload"
        className={
          window.location.pathname === "/upload"
            ? "nav-link active"
            : "nav-link"
        }
      >
        Upload
      </Link>
   </li>
   <li className="nav-item">
      <Link
        to="/login"
        className={
          window.location.pathname === "/login"
            ? "nav-link active"
            : "nav-link"
        }
      >
        Login
      </Link>
   </li>
  </ul>
);

export default NavTabs;
