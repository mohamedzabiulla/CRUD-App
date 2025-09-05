import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/register.css'; // You can create this CSS file for additional customization

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    
    try {
      setIsLoading(true);
      // Combine first and last name for the backend
      const userData = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        password: form.password
      };
      
      await axios.post('/users', userData);
      toast.success('Registration successful!');
      // Redirect to login page or dashboard
    } catch (err: any) {
      console.error("Registration error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Create an account</h1>
          <p>Enter your information below to create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <p className="password-hint">Must be at least 8 characters with uppercase, lowercase, and numbers</p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}