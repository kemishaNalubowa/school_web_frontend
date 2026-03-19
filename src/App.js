// src/App.js
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer/Footer";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

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

// Login Page
import LoginPage from "./Pages/Login/LoginPage";

function App() {
  // 🔐 Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Handle successful login
  const handleLogin = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Show loading state while checking auth
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
      <ToastContainer position="top-right" theme="light" />
      
      <div className="d-flex flex-column min-vh-100">
        {/* Pass auth props to Navbar */}
        <Navbar 
          isAuthenticated={isAuthenticated} 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        
        <main className="flex-grow-1">
          <Routes>
            {/* ===== PUBLIC ROUTES ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/admission-info" element={<AdmissionInfo />} />
            <Route path="/fees-structure" element={<FeesStructure />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            
            {/* ===== 🔐 PROTECTED ROUTES (Add when ready) ===== */}
            {/* 
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard currentUser={currentUser} />
                </ProtectedRoute>
              } 
            />
            */}
            
            {/* ===== 404 Fallback ===== */}
            <Route path="*" element={
              <div className="text-center py-5">
                <h2 className="text-primary">404 - Page Not Found</h2>
                <p className="text-muted">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary">Return Home</a>
              </div>
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;