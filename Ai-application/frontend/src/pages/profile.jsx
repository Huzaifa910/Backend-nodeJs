import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5500";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="container">
      {/* 🔙 Back button */}
      <button className="backBtn" onClick={() => navigate("/dashboard")}>
        ← Back to dashboard
      </button>

      <div className="card">
        <h2 className="title">👤 My Profile</h2>

        <div className="field">
          <label>Name</label>
          <p>{profile.name}</p>
        </div>

        <div className="field">
          <label>Email</label>
          <p>{profile.email}</p>
        </div>

        <div className="field">
          <label>Role</label>
          <p>User</p>
        </div>

        <div className="field">
          <label>Status</label>
          <p>Active</p>
        </div>

        {/* ✏️ Edit button */}
        <button
          className="editBtn"
          onClick={() => navigate("/editProfile")}
        >
          Edit your profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
