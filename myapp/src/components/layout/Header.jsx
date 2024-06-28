import './Header.css';
import React from 'react';
import { Link } from "react-router-dom";

function Header() {
    const handleMouseOver = (event) => {
        event.target.play();
    };

    const handleMouseOut = (event) => {
        event.target.pause();
        event.target.currentTime = 0; // 비디오를 처음으로 되돌립니다.
    };

    return (
        <div className='Header'>
            <header>
                <div className="navbar">
                    <div className="logo">
                        <Link to="/"><img src='../../image/Logo.png' alt="logo" /></Link>
                    </div>
                    <ul className="menu">
                        <li>
                            <Link to="/Management">회원관리
                                <ul className="submenu"></ul>
                            </Link>
                        </li>
                        <li>
                            <Link to="/ExerciseMain">운동
                                <ul className="submenu">
                                    <li><Link to="/ExerciseMain">운동 관리</Link></li>
                                    <li><Link to="/DietPlanner">식단 추천</Link></li>
                                    <li><Link to="/SleepTracker">수면 관리</Link></li>
                                </ul>
                            </Link>
                        </li>
                        <li>
                            MYPAGE
                            <ul className="submenu">
                                <li>서브메뉴7</li>
                                <li>서브메뉴8</li>
                                <li>서브메뉴9</li>
                            </ul>
                        </li>
                        <li>
                            고객센터
                            <ul className="submenu">
                                <li>공지사항</li>
                                <li><Link to="/FAQpage">FAQ</Link></li>
                                <li>1:1문의</li>
                            </ul>
                        </li>
                    </ul>
                    <div className="login_btn">
                        <Link to={"/Login"}>
                            <video
                                loop
                                src="/image/header/free-animated-icon-login-8717908.mp4"
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
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
