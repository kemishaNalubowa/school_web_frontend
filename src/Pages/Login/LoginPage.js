// src/Pages/Login/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { parentAuthService, tokenService } from '../../Services/api';
import './LoginPage.css';

function SignInPage({ onLogin }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    contact: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 🔹 Send login request to Django backend using api service
      const data = await parentAuthService.login(formData.contact, formData.password);

      // ✅ Login success
      if (data.success) {
        // Save DRF token (hidden from user, auto-included in all API requests)
        tokenService.saveToken(data.token);

        // Prepare user data for App.js state
        const userData = {
          id: data.parent.id,
          name: data.parent.name,
          contact: data.parent.contact,
          email: data.parent.email,
          role: 'parent',
        };

        // Save parent details to localStorage
        localStorage.setItem('parent', JSON.stringify(userData));

        // Save students list for child switcher
        localStorage.setItem('parent_students', JSON.stringify(data.students || []));

        // Update App.js state via callback
        if (onLogin) onLogin(userData);

        // Navigate to dashboard
        navigate('/parent');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError('Invalid phone number or password');
      } else {
        setError('Unable to connect to server. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="title">Parent Login</h2>

        {error && <p className="error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Contact Field */}
          <label htmlFor="contact">Contact</label>
          <input
            id="contact"
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. +256 700 123 456"
            pattern="^\+?[0-9\s\-]{7,15}$"
            title="Enter a valid phone number (7-15 digits)"
            required
            disabled={loading}
          />
          <small className="contact-hint">Use the phone number you registered at school</small>

          {/* Password Field */}
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={loading}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="forgot-wrapper">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="main-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;