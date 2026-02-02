import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/notFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notFoundContainer">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        Oops! Page is not existed! 😕
      </p>

      {/* <button onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </button> */}
    </div>
  );
};

export default NotFound;
