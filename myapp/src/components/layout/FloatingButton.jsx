import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FloatingButton.css'; // 스타일을 위한 CSS 파일 임포트

const FloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치 추적

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
    navigate('/cart');
  };
  const goToManagement = () => {
    navigate('/Management');
  };
  const goToExercise = () => {
    navigate('/ExerciseMain');
  };

  // 페이지 이동할 때마다 플로팅 버튼이 닫히도록 설정
  useEffect(() => {
    setIsExpanded(false); // 페이지 이동 시 플로팅 버튼 닫기
  }, [location]); // 라우팅이 변경될 때마다 실행

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
