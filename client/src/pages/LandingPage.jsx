// import Cards from "../components/Cards"

// function LandingPage(){
//     return(
//         <div>
//         <div className="text-center text-3xl text-green-600">
//             LandingPage
//         </div>
//         <div className="mt-10 flex justify-center flex-col items-center gap-5">
//         <div className="text-center text-3xl text-green-600">
//         WEDDING
//         </div>
//         <div className="flex gap-10">
//         <Cards type={"NIKAH"}/>
//         <Cards type={"JAHEZ"}/>
//         <Cards type={"VALIMA"}/>
//         </div>
//         </div>
//         </div>

//     )
// }

// export default LandingPage

import React from 'react';
import Cards from "../components/Cards";
import styled, { keyframes } from 'styled-components';

function LandingPage() {
  return (
    <StyledLanding>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Your Journey to Financial Freedom</h1>
          <p className="hero-subtitle">From ceremony & celebration to study Abroad, we guide you through every step</p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Wedding Essentials</h2>
          <p>Three key components for your special day</p>
        </div>

        <div className="cards-container">
          <Cards
            type={"NIKAH"}
            description={"Sacred marriage ceremony uniting two souls in holy matrimony forever"}
            period='36 Months'
            maxLimit='10 lakhs'
          />
          <Cards
            type={"JAHEZ"}
            description={"Traditional gifts and dowry preparations for the bride's new household"}
            period='60 Months'
            maxLimit='20 lakhs'
          />
          <Cards
            type={"VALIMA"}
            description={"Grand reception feast hosted by the groom's family celebrating marriage"}
            period='60 Months'
            maxLimit='15 lakhs'
          />
        </div>
      </div>
      <div className="section">
        <div className="section-header">
          <h2>Education Essentials</h2>
          <p>Three key options to fund your academic journey</p>
        </div>

        <div className="cards-container">

          <Cards
            type={"Undergraduate &  Graduate Loans"}
            description={"Affordable student loans to support your higher education journey."}
             period='60 Months'
            maxLimit='50 lakhs'
          />
          <Cards
            type={"Abroad Study Loans"}
            description={"Tailored financing to pursue studies at international universities."}
             period='84 Months'
            maxLimit='1 Crore'
          />
          <Cards
            type={"Professional & Career Loans"}
            description={"Flexible loans to upskill, advance your career, or pursue professional courses."}
             period='60 Months'
            maxLimit='50 lakhs'
          />
        </div>
      </div>
      <div className="section">
        <div className="section-header">
          <h2>Home Construction</h2>
          <p>Customized financing solutions to build, renovate, or expand your dream home.</p>
        </div>

        <div className="cards-container">

          <Cards
            type={"Plot Purchase & Construction Loans"}
            description={"Finance to buy land and build your dream home from scratch."}
             period='84 Months'
            maxLimit='1 Crore'
          />
          <Cards
            type={"Self-Construction Loans"}
            description={"Funds to construct a new house on your existing owned plot."}
             period='84 Months'
            maxLimit='1 Crore'
          />
          <Cards
            type={"Home Renovation & Extension Loans"}
            description={"Easy financing for upgrading, remodeling, or expanding your current home."}
             period='60 Months'
            maxLimit='50 lakhs'
          />
        </div>
      </div>
      <div className="section">
        <div className="section-header">
          <h2>Business Startup Loans</h2>
          <p>mart funding solutions to kickstart and grow your entrepreneurial journey.</p>
        </div>

        <div className="cards-container cards-grid">

          <Cards
            type={"New Business Loans"}
            description={"Capital support to launch your startup from idea to reality."}
             period='60 Months'
            maxLimit='50 lakhs'
          />
          <Cards
            type={"Working Capital Loans"}
            description={"Short-term funding to manage daily operations and cash flow needs."}
             period='60 Months'
            maxLimit='50 lakhs'
          />
           <Cards
            type={"Equipment & Infrastructure Loans"}
            description={"Financing to purchase machinery, technology, or set up office/workspace."}
             period='60 Months'
            maxLimit='50 lakhs'
          />
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Our Services?</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🎉</div>
            <h3>Stress-Free Planning</h3>
            <p>We handle details so you can enjoy your special day</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💖</div>
            <h3>Customized Experiences</h3>
            <p>Tailored to reflect your unique love story</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⭐</div>
            <h3>Trusted Professionals</h3>
            <p>Experienced wedding planners with attention to detail</p>
          </div>
        </div>
      </div>
    </StyledLanding>
  )
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

const StyledLanding = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Poppins', sans-serif;
  
  .hero-section {
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: 200% 200%;
    animation: ${gradientShift} 8s ease infinite;
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,218.7C672,224,768,160,864,138.7C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
      background-size: cover;
      background-position: bottom;
    }
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    animation: ${fadeIn} 1s ease forwards;
  }
  
  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .section {
    padding: 5rem 2rem;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
    animation: ${fadeIn} 1s ease forwards;
    
    h2 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.2rem;
      color: #666;
    }
  }
  
  .cards-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .features-section {
    padding: 5rem 2rem;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    background-size: 200% 200%;
    animation: ${gradientShift} 8s ease infinite;
    color: white;
    text-align: center;
    
    h2 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }
  }
  
  .features-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .feature {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    width: 300px;
    transition: transform 0.3s ease;
    animation: ${fadeIn} 1s ease forwards;
    
    &:hover {
      transform: translateY(-10px);
    }
  }
  
  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: ${float} 4s ease-in-out infinite;
  }
  
  .feature h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .feature p {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
    }
    
    .cards-container {
      flex-direction: column;
      align-items: center;
    }
    
    .features-grid {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default LandingPage;