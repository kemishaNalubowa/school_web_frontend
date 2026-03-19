// src/Pages/signInForm/SignInPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaPhone, FaLock, FaUser, FaBuilding, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import axios from 'axios';
import './SignInPage.css';

const SignInPage = () => {
  const navigate = useNavigate();
  
  // Form mode: 'login' or 'signup'
  const [formMode, setFormMode] = useState('login');
  
  // Form data
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    password: '', 
    role: 'Parent',
    schoolCode: '' 
  });
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Track which fields have been touched
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    password: false,
    schoolCode: false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle field blur (mark as touched)
  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  // Handle role selection
  const handleRoleSelect = (e) => {
    setFormData(prev => ({ ...prev, role: e.target.value }));
  };

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  // Toggle between login and signup
  const toggleFormMode = () => {
    setFormMode(prev => prev === 'login' ? 'signup' : 'login');
    setError('');
    setTouched({ name: false, phone: false, password: false, schoolCode: false });
    setFormData({ name: '', phone: '', password: '', role: 'Parent', schoolCode: '' });
  };

  // Validate Uganda phone number
  const isValidPhone = (phone) => {
    const cleaned = phone.replace(/\s/g, '');
    return /^(\+256|0)[7-9]\d{8}$/.test(cleaned);
  };

  // Validate form fields with SPECIFIC messages
  const validateForm = () => {
    // Phone validation (required for both)
    if (!formData.phone.trim()) {
      return 'Phone number is required';
    }
    if (!isValidPhone(formData.phone)) {
      return 'Enter a valid Uganda phone number (e.g., +256 772 123 456)';
    }

    // Password validation (required for both)
    if (!formData.password) {
      return 'Password is required';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    // Signup-specific validation
    if (formMode === 'signup') {
      if (!formData.name.trim()) {
        return 'Full name is required';
      }
      if (formData.name.trim().length < 3) {
        return 'Name must be at least 3 characters';
      }
      if (!formData.schoolCode.trim()) {
        return 'School registration code is required';
      }
    }

    return null; // No errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form BEFORE calling API
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setLoading(true);

    try {
      const endpoint = formMode === 'login' 
        ? 'http://localhost:5000/api/v1/auth/login' 
        : 'http://localhost:5000/api/v1/auth/signup';
      
      const payload = formMode === 'login'
        ? { 
            phone: formData.phone.replace(/\s/g, ''), 
            password: formData.password, 
            role: formData.role 
          }
        : { 
            name: formData.name.trim(),
            phone: formData.phone.replace(/\s/g, ''), 
            password: formData.password, 
            role: formData.role,
            schoolCode: formData.schoolCode.trim()
          };

      console.log('Sending request to:', endpoint);
      console.log('Payload:', payload);

      const res = await axios.post(endpoint, payload);
      const { access_token, user, message } = res.data;
      
      // Store auth data
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // ✅ DIFFERENT SUCCESS MESSAGES
      if (formMode === 'login') {
        toast.success(`Signed in successfully! Welcome back, ${user?.name || 'User'}! 🎉`);
      } else {
        toast.success(`Account created successfully! Welcome, ${user?.name || 'User'}! 🎉`);
      }
      
      // Navigate to home or dashboard
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (err) {
      console.error('Error:', err);
      
      // ✅ SPECIFIC ERROR MESSAGES
      let errorMessage = 'Operation failed. Please try again.';
      
      if (err.response) {
        // Backend returned an error
        errorMessage = err.response.data?.error || err.response.data?.message || 'Invalid credentials';
        
        // Specific error handling
        if (err.response.status === 400) {
          errorMessage = 'Invalid phone number or password';
        } else if (err.response.status === 401) {
          errorMessage = 'Incorrect phone number or password';
        } else if (err.response.status === 404) {
          errorMessage = 'Account not found. Please create an account first.';
        } else if (err.response.status === 409) {
          errorMessage = 'Account already exists. Please sign in instead.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (err.request) {
        // Request was made but no response
        errorMessage = 'No response from server. Please check your connection.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      
      {/* ✨ Animated Background */}
      <div className="signin-bg" aria-hidden="true">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      <Container className="signin-container">
        <div className="signin-wrapper">
          
          {/* ✨ Main Card */}
          <Card className="signin-card">
            
            {/* Decorative Top Bar */}
            <div className="card-top-bar"></div>
            
            <Card.Body className="p-4 p-md-5">
              
              {/* Header - Centered */}
              <div className="signin-header text-center mb-4">
                <div className="logo-wrapper">
                  <div className="logo-icon">
                    <FaGraduationCap />
                  </div>
                </div>
                <h1 className="signin-title">
                  {formMode === 'login' ? 'Welcome Back!' : 'Create Account'}
                </h1>
                <p className="signin-subtitle">
                  {formMode === 'login' 
                    ? 'Sign in to access your account' 
                    : 'Register to get started'}
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert 
                  variant="danger" 
                  className="error-alert mb-4"
                  dismissible 
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                
                {/* Full Name - Signup Only */}
                {formMode === 'signup' && (
                  <Form.Group className="form-group">
                    <Form.Label>
                      Full Name <span className="required">*</span>
                    </Form.Label>
                    <div className="input-wrapper">
                      <FaUser className="input-icon" />
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="Enter your full name"
                        required
                        className={`custom-input ${touched.name && !formData.name ? 'input-error' : ''}`}
                        isInvalid={touched.name && !formData.name}
                      />
                    </div>
                    {touched.name && !formData.name && (
                      <Form.Text className="text-danger small">
                        Name is required
                      </Form.Text>
                    )}
                  </Form.Group>
                )}

                {/* Phone Number */}
                <Form.Group className="form-group">
                  <Form.Label>
                    Phone Number <span className="required">*</span>
                  </Form.Label>
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+256 7XX XXX XXX"
                      required
                      className={`custom-input ${touched.phone && !isValidPhone(formData.phone) ? 'input-error' : ''}`}
                      isInvalid={touched.phone && formData.phone && !isValidPhone(formData.phone)}
                    />
                  </div>
                  <Form.Text className="input-hint">
                    Use your registered school phone number
                  </Form.Text>
                  {touched.phone && formData.phone && !isValidPhone(formData.phone) && (
                    <Form.Text className="text-danger small">
                      Invalid format. Example: +256 772 123 456
                    </Form.Text>
                  )}
                </Form.Group>

                {/* School Code - Signup Only */}
                {formMode === 'signup' && (
                  <Form.Group className="form-group">
                    <Form.Label>
                      School Code <span className="required">*</span>
                    </Form.Label>
                    <div className="input-wrapper">
                      <FaBuilding className="input-icon" />
                      <Form.Control
                        type="text"
                        name="schoolCode"
                        value={formData.schoolCode}
                        onChange={handleChange}
                        onBlur={() => handleBlur('schoolCode')}
                        placeholder="Enter code from school"
                        required
                        className={`custom-input ${touched.schoolCode && !formData.schoolCode ? 'input-error' : ''}`}
                        isInvalid={touched.schoolCode && !formData.schoolCode}
                      />
                    </div>
                    {touched.schoolCode && !formData.schoolCode && (
                      <Form.Text className="text-danger small">
                        School code is required
                      </Form.Text>
                    )}
                  </Form.Group>
                )}

                {/* Password */}
                <Form.Group className="form-group">
                  <Form.Label>
                    Password <span className="required">*</span>
                  </Form.Label>
                  <div className="input-wrapper password-wrapper">
                    <FaLock className="input-icon" />
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur('password')}
                      placeholder="••••••••"
                      required
                      className={`custom-input ${touched.password && formData.password.length < 6 ? 'input-error' : ''}`}
                      isInvalid={touched.password && formData.password.length > 0 && formData.password.length < 6}
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="toggle-password"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                  {touched.password && formData.password.length > 0 && formData.password.length < 6 && (
                    <Form.Text className="text-danger small">
                      Password must be at least 6 characters
                    </Form.Text>
                  )}
                  {formMode === 'login' && (
                    <div className="forgot-link-wrapper">
                      <Link to="/forgot-password" className="forgot-link">
                        Forgot password?
                      </Link>
                    </div>
                  )}
                </Form.Group>

                {/* Role Dropdown */}
                <Form.Group className="form-group">
                  <Form.Label>
                    I am a <span className="required">*</span>
                  </Form.Label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleRoleSelect}
                      className="custom-input"
                      style={{ paddingLeft: '52px' }}
                    >
                      <option value="Parent">Parent</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Admin">Admin</option>
                    </Form.Select>
                  </div>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="submit-btn mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      {formMode === 'login' ? 'Sign In' : 'Create Account'}
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </Button>

              </Form>

              {/* Toggle Form Link */}
              <div className="form-toggle text-center mt-4">
                <span className="toggle-text">
                  {formMode === 'login' ? "New to JOKS School?" : "Already have an account?"}
                </span>
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={toggleFormMode}
                >
                  {formMode === 'login' ? 'Create Account' : 'Sign In'}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="trust-badges mt-4 pt-4 border-top">
                <span className="badge">🔒 Secure</span>
                <span className="badge">🇺🇬 Uganda</span>
                <span className="badge">⚡ Fast</span>
              </div>

            </Card.Body>
          </Card>

          {/* Footer Links */}
          <div className="signin-footer text-center mt-4">
            <Link to="/privacy" className="footer-link">Privacy</Link>
            <span className="divider">•</span>
            <Link to="/terms" className="footer-link">Terms</Link>
            <span className="divider">•</span>
            <Link to="/help" className="footer-link">Help</Link>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default SignInPage;