import React from 'react';
import LoginForm from './components/LoginForm';
import './styles/global.css';
import './styles/LoginForm.css';

const CalendarIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

function App() {
  return (
    <>
      <header className="main-header">
        <div className="container">
          <nav className="main-nav">
            <a href="#" className="logo">
              <CalendarIcon />
              <span>EventHub</span>
            </a>
            <ul className="nav-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Admin</a></li>
            </ul>
            <div className="nav-actions">
              <a href="#" className="btn btn-secondary">Log in</a>
              <a href="#" className="btn btn-primary">Sign up</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="welcome-section">
            <div className="logo">
              <CalendarIcon size={28} />
              <h1>EventHub</h1>
            </div>
            <h2>Welcome to EventHub</h2>
            <p>Discover and book amazing events near you</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </>
  );
}

export default App;