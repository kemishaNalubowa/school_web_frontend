import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const ParentDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h3>JOKS SCHOOL</h3>
          <span>Parent Portal</span>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/parent" className="active">🏠 Dashboard</Link></li>
          <li><Link to="/parent/my-child">👶 My Children</Link></li>
          <li><Link to="/parent/results">📊 Results</Link></li>
          <li><Link to="/parent/fees">💳 Fee Statement</Link></li>
          <li><Link to="/parent/messages">✉️ Messages</Link></li>
          <li><Link to="/">🚪 Logout</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Parent Dashboard</h1>
          <div className="user-greeting">Welcome, <strong>Mr. Parent</strong></div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon bg-red">👶</div>
            <div className="stat-info">
              <h2>2</h2>
              <p>Children Enrolled</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-orange">💰</div>
            <div className="stat-info">
              <h2>$500</h2>
              <p>Balance Due</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h3 className="section-title">Latest Results</h3>
          <div style={{color: '#666'}}>
            <p><strong>John Doe (P4)</strong>: Math A, Science B+</p>
            <p><strong>Jane Doe (P2)</strong>: English A, Art A+</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;