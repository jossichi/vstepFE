import React, { useState, useEffect } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") && !!localStorage.getItem("user_id")
  );

  // Debug trạng thái đăng nhập
  console.log("NavBar render - token:", localStorage.getItem("token"));
  console.log("NavBar render - user_id:", localStorage.getItem("user_id"));
  console.log("NavBar render - isLoggedIn:", isLoggedIn);

  // Theo dõi thay đổi localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");
      const loggedIn = !!token && !!userId;
      setIsLoggedIn(loggedIn);
      console.log("useEffect - isLoggedIn updated:", loggedIn);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      clearInterval(interval);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <Link className="navbar-brand" to="/">
            <span className="brand-highlight">WEB3 AI</span> TRUNG TÂM VSTEP
          </Link>

          <div className="hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login">Đăng nhập</Link>
                </li>
                <li>
                  <Link to="/create-card">Tạo QR Code</Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li className="dropdown">
                <button
                  className="dropdown-toggle"
                  onClick={toggleDropdown}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <FaUser className="icon" /> Tài khoản
                </button>

                <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                  <li>
                    <Link to="/profile">
                      <FaUser /> Thông tin cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link to="/level">
                      <FaChalkboardTeacher /> Trình độ
                    </Link>
                  </li>
                  <li>
                    <Link to="/mentors">
                      <FaChalkboardTeacher /> Mentors
                    </Link>
                  </li>
                  <li>
                    <Link to="/payment">
                      <FaCreditCard /> Thanh toán
                    </Link>
                  </li>
                  <li>
                    <Link to="/become-mentor">
                      <FaChalkboardTeacher /> Trở thành mentor
                    </Link>
                  </li>
                  <li>
                    <Link to="/rewards">
                      <FaTrophy /> Phần thưởng
                    </Link>
                  </li>
                  <li>
                    <Link to="/status">
                      <FaTrophy /> Danh vọng
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkbox-component">
                      <FaCreditCard /> Tài liệu học
                    </Link>
                  </li>
                  <li>
                    <Link to="/vocabulary-form">
                      <FaCreditCard /> Từ vựng
                    </Link>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;