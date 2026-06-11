// src/Pages/ParentDashboard/ParentDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dashboardService, requestsService } from "../../Services/api";
import "./ParentDashBoard.css";

export default function ParentDashboard({ userData }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // API State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dashboard Data State
  const [studentInfo, setStudentInfo] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [fees, setFees] = useState(null);
  const [academics, setAcademics] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [requests, setRequests] = useState([]);

  // Student Switcher State
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const parentName = userData?.name || "Parent";

  // Initialize students list from localStorage
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("parent_students") || "[]");
    setStudents(storedStudents);
    if (storedStudents.length > 0) {
      setSelectedStudentId(storedStudents[0].id);
    } else {
      setLoading(false); // No students to fetch data for
    }
  }, []);

  // Fetch data from backend
  const fetchDashboardData = async (studentId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getDashboardData(studentId);
      setStudentInfo(data.student);
      setAttendance(data.attendance);
      setFees(data.fees);
      setAcademics(data.academics);
      setAnnouncements(data.announcements);
      setEvents(data.events);
      setRequests(data.requests);

      // Update local storage students if list changed
      if (data.students && data.students.length > 0) {
        setStudents(data.students);
        localStorage.setItem("parent_students", JSON.stringify(data.students));
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Unable to connect to the backend server.");
      toast.error("Error loading dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedStudentId) {
      fetchDashboardData(selectedStudentId);
    }
  }, [selectedStudentId]);

  // Reply submit handler
  const handleReplyToRequest = async (requestId, messageBody) => {
    try {
      const response = await requestsService.replyToRequest(requestId, messageBody);
      if (response.success) {
        toast.success("Reply sent successfully.");
        // Re-fetch dashboard data to update replies list
        fetchDashboardData(selectedStudentId);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reply. Please try again.");
    }
  };

  // New Request submit handler
  const handleCreateRequest = async (requestData) => {
    try {
      const response = await requestsService.createRequest({
        ...requestData,
        student_id: selectedStudentId
      });
      if (response.success) {
        toast.success("Request submitted successfully.");
        // Re-fetch dashboard data to include new request
        fetchDashboardData(selectedStudentId);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("parent");
    localStorage.removeItem("parent_students");
    navigate("/login");
  };

  const handleBackToSite = () => {
    navigate("/");
  };

  // Section content renderer
  const renderSectionContent = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center py-5 min-vh-50">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading data...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger py-4 my-4 text-center">
          <h4 className="alert-heading">Connection Error</h4>
          <p className="mb-0">{error}</p>
          <button className="btn btn-outline-danger mt-3" onClick={() => fetchDashboardData(selectedStudentId)}>
            Retry Connection
          </button>
        </div>
      );
    }

    if (!studentInfo) {
      return (
        <div className="text-center py-5">
          <p className="text-muted">No child records are currently linked to your parent account.</p>
          <p className="small text-muted">Please contact school administration to link your student profile.</p>
        </div>
      );
    }

    const childDataCombined = {
      student: studentInfo,
      attendance,
      fees,
      academics,
      announcements,
      events,
      requests
    };

    switch (activeSection) {
      case "overview":
        return <OverviewTab data={childDataCombined} />;
      case "academics":
        return <AcademicsTab data={academics} />;
      case "fees":
        return <FeesTab data={fees} />;
      case "attendance":
        return <AttendanceTab data={attendance} />;
      case "report":
        return <ReportCardTab data={childDataCombined} />;
      case "messages":
        return (
          <MessagesTab
            requests={requests}
            onReply={handleReplyToRequest}
            onCreateRequest={handleCreateRequest}
          />
        );
      default:
        return <OverviewTab data={childDataCombined} />;
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "academics", label: "Academics", icon: "📚" },
    { id: "fees", label: "Fees", icon: "💳" },
    { id: "attendance", label: "Attendance", icon: "✅" },
    { id: "report", label: "Report Card", icon: "📄" },
    { id: "messages", label: "Requests", icon: "✉️" },
  ];

  return (
    <div className="pd-dashboard">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="pd-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`pd-sidebar ${sidebarOpen ? "pd-sidebar-open" : ""}`}>
        <div className="pd-sidebar-header">
          <div className="pd-school-logo-small">
            <img src={studentInfo?.photo || "/kemies.jpg"} alt="Student Profile" />
          </div>
          <h3>{studentInfo?.name || "Student Info"}</h3>
          <p className="pd-sidebar-class">
            {studentInfo?.class || "Class"} — {studentInfo?.stream || "Stream"}
          </p>
        </div>

        {/* Student Switcher Dropdown */}
        {students.length > 1 && (
          <div className="pd-student-switcher">
            <label htmlFor="student-select">Select Child:</label>
            <select
              id="student-select"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="form-select form-select-sm"
            >
              {students.map((stud) => (
                <option key={stud.id} value={stud.id}>
                  {stud.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <nav className="pd-sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`pd-sidebar-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className="pd-sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span className="pd-sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pd-sidebar-footer">
          <button className="pd-btn pd-btn-logout" onClick={handleLogout}>
            <span className="pd-sidebar-icon" aria-hidden="true">🚪</span>
            <span className="pd-sidebar-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="pd-main-wrapper">
        <header className="pd-header">
          <div className="pd-header-left">
            <button
              className="pd-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>
            <div className="pd-header-school">
              <img src="/joks.png" alt="School Logo" className="pd-header-logo" />
              <span className="pd-header-school-name">JJokolera Junior School</span>
            </div>
          </div>

          <div className="pd-header-right">
            <span className="pd-header-greeting">Welcome, {parentName} </span>
            <button
              className="pd-btn pd-btn-back"
              onClick={handleBackToSite}
              title="Back to School Website"
            >
              Back to Site
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pd-content">
          {renderSectionContent()}
        </main>

        <footer className="pd-footer">
          <p>&copy; 2026 JJokolera Junior School. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB COMPONENTS
// ─────────────────────────────────────────────────────────────

function OverviewTab({ data }) {
  const unreadCount = data.requests.filter(
    (req) => req.status === "pending" || (req.replies.length > 0 && req.replies[req.replies.length - 1].isStaff)
  ).length;

  return (
    <div className="pd-tab-content">
      <div className="pd-stats-grid">
        <PdStatCard title="Attendance" value={`${data.attendance?.present}%`} subtitle={data.attendance?.term} color="green" />
        <PdStatCard title="Fees Balance" value={`UGX ${data.fees?.balance.toLocaleString()}`} subtitle={`Due: ${data.fees?.dueDate}`} color="red" />
        <PdStatCard title="Class Rank" value={`#${data.academics?.classRank}/${data.academics?.totalStudents}`} subtitle="This term" color="blue" />
        <PdStatCard title="Active Requests" value={unreadCount} subtitle="Requires review" color="purple" />
      </div>

      <section className="pd-section">
        <h3 className="pd-section-title">Recent Announcements</h3>
        <div className="pd-announcements-list">
          {data.announcements.length > 0 ? (
            data.announcements.map((a) => (
              <div key={a.id} className={`pd-announcement-card priority-${a.priority}`}>
                <div className="pd-announcement-header">
                  <strong>{a.title}</strong>
                  <span className="pd-announcement-date">{a.date}</span>
                </div>
                <p className="pd-announcement-message">{a.message}</p>
                {a.priority === "high" && <span className="pd-priority-badge">High Priority</span>}
              </div>
            ))
          ) : (
            <p className="text-muted py-3 text-center">No announcements have been published recently.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function AcademicsTab({ data }) {
  if (!data || !data.subjects || data.subjects.length === 0) {
    return (
      <div className="pd-tab-content text-center py-5">
        <p className="text-muted">No academic records available for the active term.</p>
      </div>
    );
  }

  return (
    <div className="pd-tab-content">
      <div className="pd-academics-header">
        <h3>Academic Performance — {data.term}</h3>
        <p className="pd-teacher-comment">
          <strong>Teacher's Comment:</strong> {data.teacherComment}
        </p>
        <p className="pd-class-rank">Class Rank: <strong>#{data.classRank} of {data.totalStudents}</strong></p>
      </div>

      <div className="pd-subjects-table-container">
        <table className="pd-subjects-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Mid-Term</th>
              <th>Final Exam</th>
              <th>Continuous Assessment</th>
              <th>Average</th>
              <th>Grade</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {data.subjects.map((subject, index) => {
              const avg = Math.round(
                (subject.midTerm.score + subject.final.score +
                  subject.continuous.reduce((a, b) => a + b, 0) / subject.continuous.length) / 3
              );
              return (
                <tr key={index}>
                  <td className="pd-subject-name">{subject.name}</td>
                  <td>
                    <span className="pd-score">{subject.midTerm.score}%</span>
                    <span className={`pd-grade-badge grade-${subject.midTerm.grade[0].toLowerCase()}`}>{subject.midTerm.grade}</span>
                  </td>
                  <td>
                    <span className="pd-score">{subject.final.score}%</span>
                    <span className={`pd-grade-badge grade-${subject.final.grade[0].toLowerCase()}`}>{subject.final.grade}</span>
                  </td>
                  <td>
                    <div className="pd-continuous-scores">
                      {subject.continuous.map((score, i) => (
                        <span key={i} className="pd-ca-score">{Math.round(score)}</span>
                      ))}
                    </div>
                  </td>
                  <td className="pd-average">{avg}%</td>
                  <td>
                    <span className={`pd-grade-badge grade-${subject.final.grade[0].toLowerCase()}`}>
                      {subject.final.grade}
                    </span>
                  </td>
                  <td>
                    <span className={`pd-trend ${subject.trend === "up" ? "trend-up" : subject.trend === "down" ? "trend-down" : "trend-stable"}`}>
                      {subject.trend === "up" ? "↑" : subject.trend === "down" ? "↓" : "→"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FeesTab({ data }) {
  if (!data) return null;
  const paidPercent = data.total > 0 ? Math.round((data.paid / data.total) * 100) : 0;

  return (
    <div className="pd-tab-content">
      <div className="pd-fees-summary">
        <div className="pd-fee-card">
          <span className="pd-fee-label">Total Fees</span>
          <span className="pd-fee-value">{data.currency} {data.total.toLocaleString()}</span>
        </div>
        <div className="pd-fee-card pd-fee-paid">
          <span className="pd-fee-label">Amount Paid</span>
          <span className="pd-fee-value">{data.currency} {data.paid.toLocaleString()}</span>
        </div>
        <div className="pd-fee-card pd-fee-balance">
          <span className="pd-fee-label">Outstanding Balance</span>
          <span className="pd-fee-value">{data.currency} {data.balance.toLocaleString()}</span>
          <span className="pd-fee-due">Due: {data.dueDate}</span>
        </div>
      </div>

      <div className="pd-fees-progress">
        <div className="pd-progress-label">
          <span>Paid: {paidPercent}%</span>
          <span>Remaining: {100 - paidPercent}%</span>
        </div>
        <div className="pd-progress-bar">
          <div className="pd-progress-fill paid" style={{ width: `${paidPercent}%` }} />
          <div className="pd-progress-fill balance" style={{ width: `${100 - paidPercent}%` }} />
        </div>
      </div>

      <div className="pd-payment-history">
        <h4 className="pd-section-subtitle">Payment History</h4>
        <div className="pd-table-container">
          {data.paymentHistory.length > 0 ? (
            <table className="pd-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Reference</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.paymentHistory.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.date}</td>
                    <td>{data.currency} {payment.amount.toLocaleString()}</td>
                    <td>{payment.method}</td>
                    <td>{payment.reference}</td>
                    <td><span className="pd-status-badge status-success">Confirmed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted py-3 text-center">No payment transactions found for this term.</p>
          )}
        </div>
      </div>

      <div className="pd-fees-actions">
        <button className="pd-btn pd-btn-primary" onClick={() => alert("Please make payment through school PayWay or mobile money using your student's unique bill reference.")}>Pay Fees Now</button>
        <button className="pd-btn pd-btn-outline" onClick={() => window.print()}>Print Invoice</button>
      </div>
    </div>
  );
}

function AttendanceTab({ data }) {
  if (!data) return null;
  const presentPercent = data.totalDays > 0 ? Math.round((data.daysPresent / data.totalDays) * 100) : 100;

  return (
    <div className="pd-tab-content">
      <div className="pd-attendance-summary">
        <h3>Attendance Summary — {data.term}</h3>

        <div className="pd-attendance-chart">
          <div className="pd-chart-circle">
            <svg viewBox="0 0 36 36" className="pd-circular-chart">
              <path className="pd-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="pd-circle" strokeDasharray={`${presentPercent}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="20.35" className="pd-percentage">{presentPercent}%</text>
            </svg>
          </div>
          <div className="pd-chart-legend">
            <div className="pd-legend-item">
              <span className="pd-legend-color present"></span>
              <span>Present: {data.daysPresent} days</span>
            </div>
            <div className="pd-legend-item">
              <span className="pd-legend-color absent"></span>
              <span>Absent: {data.absent} days</span>
            </div>
            <div className="pd-legend-item">
              <span className="pd-legend-color late"></span>
              <span>Late: {data.late} days</span>
            </div>
          </div>
        </div>

        <div className="pd-attendance-notes">
          <h4>Attendance Policy</h4>
          <ul>
            <li>Minimum attendance requirement: 75%</li>
            <li>Medical absences require a doctor's note</li>
            <li>Contact class teacher for attendance concerns</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ReportCardTab({ data }) {
  if (!data || !data.academics) return null;
  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="pd-tab-content">
      <div className="pd-report-header">
        <div className="pd-report-title">
          <h3>Official Report Card</h3>
          <p>{data.student.name} • {data.student.class} • {data.academics.term}</p>
        </div>
        <button className="pd-btn pd-btn-primary pd-btn-download" onClick={handleDownloadReport}>
          Print Report Card (PDF)
        </button>
      </div>

      <div className="pd-report-card-preview">
        <div className="pd-report-school-header">
          <img src="/joks.png" alt="School Logo" className="pd-report-logo" />
          <div>
            <h4>JJOKOLERA JUNIOR SCHOOL</h4>
            <p>Kawanda, Uganda • excellence@joksschool.com</p>
          </div>
        </div>

        <div className="pd-report-student-info">
          <div><strong>Student:</strong> {data.student.name}</div>
          <div><strong>Admission No:</strong> {data.student.admissionNo}</div>
          <div><strong>Class:</strong> {data.student.class} — {data.student.stream}</div>
          <div><strong>Term:</strong> {data.academics.term}</div>
        </div>

        <table className="pd-report-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Mid-Term</th>
              <th>Final</th>
              <th>Average</th>
              <th>Grade</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data.academics.subjects.map((subject, i) => {
              const avg = Math.round((subject.midTerm.score + subject.final.score) / 2);
              return (
                <tr key={i}>
                  <td>{subject.name}</td>
                  <td>{subject.midTerm.score}%</td>
                  <td>{subject.final.score}%</td>
                  <td>{avg}%</td>
                  <td>{subject.final.grade}</td>
                  <td>{subject.final.remarks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pd-report-footer">
          <div className="pd-report-comment">
            <strong>Class Teacher's Comment:</strong>
            <p>{data.academics.teacherComment}</p>
          </div>
          <div className="pd-report-signatures">
            <div>
              <div className="pd-signature-line"></div>
              <p>Class Teacher</p>
            </div>
            <div>
              <div className="pd-signature-line"></div>
              <p>Head Teacher</p>
            </div>
            <div>
              <div className="pd-signature-line"></div>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="pd-report-note">
        <strong>Note:</strong> Press the Print button above to save the official PDF or print the document.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PREMIUM COMMUNICATION / MESSAGES TAB (Dynamic Request Threading)
// ─────────────────────────────────────────────────────────────

function MessagesTab({ requests, onReply, onCreateRequest }) {
  const [activeRequest, setActiveRequest] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  // New Request Form State
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [reqType, setReqType] = useState("general");
  const [isUrgent, setIsUrgent] = useState(false);

  // Auto-refresh selected request detail when requests array changes
  useEffect(() => {
    if (activeRequest) {
      const updated = requests.find((r) => r.id === activeRequest.id);
      if (updated) {
        setActiveRequest(updated);
      }
    }
  }, [requests]);

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    onReply(activeRequest.id, replyMessage);
    setReplyMessage("");
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    onCreateRequest({
      request_type: reqType,
      subject,
      message,
      is_urgent: isUrgent,
    });
    setSubject("");
    setMessage("");
    setReqType("general");
    setIsUrgent(false);
    setShowForm(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending": return "status-pending";
      case "reviewed": return "status-reviewed";
      case "resolved": return "status-resolved";
      case "closed": return "status-closed";
      default: return "status-pending";
    }
  };

  const getRequestTypeName = (type) => {
    const types = {
      leave: "Leave Request",
      transfer: "Transfer",
      meeting: "Meeting",
      complaint: "Complaint",
      fee_query: "Fees Enquiry",
      performance: "Academic Enquiry",
      health: "Medical Concern",
      general: "General Inquiry",
      other: "Other"
    };
    return types[type] || type;
  };

  return (
    <div className="pd-tab-content pd-communication-container">
      {showForm ? (
        // Submit New Request Form
        <div className="pd-request-form-card">
          <div className="pd-card-header-flex">
            <h3>Submit Inquiry / Request</h3>
            <button className="pd-btn pd-btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
          <form onSubmit={handleCreateRequest} className="pd-form">
            <div className="pd-form-group">
              <label>Request Type</label>
              <select value={reqType} onChange={(e) => setReqType(e.target.value)} className="form-select">
                <option value="general">General Inquiry</option>
                <option value="leave">Leave / Absence Request</option>
                <option value="meeting">Meeting Request</option>
                <option value="fee_query">Fees Enquiry</option>
                <option value="performance">Academic Performance Enquiry</option>
                <option value="health">Health / Medical Concern</option>
                <option value="transfer">Transfer Request</option>
                <option value="complaint">Complaint</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="pd-form-group">
              <label>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your inquiry"
                className="form-control"
                required
              />
            </div>
            <div className="pd-form-group">
              <label>Message Content</label>
              <textarea
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry in detail..."
                className="form-control"
                required
              />
            </div>
            <div className="pd-form-group pd-checkbox-group">
              <input
                type="checkbox"
                id="urgent-check"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
              />
              <label htmlFor="urgent-check">Mark this request as URGENT</label>
            </div>
            <button type="submit" className="pd-btn pd-btn-primary w-100 mt-3">Submit Inquiry</button>
          </form>
        </div>
      ) : activeRequest ? (
        // Request Detail Thread View
        <div className="pd-request-thread-card">
          <div className="pd-thread-header">
            <button className="pd-btn pd-btn-secondary pd-btn-sm" onClick={() => setActiveRequest(null)}>&larr; Back to Inbox</button>
            <div className="pd-thread-meta mt-3">
              <span className={`pd-status-badge ${getStatusClass(activeRequest.status)}`}>
                {activeRequest.status.toUpperCase()}
              </span>
              {activeRequest.isUrgent && <span className="pd-urgent-badge">URGENT</span>}
              <span className="pd-thread-ref">{activeRequest.reference}</span>
            </div>
            <h3 className="mt-2">{activeRequest.subject}</h3>
            <p className="text-muted small">Type: {getRequestTypeName(activeRequest.type)} | Created: {activeRequest.date}</p>
          </div>

          <div className="pd-thread-messages">
            {/* Original Request Message */}
            <div className="pd-chat-bubble parent-message">
              <div className="pd-chat-sender">You (Original Request)</div>
              <p className="pd-chat-body">{activeRequest.message}</p>
              <div className="pd-chat-time">{activeRequest.date}</div>
            </div>

            {/* Replies List */}
            {activeRequest.replies.map((reply) => (
              <div key={reply.id} className={`pd-chat-bubble ${reply.isStaff ? "staff-message" : "parent-message"}`}>
                <div className="pd-chat-sender">
                  {reply.isStaff ? `🏫 School Staff: ${reply.from}` : "You"}
                </div>
                <p className="pd-chat-body">{reply.message}</p>
                <div className="pd-chat-time">{reply.date}</div>
              </div>
            ))}
          </div>

          {activeRequest.status !== "closed" && (
            <form onSubmit={handleSendReply} className="pd-thread-reply-form">
              <textarea
                rows="3"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Write your response to the school..."
                className="form-control"
                required
              />
              <button type="submit" className="pd-btn pd-btn-primary mt-2">Send Message</button>
            </form>
          )}
        </div>
      ) : (
        // Inbox List View
        <div className="pd-requests-inbox">
          <div className="pd-messages-header">
            <h3>School Inquiry Inbox</h3>
            <button className="pd-btn pd-btn-primary" onClick={() => setShowForm(true)}>Compose Message</button>
          </div>

          <div className="pd-requests-list mt-3">
            {requests.length > 0 ? (
              requests.map((req) => (
                <div key={req.id} className="pd-request-inbox-card" onClick={() => setActiveRequest(req)}>
                  <div className="pd-inbox-header">
                    <span className="pd-inbox-type">{getRequestTypeName(req.type)}</span>
                    <span className="pd-inbox-date">{req.date}</span>
                  </div>
                  <h4 className="pd-inbox-subject">{req.subject}</h4>
                  <p className="pd-inbox-snippet">{req.message.slice(0, 100)}{req.message.length > 100 ? "..." : ""}</p>
                  <div className="pd-inbox-footer">
                    <span className={`pd-status-badge ${getStatusClass(req.status)}`}>
                      {req.status.toUpperCase()}
                    </span>
                    {req.isUrgent && <span className="pd-urgent-badge">URGENT</span>}
                    <span className="pd-inbox-replies-count">
                      💬 {req.replies.length} message(s)
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5 card-like-empty">
                <span className="pd-empty-inbox-icon">✉️</span>
                <p className="text-muted mt-3">No inquiries or messages have been submitted yet.</p>
                <p className="small text-muted">Click the "Compose Message" button to send your first enquiry to the administration.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PdStatCard({ title, value, subtitle, color }) {
  return (
    <div className={`pd-stat-card color-${color}`}>
      <div className="pd-stat-content">
        <h4>{title}</h4>
        <p className="pd-stat-value">{value}</p>
        <p className="pd-stat-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}