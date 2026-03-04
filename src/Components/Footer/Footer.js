import React from "react";
import "./Footer.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT COLUMN */}
        <div className="footer-column about">
          <h2 className="logo">JJOKOLERA JUNOIR SCHOOLS UGANDA</h2>

          <p>
            Decades of building trust and meaningful partnerships with
            neighbouring schools, coupled with extensive community
            consultation, has positioned us to create a development that
            truly reflects and serves the wider community.
          </p>

          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>

        {/* CONTACT COLUMN */}
        <div className="footer-column contact">
          <h3>Contact Us</h3>

          <p>
            <FaMapMarkerAlt className="icon" />
            Plot No. 447, Block 213, Kyebando - Kisalosalo Road,
            Bukoto, Kampala, Uganda.
          </p>

          <p>
            <FaPhoneAlt className="icon" />
            +256 752 711 909
          </p>

          <p>
            <FaEnvelope className="icon" />
            office@kisu.com
          </p>
        </div>

        {/* LINKS COLUMN */}
        <div className="footer-column links">
          <h3>Quick Links</h3>
          <ul>
            <li>Our Guiding Statements</li>
            <li>Placement Policy</li>
            <li>Enrolment Policy</li>
            <li>Admissions Policy</li>
          </ul>
        </div>

        {/* RESOURCES COLUMN */}
        <div className="footer-column resources">
          <h3>Resources</h3>
          <ul>
            <li>Theory of Knowledge</li>
            <li>Parent Zone</li>
            <li>School Calendar</li>
          </ul>

          {/* <button className="admission-btn">
            Admissions Ongoing
          </button> */}
        </div>

      </div>

      <div className="footer-bottom">
        Copyright © Jjokolera Schools Uganda
      </div>

    </footer>
  );
};

export default Footer;