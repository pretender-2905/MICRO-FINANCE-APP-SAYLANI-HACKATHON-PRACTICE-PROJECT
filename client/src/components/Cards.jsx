import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

function Cards({ type = 'CARD', description = '', period = '-', maxLimit = '-' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  // Title size helper: shrink if the label is long
  const titleSize = type?.length > 26 ? 'xsmall' : type?.length > 18 ? 'small' : 'normal';
  const [selectedCategory, changeSelectedCategory] = useState("")
  const [selectedSubCategory, changeSelectedSubCategory] = useState("")
  const category = ['Wedding', 'Education', 'Home Construction', 'Business Startup']
  const weddingSubCategory = ['Nikah', 'Jahez', 'Valima']
  const educationSubCategory = ['Undergraduate & Graduate Loans', 'Abroad Study Loans', 'Professional & Career Loans']
  const homeConstructionCategory = ['Plot Purchase & Construction Loans', 'Self-Construction Loans', 'Home Renovation & Extension Loans']
  const businessStartupCategory = ['New Business Loans', 'Equipment & Infrastructure Loans', 'Working Capital Loans']
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Close on Escape for the modal
  useEffect(() => {
    if (!isCalcOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsCalcOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCalcOpen]);

  // Normalize type for gradient class
  const gradientClass = (type || '').toString().toUpperCase();

  return (
    <StyledWrapper className={isVisible ? 'visible' : ''}>
      <div className="card">
        {/* Animated background elements */}
        <div className="card__bg-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': Math.random() * 2 + 's',
                '--size': Math.random() * 3 + 1 + 'px',
                '--x': Math.random() * 100 + '%',
                '--y': Math.random() * 100 + '%',
              }}
            />
          ))}
        </div>

        <div className={`card__content ${gradientClass}`}>
          <div className="content-wrapper">
            <div className="top-section">
              <div className="icon-wrapper">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <h3 className={`card__title ${titleSize}`}>{type}</h3>
              <div className="card__description-container">
                <p className="card__description">{description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-section">
              <div className="stat-item">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="stat-details">
                  <span className="stat-label">Repayment Period</span>
                  <span className="stat-value">{period}</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="stat-details">
                  <span className="stat-label">Maximum Limit</span>
                  <span className="stat-value">{maxLimit}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card__actions">
              <button className="card__button primary">
                <span>Apply Now</span>
                <div className="button-icon">→</div>
              </button>

              <button className="card__button secondary" onClick={() => setIsCalcOpen(true)}>
                <span>Calculate Loan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Calculate Loan */}
      {isCalcOpen && (
        <ModalOverlay onClick={() => setIsCalcOpen(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Loan Calculator</h4>
              <button className="close" onClick={() => setIsCalcOpen(false)} aria-label="Close">×</button>
            </div>
            <div className="modal-body">
              <p>This is a placeholder popup. Add your calculator fields and logic here later.</p>
              <div className="placeholder-grid">

                <select name="Select Loan Category" required onChange={(e) => changeSelectedCategory(e.target.value)}>
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  {category.map((category, index) => (
                    <option value={category} key={index}>
                      {category}
                    </option>
                  ))}
                </select>

                <select name="Select Loan SubCategory" required onChange={(e) => changeSelectedSubCategory(e.target.value)}>
                   <option value="" disabled selected>
                    Select Sub Category
                  </option>

                 { selectedCategory === 'Wedding' &&
                    weddingSubCategory.map((subCategories, index) => (
                      <option value={subCategories} key={index}>
                        {subCategories}
                      </option>
                    ))
                  }

                  {selectedCategory === "Education" &&
                    educationSubCategory.map((subCategories, index) => (
                      <option value={subCategories} key={index}>
                        {subCategories}
                      </option>
                    ))
                  }

                 { selectedCategory === "Home Construction" &&
                    homeConstructionCategory.map((subCategories, index) => (
                      <option value={subCategories} key={index}>
                        {subCategories}
                      </option>
                    ))
                  }

                 { selectedCategory === "Business Startup" &&
                    businessStartupCategory.map((subCategories, index) => (
                      <option value={subCategories} key={index}>
                        {subCategories}
                      </option>
                    ))
                  }

                </select>
                {console.log("category=> ", selectedCategory)}
                {console.log("Sub category=> ", selectedSubCategory)}
                <div className="field" />
                <div className="field" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={() => setIsCalcOpen(false)}>Close</button>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}
    </StyledWrapper>
  );
}

/** Optional grid wrapper to ensure equal heights across rows */
function CardsGrid({ children }) {
  return <Grid>{children}</Grid>;
}

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const particleFloat = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-80px) rotate(360deg); opacity: 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0,0,0,.15); }
  50% { transform: scale(1.02); box-shadow: 0 15px 40px rgba(0,0,0,.2); }
  100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0,0,0,.15); }
