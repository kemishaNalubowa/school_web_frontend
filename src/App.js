// src/App.js
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
// FIX: Ensure the file is named Navbar.js or index.js inside NavBar folder.
// The error suggests the file on disk is 'Navbar' (capital N). 
import Navbar from "./Components/NavBar/Navbar"; 
import Footer from "./Components/Footer/Footer";

// Pages
import Home from "./Pages/Homepage/Home";
import AboutUs from "./Pages/AboutUspage/AboutUs";
import Admissions from "./Pages/Admissionpage/Admissions";
import Events from "./Pages/Events/Events";
import Gallery from "./Pages/Gallery/Gallery";

// FIX: Changed 'contact' to 'Contact' to match file 'Contact.js'
import Contact from "./Pages/Contact/Contact"; 

// Admission Sub-pages
import AdmissionInfo from "./Pages/Admissionpage/AdmissionInfo";
import FeesStructure from "./Pages/Admissionpage/FeesStructure";

// FIX: Changed 'signInpage' to 'SignInPage' to match file 'SignInPage.js'
import LoginPage from "./Pages/signInForm/SignInPage"; 

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" theme="light" />
      
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/admission-info" element={<AdmissionInfo />} />
            <Route path="/fees-structure" element={<FeesStructure />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Login Route */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={
              <div className="text-center py-5">
                <h2>404 - Page Not Found</h2>
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