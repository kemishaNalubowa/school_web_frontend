import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const TeacherDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h3>JOKS SCHOOL</h3>
          <span>Teacher Portal</span>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/teacher" className="active">📊 Dashboard</Link></li>
          <li><Link to="/teacher/classes">📚 My Classes</Link></li>
          <li><Link to="/teacher/attendance">✔️ Attendance</Link></li>
          <li><Link to="/teacher/grades">📝 Grades</Link></li>
          <li><Link to="/teacher/timetable">🗓️ Timetable</Link></li>
          <li><Link to="/">🚪 Logout</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <div className="user-greeting">Welcome, <strong>Mr. Teacher</strong></div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon bg-red">📚</div>
            <div className="stat-info">
              <h2>4</h2>
              <p>Classes Assigned</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-blue">👨‍🎓</div>
            <div className="stat-info">
              <h2>120</h2>
              <p>Total Students</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h3 className="section-title">Today's Schedule</h3>
          <div style={{color: '#666'}}>
            <p>08:00 AM - Math (Primary 4A)</p>
            <p>10:00 AM - Science (Primary 5B)</p>
            <p>12:00 PM - Lunch Break</p>
            <p>02:00 PM - Math (Primary 6A)</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;