import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

function Headers() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledHeader className={isScrolled ? 'scrolled' : ''}>
      <div className="header-container">
        <a href="#" className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">Aasaan Zar Finance App</span>
        </a>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><a href="#" className="nav-link active">Home</a></li>
            <li><a href="#" className="nav-link">About</a></li>
            <li><a href="#" className="nav-link">Services</a></li>
            <li><a href="#" className="nav-link">Pricing</a></li>
            <li><a href="#" className="nav-link">Contact</a></li>
          </ul>
        </nav>

        <div className="user-section">
          <button className="user-btn">
            <div className="user-avatar">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="user-name">Bonnie Green</span>
          </button>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </StyledHeader>
  );
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease forwards;
  
  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-weight: 700;
    font-size: 1.4rem;
    transition: all 0.3s ease;

    &:hover {
      color: #667eea;
      transform: translateY(-2px);
    }
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    animation: ${pulse} 4s ease-in-out infinite;
  }

  .logo-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-list {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    text-decoration: none;
    color: #555;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }

    &.active {
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      background-size: 200% 200%;
      animation: ${gradientShift} 4s ease infinite;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(102, 126, 234, 0.1);

    &:hover {
      background: rgba(102, 126, 234, 0.2);
      transform: translateY(-2px);
    }
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .user-name {
    font-weight: 500;
    color: #333;
  }

  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    gap: 4px;

    span {
      width: 24px;
      height: 2px;
      background: #333;
      transition: all 0.3s ease;
      transform-origin: center;
    }
  }

  @media (max-width: 768px) {
    .nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      transform: translateY(-10px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;

      &.nav-open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }

    .nav-list {
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-link {
      display: block;
      padding: 1rem;
      border-radius: 8px;
    }

    .mobile-menu-btn {
      display: flex;

      &.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      &.active span:nth-child(2) {
        opacity: 0;
      }

      &.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
    }

    .user-name {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .header-container {
      padding: 1rem;
    }

    .logo-text {
      font-size: 1.1rem;
    }
  }
`;

export default Headers;