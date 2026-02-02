import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const dashboardCards = [
    {
      id: 1,
      title: "🤖 AI Chatbot",
      description: "Chat with intelligent AI assistant powered by Google Gemini",
      icon: "💬",
      gradient: "cardGradient1",
      onClick: () => navigate("/chatbot"),
      features: ["Text Chat", "Code Generation", "Creative Writing"],
    },
    {
      id: 2,
      title: "📊 Analytics",
      description: "View your usage statistics and activity reports",
      icon: "📈",
      gradient: "cardGradient2",
      onClick: () => navigate("/analytics"),
      features: ["Usage Stats", "Activity Logs", "Reports"],
    },
    {
      id: 3,
      title: "👤 Profile",
      description: "Manage your account settings and personal information",
      icon: "⚙️",
      gradient: "cardGradient3",
      onClick: () => navigate("/profile"),
      features: ["Edit Profile", "Change Password", "Settings"],
    },
    {
      id: 4,
      title: "📁 Documents",
      description: "Upload and analyze documents with AI",
      icon: "📄",
      gradient: "cardGradient4",
      onClick: () => navigate("/documents"),
      features: ["PDF Analysis", "Text Extraction", "AI Processing"],
    },
    {
      id: 5,
      title: "🎨 Image AI",
      description: "Generate and analyze images with AI",
      icon: "🖼️",
      gradient: "cardGradient5",
      onClick: () => navigate("/images"),
      features: ["Image Generation", "Analysis", "Editing"],
    },
    {
      id: 6,
      title: "🔐 API Keys",
      description: "Manage your API keys and integrations",
      icon: "🔑",
      gradient: "cardGradient6",
      onClick: () => navigate("/api-keys"),
      features: ["Key Management", "Usage Tracking", "Settings"],
    },
  ];

  const recentActivity = [
    { id: 1, action: "Logged in", time: "Just now", icon: "🔐" },
    { id: 2, action: "Updated profile", time: "2 hours ago", icon: "👤" },
    { id: 3, action: "Used AI Chatbot", time: "Yesterday", icon: "🤖" },
    { id: 4, action: "Uploaded document", time: "2 days ago", icon: "📄" },
  ];

  return (
    <div className="dashboardContainer">
      {/* Hero */}
      <header className="heroSection">
        <div className="heroContent">
          <h1 className="heroTitle">Welcome to AI Powered Application</h1>
          <p className="heroSubtitle">
            Hi {user?.name || "User"}! Explore powerful AI tools and features
          </p>
        </div>
      </header>

      <main className="mainContent">
        {/* Cards */}
        <section className="cardsSection">
          <h2 className="sectionTitle">AI Tools & Features</h2>

          <div className="cardsGrid">
            {dashboardCards.map((card) => (
              <div
                key={card.id}
                className={`dashboardCard ${card.gradient}`}
                onClick={card.onClick}
              >
                <div className="cardHeader">
                  <span className="cardIcon">{card.icon}</span>
                  <h3 className="cardTitle">{card.title}</h3>
                </div>

                <p className="cardDescription">{card.description}</p>

                <div className="cardFeatures">
                  {card.features.map((feature, index) => (
                    <span key={index} className="featureTag">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="cardButton">Open →</button>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom */}
        <section className="bottomSection">
          <div className="recentActivity">
            <h3 className="sectionTitle">Recent Activity</h3>
            <div className="activityList">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activityItem">
                  <span className="activityIcon">{activity.icon}</span>
                  <div className="activityContent">
                    <p className="activityAction">{activity.action}</p>
                    <span className="activityTime">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quickActions">
            <h3 className="sectionTitle">Quick Actions</h3>
            <div className="actionsGrid">
              <button className="actionButton" onClick={() => navigate("/chatbot")}>
                <span className="actionIcon">🤖</span> New Chat
              </button>

              <button className="actionButton" onClick={() => navigate("/profile")}>
                <span className="actionIcon">👤</span> Edit Profile
              </button>

              <button className="actionButton" onClick={() => navigate("/settings")}>
                <span className="actionIcon">⚙️</span> Settings
              </button>

              <button className="actionButton" onClick={() => navigate("/help")}>
                <span className="actionIcon">❓</span> Help Center
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 AI Powered Application. All rights reserved.</p>
        <div className="footerLinks">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
