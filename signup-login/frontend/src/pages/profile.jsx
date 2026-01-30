import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  "../styles/profile.css";

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
    return <div className={styles.loading}>Loading profile...</div>;
  }

  return (
    <div className={styles.container}>
      {/* 🔙 Back button */}
      <button
        className={styles.backBtn}
        onClick={() => navigate("/dashboard")}
      >
        ← Back
      </button>

      <div className={styles.card}>
        <h2 className={styles.title}>👤 My Profile</h2>

        <div className={styles.field}>
          <label>Name</label>
          <p>{profile.name}</p>
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <p>{profile.email}</p>
        </div>

        <div className={styles.field}>
          <label>Role</label>
          <p>User</p>
        </div>

         <div className={styles.field}>
          <label>Status</label>
          <p>Active</p>
        </div>

        {/* ✏️ Edit button */}
        <button
          className={styles.editBtn}
          onClick={() => navigate("/editProfile")}
        >
          Edit your profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
