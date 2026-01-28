import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
    const navigate = useNavigate();
    
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Dashboard cards data
    const dashboardCards = [
        {
            id: 1,
            title: "🤖 AI Chatbot",
            description: "Chat with intelligent AI assistant powered by Google Gemini",
            icon: "💬",
            gradient: "cardGradient1",
            onClick: () => navigate('/chatbot'),
            features: ["Text Chat", "Code Generation", "Creative Writing"]
        },
        {
            id: 2,
            title: "📊 Analytics",
            description: "View your usage statistics and activity reports",
            icon: "📈",
            gradient: "cardGradient2",
            onClick: () => navigate('/analytics'),
            features: ["Usage Stats", "Activity Logs", "Reports"]
        },
        {
            id: 3,
            title: "👤 Profile",
            description: "Manage your account settings and personal information",
            icon: "⚙️",
            gradient: "cardGradient3",
            onClick: () => navigate('/profile'),
            features: ["Edit Profile", "Change Password", "Settings"]
        },
        {
            id: 4,
            title: "📁 Documents",
            description: "Upload and analyze documents with AI",
            icon: "📄",
            gradient: "cardGradient4",
            onClick: () => navigate('/documents'),
            features: ["PDF Analysis", "Text Extraction", "AI Processing"]
        },
        {
            id: 5,
            title: "🎨 Image AI",
            description: "Generate and analyze images with AI",
            icon: "🖼️",
            gradient: "cardGradient5",
            onClick: () => navigate('/images'),
            features: ["Image Generation", "Analysis", "Editing"]
        },
        {
            id: 6,
            title: "🔐 API Keys",
            description: "Manage your API keys and integrations",
            icon: "🔑",
            gradient: "cardGradient6",
            onClick: () => navigate('/api-keys'),
            features: ["Key Management", "Usage Tracking", "Settings"]
        }
    ];

    // Recent activity data
    const recentActivity = [
        { id: 1, action: "Logged in", time: "Just now", icon: "🔐" },
        { id: 2, action: "Updated profile", time: "2 hours ago", icon: "👤" },
        { id: 3, action: "Used AI Chatbot", time: "Yesterday", icon: "🤖" },
        { id: 4, action: "Uploaded document", time: "2 days ago", icon: "📄" }
    ];

    return (
        <div className={styles.dashboardContainer}>
            {/* Hero Section */}
            <header className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Welcome to AI Powered Application
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Hi {user?.name || "User"}! Explore powerful AI tools and features
                    </p>
                    <div className={styles.userInfo}>
                        <span className={styles.userEmail}>{user?.email || "user@example.com"}</span>
                        <button 
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Stats Cards */}
                <section className={styles.statsSection}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>📊</div>
                        <div className={styles.statContent}>
                            <h3>24</h3>
                            <p>AI Chats Today</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>⏱️</div>
                        <div className={styles.statContent}>
                            <h3>156</h3>
                            <p>Total Usage Hours</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>✅</div>
                        <div className={styles.statContent}>
                            <h3>98%</h3>
                            <p>Accuracy Rate</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>⚡</div>
                        <div className={styles.statContent}>
                            <h3>Fast</h3>
                            <p>Response Time</p>
                        </div>
                    </div>
                </section>

                {/* Dashboard Cards Grid */}
                <section className={styles.cardsSection}>
                    <h2 className={styles.sectionTitle}>AI Tools & Features</h2>
                    <div className={styles.cardsGrid}>
                        {dashboardCards.map((card) => (
                            <div 
                                key={card.id} 
                                className={`${styles.dashboardCard} ${styles[card.gradient]}`}
                                onClick={card.onClick}
                            >
                                <div className={styles.cardHeader}>
                                    <span className={styles.cardIcon}>{card.icon}</span>
                                    <h3 className={styles.cardTitle}>{card.title}</h3>
                                </div>
                                <p className={styles.cardDescription}>{card.description}</p>
                                <div className={styles.cardFeatures}>
                                    {card.features?.map((feature, index) => (
                                        <span key={index} className={styles.featureTag}>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                                <button className={styles.cardButton}>
                                    Open →
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recent Activity & Quick Actions */}
                <section className={styles.bottomSection}>
                    {/* Recent Activity */}
                    <div className={styles.recentActivity}>
                        <h3 className={styles.sectionTitle}>Recent Activity</h3>
                        <div className={styles.activityList}>
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className={styles.activityItem}>
                                    <span className={styles.activityIcon}>{activity.icon}</span>
                                    <div className={styles.activityContent}>
                                        <p className={styles.activityAction}>{activity.action}</p>
                                        <span className={styles.activityTime}>{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className={styles.quickActions}>
                        <h3 className={styles.sectionTitle}>Quick Actions</h3>
                        <div className={styles.actionsGrid}>
                            <button 
                                className={styles.actionButton}
                                onClick={() => navigate('/chatbot')}
                            >
                                <span className={styles.actionIcon}>🤖</span>
                                New Chat
                            </button>
                            <button 
                                className={styles.actionButton}
                                onClick={() => navigate('/profile')}
                            >
                                <span className={styles.actionIcon}>👤</span>
                                Edit Profile
                            </button>
                            <button 
                                className={styles.actionButton}
                                onClick={() => navigate('/settings')}
                            >
                                <span className={styles.actionIcon}>⚙️</span>
                                Settings
                            </button>
                            <button 
                                className={styles.actionButton}
                                onClick={() => navigate('/help')}
                            >
                                <span className={styles.actionIcon}>❓</span>
                                Help Center
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>© 2024 AI Powered Application. All rights reserved.</p>
                <div className={styles.footerLinks}>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/contact">Contact Us</a>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;