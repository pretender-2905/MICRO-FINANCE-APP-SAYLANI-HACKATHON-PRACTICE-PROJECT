import React from 'react';
import styled from 'styled-components';

function Cards({ type }) {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__content flex justify-center items-center text-white text-4xl">
          {type}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    border-radius: 20px;
    padding: 5px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    border: 3px solid #FDE405; /* yellow border */
    background: transparent; /* remove gradient */
  }

  .card__content {
    background: #29b34b; /* green background */
    border-radius: 17px;
    width: 100%;
    height: 100%;
  }
`;

export default Cards;
