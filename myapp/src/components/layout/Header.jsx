import './Header.css';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";

function Header({ loggedIn, onLogout }) {
    const [userInteracted, setUserInteracted] = useState(false);
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        setVideoSrc(loggedIn ? "/image/header/logout.mp4" : "/image/header/free-animated-icon-login-8717908.mp4");
    }, [loggedIn]);

    useEffect(() => {
        const handleUserInteraction = () => {
            setUserInteracted(true);
            document.removeEventListener('click', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
        };
    }, []);

    const handleMouseOver = (event) => {
        if (userInteracted) {
            event.target.loop = true;
            event.target.play();
        }
    };

    const handleMouseOut = (event) => {
        if (userInteracted) {
            event.target.loop = false;  // 반복을 멈춤
        }
    };

    const handleVideoEnded = (event) => {
        event.target.currentTime = 0;
        event.target.pause();
    };

    const handleVideoClick = () => {
        if (loggedIn) {
            onLogout();
            localStorage.removeItem('user');
            // 로그아웃 처리를 여기에 추가할 수 있습니다.
        }
    };

    return (
        <div className='Header'>
            <header>
                <div className="navbar">
                    <div className="logo">
                        <Link to="/"><img src='/image/Logo.png' alt="logo" /></Link>
                    </div>
                    <ul className="menu">
                        <li>
                            <NavLink to="/Management" activeClassName="active">회원관리</NavLink>
                        </li>
                        <li>
                            <NavLink to="/ExerciseMain" activeClassName="active">운동</NavLink>
                                <ul className="submenu">
                                    <li><NavLink to="/ExerciseMain" activeClassName="active">운동 관리</NavLink></li>
                                    <li><NavLink to="/DietPlanner" activeClassName="active">식단 추천</NavLink></li>
                                    <li><NavLink to="/SleepTracker" activeClassName="active">수면 관리</NavLink></li>
                                </ul>
                            
                        </li>
                        <li>
                            <NavLink to="/CustomerService" activeClassName="active">고객센터</NavLink>
                                <ul className="submenu">
                                    <li>공지사항</li>
                                    <li><NavLink to="/FAQpage" activeClassName="active">FAQ</NavLink></li>
                                    <li><NavLink to="/QnAPage" activeClassName="active">1:1문의</NavLink></li>
                                </ul>
                            
                        </li>
                        <li>
                            <NavLink to="/MyPage" activeClassName="active">MYPAGE</NavLink>
                        </li>
                    </ul>
                    <div className="login_btn">
                        <Link to={loggedIn ? "/" : "/Login"}>
                            <video
                                key={videoSrc}  // 비디오 소스를 변경할 때마다 컴포넌트를 재렌더링
                                src={videoSrc}
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                onEnded={handleVideoEnded}
                                onClick={handleVideoClick}
                                style={{
                                    width: loggedIn ? '2.5vw' : '4.35vw',  // 로그아웃 상태에서 너비를 2.5vw로 설정
                                    marginTop: loggedIn ? '1.5vh' : '0'  // 로그아웃 상태에서 마진 탑을 1.5vh로 설정
                                }}
                            />
                        </Link>
                    </div>
                </div>
                <hr />
            </header>
        </div>
    );
};

export default Header;
