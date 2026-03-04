import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h3>JOKS SCHOOL</h3>
          <span>Admin Panel</span>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/admin" className="active">📊 Dashboard</Link></li>
          <li><Link to="/admin/students">👨‍🎓 Students</Link></li>
          <li><Link to="/admin/teachers">👩‍🏫 Teachers</Link></li>
          <li><Link to="/admin/parents">👨‍👩‍👧 Parents</Link></li>
          <li><Link to="/admin/fees">💰 Fees</Link></li>
          <li><Link to="/admin/settings">⚙️ Settings</Link></li>
          <li><Link to="/">🚪 Logout</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Dashboard Overview</h1>
          <div className="user-greeting">Welcome, <strong>Admin</strong></div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon bg-red">👨‍🎓</div>
            <div className="stat-info">
              <h2>1,250</h2>
              <p>Total Students</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-blue">👩‍🏫</div>
            <div className="stat-info">
              <h2>85</h2>
              <p>Total Teachers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-green">💰</div>
            <div className="stat-info">
              <h2>$52,000</h2>
              <p>Fees Collected</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-orange">📅</div>
            <div className="stat-info">
              <h2>12</h2>
              <p>Active Events</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="dashboard-section">
          <h3 className="section-title">Recent Activities</h3>
          <div style={{color: '#666'}}>
            <p>✅ New student <strong>John Doe</strong> registered.</p>
            <p>💸 Fees paid by <strong>Mrs. Smith</strong> for Term 1.</p>
            <p>📝 New announcement posted.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;