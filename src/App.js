// src/App.js
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { tokenService } from './Services/api';

// Components
import Navbar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer/Footer";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import SessionTimeout from "./Components/SessionTimeout/SessionTimeout";

// Pages
import Home from "./Pages/Homepage/Home";
import AboutUs from "./Pages/AboutUspage/AboutUs";
import Admissions from "./Pages/Admissionpage/Admissions";
import Events from "./Pages/Events/Events";
import Gallery from "./Pages/Gallery/Gallery";
import Contact from "./Pages/Contact/Contact";

// Admission Sub-pages
import AdmissionInfo from "./Pages/Admissionpage/AdmissionInfo";
import FeesStructure from "./Pages/Admissionpage/FeesStructure";

// Auth Pages
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUppage/SignUppage";

// ✅ Parent Dashboard
import ParentDashboard from "./Pages/DashBoard/ParentDashBoard";

// ✅ SCROLL-TO-TOP COMPONENT
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  
  return null;
}

// ✅ COMPONENT TO CONDITIONALLY SHOW/HIDE NAVBAR & FOOTER
function LayoutWrapper({ children, isAuthenticated, currentUser, onLogout }) {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/parent";

  return (
    <>
      {/* ✅ Show Navbar only if NOT on /parent route */}
      {!hideNavAndFooter && (
        <Navbar 
          isAuthenticated={isAuthenticated} 
          currentUser={currentUser} 
          onLogout={onLogout} 
        />
      )}

      {/* MAIN CONTENT */}
      {children}

      {/* ✅ Show Footer only if NOT on /parent route */}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  // 🔐 Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check auth on load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // ✅ LOGIN HANDLER
  const handleLogin = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentUser(userData);
    setIsAuthenticated(true);

    toast.success(`Welcome back, ${userData?.name || "User"} 🎉`);
  };

  // ✅ LOGOUT HANDLER
  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('parent');
    localStorage.removeItem('parent_students');
    
    // Clear DRF token (hidden from user)
    tokenService.clearToken();
    
    setCurrentUser(null);
    setIsAuthenticated(false);

    toast.info("Logged out successfully 👋");
  };

  //  Loading screen
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {/* FIX: Scroll to top on every page change */}
      <ScrollToTop />

      {/* ✅ SESSION TIMEOUT — warns after 13 min inactivity, auto-logout after 2 min */}
      <SessionTimeout isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/*  TOASTS */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      {/* ✅ WRAPPER THAT HANDLES NAVBAR/FOOTER VISIBILITY */}
      <LayoutWrapper 
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onLogout={handleLogout}
      >
        <div className="d-flex flex-column min-vh-100">
          <main className="flex-grow-1">
            <Routes>

              {/* ===== PUBLIC PAGES ===== */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/admission-info" element={<AdmissionInfo />} />
              <Route path="/fees-structure" element={<FeesStructure />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />

              {/* ===== AUTH ===== */}
              <Route 
                path="/login" 
                element={<LoginPage onLogin={handleLogin} />} 
              />
              <Route path="/signup" element={<SignUpPage />} />

              {/* ===== PARENT DASHBOARD (Protected) ===== */}
              <Route 
                path="/parent" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ParentDashboard userData={currentUser} />
                  </ProtectedRoute>
                } 
              />

              {/* ===== 404 ===== */}
              <Route 
                path="*" 
                element={
                  <div className="text-center py-5">
                    <h2 className="text-primary">404 - Page Not Found</h2>
                    <p className="text-muted">
                      The page you're looking for doesn't exist.
                    </p>
                    <a href="/" className="btn btn-primary">
                      Return Home
                    </a>
                  </div>
                } 
              />

            </Routes>
          </main>
        </div>
      </LayoutWrapper>
    </Router>
  );
}

export default App;