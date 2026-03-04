import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Homepage/Home";
import AboutUs from "./Pages/AboutUspage/AboutUs";
import Admissions from "./Pages/Admissionpage/Admissions";
import Events from "./Pages/Events/Events";
import Gallery from "./Pages/Gallery/Gallery";
import Contact from "./Pages/Contact/Contact";


// NEW PAGES
import AdmissionInfo from "./Pages/Admissionpage/AdmissionInfo";
import FeesStructure from "./Pages/Admissionpage/FeesStructure";
import LoginPage from "./Pages/signInForm/signInpage"; 
// import "./Contact.css";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        {/* Main content */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/admission-info" element={<AdmissionInfo />} />
            <Route path="/fees-structure" element={<FeesStructure />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />

            {/* LOGIN PAGE */}
            <Route
              path="/login"
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "calc(100vh - 80px)", // subtract navbar height
                    backgroundColor: "#FEFFD3",
                    padding: "2rem",
                  }}
                >
                  <LoginPage />
                </div>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;