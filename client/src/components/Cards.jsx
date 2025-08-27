import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

function Cards({ type, description, period, maxLimit }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledWrapper className={isVisible ? 'visible' : ''}>
      <div className="card">
        <div className="card__content">
          <div className="card__front">
            <h3 className="card__title">{type}</h3>
            <p className="card__description">{description}</p>
          </div>
          <div className="card__back">
            <div className="loan-info">
              <div className="info-item">
                <span className="info-label">Period</span>
                <span className="info-value">{period}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Max Loan Limit</span>
                <span className="info-value">{maxLimit}</span>
              </div>
            </div>
            <button className="card__button">Apply Now</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledWrapper = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
    animation: ${fadeIn} 0.8s ease forwards;
  }

  .card {
    width: 300px;
    height: 380px;
    perspective: 1000px;
    border-radius: 20px;
    margin: 15px;
  }

  .card__content {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    &:hover {
      transform: rotateY(180deg);
    }
  }

  .card__front, .card__back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }

  .card__front {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: 200% 200%;
    animation: ${gradientShift} 8s ease infinite;
    color: white;
    
    &:before {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      z-index: -1;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      filter: blur(20px);
      opacity: 0.5;
      border-radius: 30px;
    }
  }

  .card__back {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    transform: rotateY(180deg);
    background-size: 200% 200%;
    animation: ${gradientShift} 8s ease infinite;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 40px 30px;
  }

  .card__title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    animation: ${float} 4s ease-in-out infinite;
  }

  .card__description {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 15px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    max-width: 90%;
  }

  .loan-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-bottom: 30px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .info-label {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .info-value {
    font-size: 24px;
    font-weight: 700;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }

  .card__button {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid white;
    padding: 12px 28px;
    border-radius: 50px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    animation: ${pulse} 2s ease-in-out infinite;
    
    &:hover {
      background: white;
      color: #f5576c;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      animation: none;
    }
  }

  /* Different colors for different categories */
  .card__front.NIKAH {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  
  .card__front.JAHEZ {
    background: linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%);
  }
  
  .card__front.VALIMA {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .card {
      width: 280px;
      height: 360px;
    }
    
    .card__title {
      font-size: 28px;
    }
    
    .card__description {
      font-size: 14px;
    }
    
    .info-value {
      font-size: 22px;
    }
  }

  @media (max-width: 480px) {
    .card {
      width: 260px;
      height: 340px;
      margin: 10px;
    }
    
    .card__back {
      padding: 30px 20px;
    }
    
    .info-value {
      font-size: 20px;
    }
  }
`;

export default Cards;