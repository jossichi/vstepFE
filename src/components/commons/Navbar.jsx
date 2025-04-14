import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import {
  FaUser,
  FaChalkboardTeacher,
  FaCreditCard,
  FaTrophy,
} from "react-icons/fa";
import "../../assets/styles/Navbar.css";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleNavbar = () => {
    setIsMobile(!isMobile);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid justify-content-between">
        <div className="navbar-left">
          <Link className="navbar-brand" to="/">
            MY APP
          </Link>
        </div>

        <div
          className={`navbar-toggle ${isMobile ? "open" : ""}`}
          onClick={toggleNavbar}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-links ${isMobile ? "mobile" : ""}`}>
          <Link className="nav-link" to="/tests">
            Test List
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/test-form">
            Test Form
          </Link>
          <Link className="nav-link" to="/exam">
            ExamPage
          </Link>
          <Link className="nav-link" to="/create-card">
            Create QR code
          </Link>

          <div className={`nav-item dropdown ${isDropdownOpen ? "open" : ""}`}>
            <div
              className="dropdown-toggle"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}>
              <FaUser className="icon" /> Tài Khoản
            </div>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/profile">
                <FaUser className="icon" /> Thông tin cá nhân
              </Link>
              <Link className="dropdown-item" to="/level">
                <FaChalkboardTeacher className="icon" /> Trình độ
              </Link>
              <Link className="dropdown-item" to="/mentors">
                <FaChalkboardTeacher className="icon" /> Các mentor đã matching
              </Link>
              <Link className="dropdown-item" to="/payment">
                <FaCreditCard className="icon" /> Thanh toán
              </Link>
              <Link className="dropdown-item" to="/become-mentor">
                <FaChalkboardTeacher className="icon" /> Trở thành mentor
              </Link>
              <Link className="dropdown-item" to="/rewards">
                <FaTrophy className="icon" /> Phần thưởng
              </Link>
              <Link className="dropdown-item" to="/status">
                <FaTrophy className="icon" /> Danh vọng
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
