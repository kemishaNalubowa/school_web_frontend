// src/Pages/signInForm/signInpage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import './SignInpage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Parent' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleForm = () => { setIsLogin(!isLogin); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);

    try {
      const endpoint = isLogin 
        ? 'http://localhost:5000/api/v1/auth/login' 
        : 'http://localhost:5000/api/v1/auth/signup';
        
      const res = await axios.post(endpoint, formData);
      const { access_token, user } = res.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Welcome to Joks School Connect!`);
      navigate('/dashboard/profile');
    } catch (err) {
      const message = err.response?.data?.error || 'Operation failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="login-container d-flex justify-content-center align-items-center"
      style={{ paddingTop: "12rem", paddingBottom: "5rem", paddingLeft: "0rem", backgroundColor: "#FEFFD3", minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card
            className="p-4 shadow login-card"
            style={{ background: 'linear-gradient(to right, #071f1a, #0f3d33)', border: 'none', borderRadius: '15px' }}
          >
            {/* Card Title */}
            <h3 className="text-center mb-4 login-title" style={{ color: '#7CFF00' }}>
              {isLogin ? 'Sign In' : 'Sign Up'} to Joks School
            </h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Name Field - Only for Signup */}
              {!isLogin && (
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#cccccc' }}>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    style={{ backgroundColor: '#fff', color: '#000' }}
                  />
                </Form.Group>
              )}

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#cccccc' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  required
                  style={{ backgroundColor: '#fff', color: '#000' }}
                />
              </Form.Group>

              {/* Password with Independent Eye Icon */}
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#cccccc' }}>Password</Form.Label>
                <div className="password-input-wrapper">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    style={{ backgroundColor: '#fff', color: '#000' }}
                  />
                  <Button
                    variant="outline-secondary"
                    className="eye-btn-inside"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              {/* Role Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#cccccc' }}>Role</Form.Label>
                <div className="select-wrapper">
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{ backgroundColor: '#fff', color: '#000' }}
                  >
                    <option value="Parent">Parent</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                  <FaChevronDown className="dropdown-icon" />
                </div>
              </Form.Group>

              {/* Submit Button - Centered Text */}
              <Button
                type="submit"
                className="w-100 mb-3 d-flex justify-content-center align-items-center"
                disabled={loading}
                style={{
                  backgroundColor: '#7CFF00',
                  borderColor: '#7CFF00',
                  color: '#000',
                  fontWeight: 'bold',
                  gap: '8px'
                }}
              >
                {loading && <Spinner animation="border" size="sm" />}
                <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
              </Button>

              {/* Remember Me & Forgot Password */}
              {isLogin && (
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check label="Remember Me" style={{ color: '#cccccc' }} />
                  <Link to="/forgot-password" className="small" style={{ color: '#7CFF00' }}>
                    Forgot password?
                  </Link>
                </div>
              )}
            </Form>

            {/* Toggle Link */}
            <p className="text-center mt-3" style={{ color: '#cccccc' }}>
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{' '}
              <span onClick={toggleForm} style={{ color: '#7CFF00', fontWeight: 'bold', cursor: 'pointer' }}>
                {isLogin ? 'Create one' : 'Sign In'}
              </span>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;