`;

const StyledWrapper = styled.div`
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${fadeIn} 0.8s ease forwards;
  }

  .card {
    width: 100%;           /* grid controls width */
    height: 100%;          /* stretch to equal height within grid */
    border-radius: 20px;
    position: relative;
    transition: all 0.4s ease;
    animation: ${pulse} 6s ease-in-out infinite;
    display: flex;
    flex-direction: column;

    &:hover { transform: translateY(-5px); }
  }

  .card__bg-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    z-index: 0;

    .particle {
      position: absolute;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      animation: ${particleFloat} 5s ease-in-out infinite;
      animation-delay: var(--delay);
      width: var(--size);
      height: var(--size);
      left: var(--x);
      top: var(--y);
    }
  }

  .card__content {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    overflow: hidden;
    padding: 28px 22px;
    display: flex;
    flex-direction: column;

    &::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      background-size: 200% 200%;
      animation: ${gradientShift} 10s ease infinite;
      z-index: -1;
    }

    &::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
      backdrop-filter: blur(5px);
      z-index: -1;
    }
  }

  .content-wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  .top-section { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    width: 100%; 
  }

  .icon-wrapper { 
    margin-bottom: 16px; 
    animation: ${float} 6s ease-in-out infinite; 
  }

  .icon-circle {
    width: 64px; 
    height: 64px; 
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    display: flex; 
    align-items: center; 
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.2);
    margin: 0 auto;

    svg { width: 28px; height: 28px; color: white; }
  }

  .card__title {
    margin-bottom: 10px;
    color: white;
    letter-spacing: 0.4px;
    line-height: 1.15;
    font-weight: 800;
    font-size: 22px;           /* base */
    text-wrap: balance;
    word-break: break-word;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card__title.small { font-size: 20px; }
  .card__title.xsmall { font-size: 18px; }

  .card__description-container {
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
  }

  .card__description {
    font-size: 14px;
    line-height: 1.5;
    color: rgba(255,255,255,0.88);
    width: 100%;
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stats-section {
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    gap: 12px; 
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  .stat-item {
    display: flex; 
    align-items: center; 
    gap: 12px; 
    padding: 12px;
    background: rgba(255,255,255,0.08);
    border-radius: 12px; 
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s ease;
    flex-shrink: 0;

    &:hover { background: rgba(255,255,255,0.12); transform: translateX(4px); }
  }

  .stat-icon { 
    width: 40px; 
    height: 40px; 
    border-radius: 10px; 
    background: rgba(255,255,255,0.15); 
    display:flex; 
    align-items:center; 
    justify-content:center; 
    flex-shrink:0; 
  }
  .stat-icon svg { width: 20px; height: 20px; color: white; }

  .stat-details { text-align: left; flex: 1; }
  .stat-label { display:block; font-size: 11px; color: rgba(255,255,255,0.7); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-value { display:block; font-size: 16px; font-weight: 600; color: white; }

  .card__actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    flex-shrink: 0;
  }

  .card__button {
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 12px 18px;
    border-radius: 14px;
    color: white; 
    font-weight: 600; 
    cursor: pointer;
    transition: all 0.3s ease; 
    display:flex; 
    align-items:center; 
    justify-content:center; 
    gap: 8px;
    backdrop-filter: blur(10px);
    flex-shrink: 0;
  }
  .card__button.primary:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
  .card__button.secondary { background: rgba(255,255,255,0.12); }
  .card__button.secondary:hover { background: rgba(255,255,255,0.22); transform: translateY(-2px); }

  .button-icon { transition: transform 0.3s ease; }
  .card__button.primary:hover .button-icon { transform: translateX(3px); }

  /* Themed gradients by type */
  .card__content.NIKAH::before {    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  .card__content.JAHEZ::before {    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  .card__content.VALIMA::before { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }

  /* Responsive */
  @media (max-width: 768px) {
    .icon-circle { width: 60px; height: 60px; }
    .icon-circle svg { width: 26px; height: 26px; }
    .card__title { font-size: 20px; min-height: 46px; }
    .card__title.small { font-size: 18px; }
    .card__title.xsmall { font-size: 17px; }
    .card__description-container { min-height: 66px; }
  }

  @media (max-width: 480px) {
    .card__title { font-size: 19px; min-height: 44px; }
    .card__title.small { font-size: 17.5px; }
    .card__title.xsmall { font-size: 16.5px; }
    .card__description-container { min-height: 60px; }
    .card__actions { grid-template-columns: 1fr; }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  align-items: stretch; /* 🔑 ensures all children take the same height per row */
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed; 
  inset: 0; 
  z-index: 10000;
  background: rgba(0,0,0,0.5);
  display: flex; 
  align-items: center; 
  justify-content: center;
  padding: 16px;
`;

const ModalCard = styled.div`
  width: min(520px, 100%);
  background: #ffffff;
  color: #111827;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  overflow: hidden;
  display: flex; 
  flex-direction: column;

  .modal-header { 
    display:flex; 
    align-items:center; 
    justify-content: space-between; 
    padding: 16px 18px; 
    border-bottom: 1px solid #e5e7eb; 
  }
  .modal-header h4 { margin: 0; font-size: 18px; font-weight: 700; }
  .modal-header .close { border: 0; background: transparent; font-size: 24px; line-height: 1; cursor: pointer; padding: 4px 8px; }

  .modal-body { padding: 18px; font-size: 14px; }
  .placeholder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
  .placeholder-grid .field { height: 42px; border-radius: 10px; background: #f3f4f6; border: 1px dashed #d1d5db; }

  .modal-footer { padding: 14px 18px; border-top: 1px solid #e5e7eb; display:flex; justify-content: flex-end; }
  .modal-btn { background: #111827; color: #fff; border: 0; border-radius: 10px; padding: 10px 14px; font-weight: 600; cursor: pointer; }
`;

export { Cards, CardsGrid };
export default Cards;