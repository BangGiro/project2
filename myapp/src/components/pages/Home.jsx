import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
  useEffect(() => {
    const challenges = document.querySelector('.challenges');
    challenges.classList.add('invisible');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('invisible');
          entry.target.classList.add('slide-in');
        }
      });
    }, {
      threshold: 0.2
    });

    observer.observe(challenges);

    return () => {
      observer.unobserve(challenges);
    };
  }, []);

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-text">
          <h1>더 이상 쉬워지지 않습니다.<br/> 당신이 더 나아질 뿐입니다.</h1>
          <button>모든 챌린지 보기</button>
        </div>
        <img src="/image/home/background.webp" alt="Hero" className="hero-image" />
        <section className="training-club">
        <div className="challenges invisible">
          <div className="challenge-card">
            <img src="/image/home/01.jpg" alt="Core & Abs Challenge" />
            <div className="challenge-info">
              <h3>코어 & 복근 챌린지</h3>
              <p>참가자 3명</p>
              <p>무료</p>
              <button>참여하기</button>
            </div>
          </div>
          <div className="challenge-card">
            <img src="/image/home/02.jpg" alt="Upper Body Challenge" />
            <div className="challenge-info">
              <h3>상체 챌린지</h3>
              <p>참가자 1명</p>
              <p>무료</p>
              <button>참여하기</button>
            </div>
          </div>
          <div className="challenge-card">
            <img src="/image/home/03.jpg" alt="Movement Challenge" />
            <div className="challenge-info">
              <h3>움직임 챌린지</h3>
              <p>참가자 1명</p>
              <p>무료</p>
              <button>참여하기</button>
            </div>
          </div>
        </div>
      </section>
      </section>

      
    </div>
  );
};

export default Home;