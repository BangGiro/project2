import './Header.css';
import React from 'react';
import { Link } from "react-router-dom";
function Header() {
    return (
        <div className='Header'>
            <header>
                <div className="navbar">
                    <div className="logo"><Link to="/"><img src='../../image/Logo.png' /></Link>
                    </div>
                    <ul className="menu">
                        <li><Link to="/Management">회원관리
                            <ul className="submenu">
                            </ul>
                            </Link></li>

                        <li><Link to="/ExerciseMain">운동
                            <ul className="submenu">
                                <Link to="/ExerciseMain"><li>운동 관리</li></Link>
                                <Link to="/DietPlanner"><li>식단 추천</li></Link>
                                <Link to="/SleepTracker"><li>수면 관리</li></Link>
                            </ul>
                        </Link></li>


                        <li>MYPAGE
                            <ul className="submenu">
                                <li>서브메뉴7</li>
                                <li>서브메뉴8</li>
                                <li>서브메뉴9</li>
                            </ul>
                        </li>

                        <li>고객센터
                            <ul className="submenu">
                                <Link to="/FAQpage"><li>FAQ</li></Link>
                                <li>서브메뉴11</li>
                                <li>서브메뉴12</li>
                            </ul>
                        </li>

                        <li>메뉴5
                            <ul className="submenu">
                                <li>서브메뉴13</li>
                                <li>서브메뉴14</li>
                                <li>서브메뉴15</li>
                            </ul>
                        </li>
                    </ul>

                    <div className="login_btn"><Link to={"/Login"}><i className="fa-regular fa-circle-user"></i></Link></div>

                </div>
                <hr />
            </header>
        </div>
    );
};

export default Header;