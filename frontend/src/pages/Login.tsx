import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'; // You can also reuse styles from register.css

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/login', form);
      
      // Assuming your API returns a token
      const { token } = response.data;
      
      // Store token in localStorage or in a secure way
      localStorage.setItem('token', token);
      
      toast.success('Login successful!');
      
      // Redirect to dashboard or home page
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Sign in to your account</h1>
          <p>Enter your credentials below to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
}