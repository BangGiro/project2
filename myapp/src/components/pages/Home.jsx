import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState('annual'); // State for payment plan toggle
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll('.training-club, .more-challenges, .customer-reviews, .new-section, .pricing-plans');
    
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

  const handleTogglePlan = (plan) => {
    setPaymentPlan(plan);
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
                <h3>챌린지 {i+1}기</h3>
                <p>참가자 {i+5}명</p>
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
                <h3>챌린지 {i+4}기</h3>
                <p>참가자 {i+4}명</p>
                <p>유료</p>
                <button>참여하기</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="customer-reviews">
        <h2>관리 도우미</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <i className="fa-solid fa-calendar"></i>
            <h3>일정 관리</h3>
            <p>상담, 수업, 개인 일정까지 한 눈에 쉽고 빠르게</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-user"></i>
            <h3>회원 관리</h3>
            <p>회원 정보부터 퍼스널 레포트 발송까지 회원 관리 A to Z</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-chalkboard-teacher"></i>
            <h3>직원 관리</h3>
            <p>선생님별 피드백 조회부터 역할 설정까지</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-poll"></i>
            <h3>설문지 관리</h3>
            <p>센터별 맞춤 설문지 제작으로 상담 및 수업에 활용</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-ticket-alt"></i>
            <h3>수강권 관리</h3>
            <p>횟수, 유효기간 설정 등 수강권의 형태를 자유롭게</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-clipboard"></i>
            <h3>기록 관리</h3>
            <p>기록에 특화된 기능을 이용해 전문적인 수업 기록</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-trophy"></i>
            <h3>성과 관리</h3>
            <p>성과를 체계적으로 관리하고 분석</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-chart-line"></i>
            <h3>통계 관리</h3>
            <p>데이터 기반으로 통계를 관리하고 분석</p>
          </div>
        </div>
      </section>

      <section className="new-section">
        <h2>운동 도우미</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <i className="fa-solid fa-weight"></i>
            <h3>체중 관리</h3>
            <p>체중 관리</p>
            <p>체조성 기록</p>
            <p>활동 관리</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-utensils"></i>
            <h3>식단 관리</h3>
            <p>식단 짜기</p>
            <p>밀프렙 도우미</p>
            <p>보충제 활용</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-dumbbell"></i>
            <h3>운동 도우미</h3>
            <p>다이어트 도우미</p>
            <p>바디프로필 도우미</p>
            <p>치팅데이 도우미</p>
            <p>유지어트 도우미</p>
            <p>밴딩/로딩</p>
            <p>탄수화물 사이클링</p>
          </div>
          <div className="review-card">
            <i className="fa-solid fa-apple-alt"></i>
            <h3>제품추천</h3>
            <p>보충제</p>
            <p>닭가슴살</p>
          </div>
        </div>
      </section>

      <section className="pricing-plans">
        <h2>구독 결제하기</h2>
        <div className="toggle-switch">
          <button className={`toggle-button ${paymentPlan === 'annual' ? 'active' : ''}`} onClick={() => handleTogglePlan('annual')}>연간결제</button>
          <button className={`toggle-button ${paymentPlan === 'monthly' ? 'active' : ''}`} onClick={() => handleTogglePlan('monthly')}>월간결제</button>
        </div>
        <div className="plans-container">
          <div className="plan-card">
            <div className="plan-header">
              <span>1년 선납 10% 할인</span>
              <h3>실속형 플랜</h3>
            </div>
            <div className="plan-price">
              {paymentPlan === 'annual' ? (
                <>
                  <span>14,300원 / 월</span>
                  <small>총 171,600원</small>
                </>
              ) : (
                <>
                  <span>15,900원 / 월</span>
                  <small>월간 청구</small>
                </>
              )}
            </div>
            <ul className="plan-features">
              <li>일정 관리</li>
              <li>회원 관리</li>
              <li>용량 20GB <span className="unlimited">무제한</span></li>
              <li>알림톡 200건/월 <span className="unlimited">무제한</span></li>
              <li className="disabled">직원 관리 지원 X</li>
            </ul>
          </div>
          <div className="plan-card">
            <div className="plan-header">
              <span>1년 선납 10% 할인</span>
              <h3>올인원 플랜</h3>
            </div>
            <div className="plan-price">
              {paymentPlan === 'annual' ? (
                <>
                  <span>59,300원 / 월</span>
                  <small>총 711,600원</small>
                </>
              ) : (
                <>
                  <span>65,900원 / 월</span>
                  <small>월간 청구</small>
                </>
              )}
            </div>
            <ul className="plan-features">
              <li>일정 관리</li>
              <li>회원 관리</li>
              <li>용량 100GB <span className="unlimited">무제한</span></li>
              <li>알림톡 1000건/월 <span className="unlimited">무제한</span></li>
              <li>직원 관리, 직원수 <span className="unlimited">무제한</span></li>
            </ul>
          </div>
        </div>
        <button className="download-button"><Link to="/Management">무료 체험하기</Link></button>
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