import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, InputGroup,Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { parentAuthService } from '../../Services/api';
import "./SignUppage.css";

function SignUpForm() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateemail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };


    const validateForm = () => {
    const newErrors = {};

    if (!validateemail(formData.email)) {
      newErrors.email = 'Please enter a valid Email.';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

     try {
      const res = await parentAuthService.register({
        email: formData.email,
        name: formData.name,
        phone_number: formData.phone_number,
        password: formData.password,
      });

      toast.success('Account created successfully! Please log in.');
      navigate('/login');

    } catch (err) {
      const message = err.response?.data?.error || 'Signup failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="signup-page d-flex justify-content-center"
    style={
      {
        paddingTop:"10rem",
        paddingBottom:"5rem"
      }
    }>
      <Card className="signup-card p-5 shadow-sm w-100" style={{ maxWidth: '450px' }}>
        <h4 className="text-center mb-3 text-warning">Create Account</h4>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="custom-input"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Account</Form.Label>
            <Form.Control
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="youremail@gmail.com"
              className="custom-input"
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="custom-input"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="custom-input"
                isInvalid={!!errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="custom-input"
                isInvalid={!!errors.confirmPassword}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              <Button variant="outline-secondary" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

           <Button 
           variant="warning" 
           type="submit" 
           className="w-100" 
           disabled={loading}>
            {loading ? (
              <>
                <Spinner 
                animation="border" 
                size="sm" /> Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>

          <p className="text-center mt-3 small">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </Form>
      </Card>
    </Container>
  );
}

export default SignUpForm;
