import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import '../styles/home.css';

// Define the interface for featured items
interface FeaturedItem {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [msg,setMessage] = useState({})


    async function fetchRandomData() {
     try {
      const res=await axios.get("https://test-qpbv.onrender.com")
      if(res){
      console.log(res)

        setMessage(res)
      }
     } catch (error) {
      
     }
  }
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserData();
    }

    try {
      fetchRandomData()
    } catch (error) {
      
    }

    // Fetch featured items
    fetchFeaturedItems();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/users/me');
      setUserName(response.data.name);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // If token is invalid, clear it
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  const fetchFeaturedItems = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get('/items/featured');
      setFeaturedItems(response.data);
    } catch (error) {
      console.error('Error fetching featured items:', error);
      // Set some sample data if API fails
      setFeaturedItems([
        { id: 1, title: 'Featured Item 1', description: 'This is a description of the first featured item.' },
        { id: 2, title: 'Featured Item 2', description: 'This is a description of the second featured item.' },
        { id: 3, title: 'Featured Item 3', description: 'This is a description of the third featured item.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName('');
    // You might want to redirect to login page
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <h1>MyCRUD-App</h1>
        </div>
        <nav className="navigation">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="welcome-message">Welcome, {userName}</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </>
          )}
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div>
             
            </div>
            <h1>Welcome to Your Application</h1>
            <p>A comprehensive solution for all your needs</p>
            {!isAuthenticated && (
              <div className="hero-buttons">
                <Link to="/register" className="primary-button">Get Started</Link>
                <Link to="/learn-more" className="secondary-button">Learn More</Link>
              </div>
            )}
          </div>
        </section>

        <section className="features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Data Management</h3>
              <p>Efficiently organize and manage your data with our intuitive interface.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Access</h3>
              <p>Your data is protected with enterprise-grade security protocols.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access your account from any device with our responsive design.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Performance</h3>
              <p>Enjoy lightning-fast operations with our optimized backend.</p>
            </div>
          </div>
        </section>

        <section className="featured-content">
          <h2>Featured Items</h2>
          {isLoading ? (
            <div className="loading">Loading featured items...</div>
          ) : (
            <div className="items-grid">
              {featuredItems.map((item) => (
                <div className="item-card" key={item.id}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link to={`/items/${item.id}`} className="item-link">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="cta">
          <div className="cta-content">
            <h2>Ready to get started?</h2>
            <p>Join thousands of satisfied users today.</p>
            {!isAuthenticated && (
              <Link to="/register" className="cta-button">
                Create Your Account
              </Link>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>YourApp</h3>
            <p>Making your life easier since 2025.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@yourapp.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} MyCRUD-App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}