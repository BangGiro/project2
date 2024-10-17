// FloatingButton.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingButton.css'; // 스타일을 위한 CSS 파일 임포트

const FloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleFloatingButton = () => {
    setIsExpanded(!isExpanded);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const goToHome = () => {
    navigate('/customerServicePage');
  };
  const goToCart = () => {
    navigate('/shop/cart');
  };
  const goToManagement = () => {
    navigate('/Management');
  };
  const goToExercise = () => {
    navigate('/ExerciseMain');
  };

  return (
    <div className={`floating-container ${isExpanded ? 'expanded' : ''}`}>
      <button className="floating-button" onClick={toggleFloatingButton}>
        {isExpanded ? '-' : '+'}
      </button>
      <div className="floating-options">
        <button onClick={scrollToTop}><i className="fa-regular fa-circle-up"></i></button>
        <button onClick={scrollToBottom}><i className="fa-regular fa-circle-down"></i></button>
        <button onClick={goToManagement}><i className="fa-solid fa-user-group"></i></button>
        <button onClick={goToExercise}><i className="fa-solid fa-dumbbell"></i></button>
        <button onClick={goToCart}><i className="fa-solid fa-cart-shopping"></i></button>
        <button onClick={goToHome}><i className="fa-solid fa-headset"></i></button>
      </div>
    </div>
  );
};

export default FloatingButton;
