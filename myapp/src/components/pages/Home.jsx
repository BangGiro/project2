import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll('.training-club, .more-challenges, .customer-reviews, .new-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, {
      threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const handleReviewClick = (reviewIndex) => {
    alert(`리뷰 ${reviewIndex + 1} 클릭됨!`);
  };

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

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-text">
          <h1>더 이상 쉬워지지 않습니다.<br/> 당신이 더 나아질 뿐입니다.</h1>
          <button>모든 챌린지 보기</button>
        </div>
        <img src="/image/home/background.webp" alt="Hero" className="hero-image" />
      </section>
      
      <section className="training-club">
        <div className="challenges visible">
          {[...Array(3)].map((_, i) => (
            <div className="challenge-card" key={i}>
              <img src={`/image/home/${i+1}.jpg`} alt={`Challenge ${i+1}`} />
              <div className="challenge-info">
                <h3>챌린지 {i+1}</h3>
                <p>참가자 {i+1}명</p>
                <p>무료</p>
                <button>참여하기</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="more-challenges">
        <h2>더 많은 챌린지</h2>
        <div className="challenges visible">
          {[...Array(10)].map((_, i) => (
            <div className="challenge-card" key={i+4}>
              <img src={`/image/home/${i+4}.jpg`} alt={`Challenge ${i+4}`} />
              <div className="challenge-info">
                <h3>챌린지 {i+4}</h3>
                <p>참가자 {i+4}명</p>
                <p>무료</p>
                <button>참여하기</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="customer-reviews">
        <h2>고객 리뷰</h2>
        <div className="reviews">
          {[...Array(5)].map((_, i) => (
            <div className="review-card" key={i} onClick={() => handleReviewClick(i)}>
              <p>"이 서비스는 정말 최고예요! 챌린지를 통해 많은 것을 배웠습니다."</p>
              <p>- 사용자 {i+1}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="new-section">
        <div className="category">
          <h2>체중 관리</h2>
          <ul>
            <li>체중 관리</li>
            <li>체조성 기록</li>
            <li>활동 관리</li>
          </ul>
        </div>
        <div className="category">
          <h2>식단 관리</h2>
          <ul>
            <li>식단 짜기</li>
            <li>밀프렙 도우미</li>
            <li>보충제 활용</li>
          </ul>
        </div>
        <div className="category">
          <h2>운동 도우미</h2>
          <ul>
            <li>다이어트 도우미</li>
            <li>바디프로필 도우미</li>
            <li>치팅데이 도우미</li>
            <li>유지어트 도우미</li>
            <li>밴딩/로딩</li>
            <li>탄수화물 사이클링</li>
          </ul>
        </div>
        <div className="category">
          <h2>제품추천</h2>
          <ul>
            <li>보충제</li>
            <li>닭가슴살</li>
          </ul>
        </div>
        <div className="category mypage">
          <button>마이페이지 +</button>
        </div>
      </section>

      <div className={`floating-container ${isExpanded ? 'expanded' : ''}`}>
        <button className="floating-button" onClick={toggleFloatingButton}>
          {isExpanded ? '-' : '+'}
        </button>
        <div className="floating-options">
            <button onClick={scrollToTop}><i className="fa-regular fa-circle-up fa-flip"></i></button>
            <button onClick={scrollToBottom}><i className="fa-regular fa-circle-down fa-flip"></i></button>
            <button onClick={goToHome}><i className="fa-solid fa-headset"></i></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
