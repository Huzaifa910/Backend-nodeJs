import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login",
        {
          email,
          password,
        },
      );

    //   console.log("Full response:", response);
    //   console.log("Response data:", response.data);
    //   console.log("Token:", response.data.token);
    //   console.log("User:", response.data.user);

      const data = response.data;

      if (data.status) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "login Failed!");
      }
    } catch (err) {
      // ✅ Simple error handling
      if (err.response) {
        // Server responded with error
        setError(err.response.data?.message || "Invalid credentials");
      } else if (err.request) {
        // Request made but no response
        setError("Network error. Check your connection.");
      } else {
        // Other errors
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.heading}>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner}></span> Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className={styles.link}>
            Don't have an account? <Link to="/signup">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
