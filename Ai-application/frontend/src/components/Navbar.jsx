import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import axios from "axios";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
      name: "",
      email: "",
    });
 const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5500";

  // Get user data from localStorage
  useEffect(() => {
     fetchInfo()
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (error) {
      console.error("Profile fetch error:", error);
      alert("Failed to load profile");
    }
    finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    // Redirect to login page
    navigate("/");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side: Logo/Brand */}
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Dashboard</span>
          </Link>
        </div>

        {/* Center: Navigation Links (Optional) */}
        {/* <div className="navbar-center">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/analytics" className="nav-link">Analytics</Link>
          <Link to="/reports" className="nav-link">Reports</Link>
        </div> */}

        {/* Right Side: User Info & Settings */}
        <div className="navbar-right" ref={dropdownRef}>
          {/* User Info */}
          <div className="user-info">
            <div className="user-details">
              <span className="user-name">{profile.name || "User"}</span>
              <span className="user-email">
                {profile.email || "user@gmail.com"}
              </span>
            </div>

            {/* User Avatar */}
            <div className="user-avatar">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={profile.name || "User"}
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  {profile.name?.charAt(0) || "G"}
                </div>
              )}
            </div>

            {/* Settings Dropdown Trigger */}
            <button
              className={`settings-button ${isDropdownOpen ? "active" : ""}`}
              onClick={toggleDropdown}
              aria-label="Settings"
              aria-expanded={isDropdownOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <h4>Account Settings</h4>
                </div>

                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>User Profile</span>
                </Link>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item logout" onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
