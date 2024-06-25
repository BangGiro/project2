import './Header.css';
import React from 'react';
import {Link} from "react-router-dom";
function Header(){
    return(
        <header>
            <div className="navbar">
                <div className="logo"><Link to="/"><img src='../../image/Logo.png' /></Link>
                </div>
                <ul className="menu">
                    <Link to ="/ManagementMain"><li>회원관리
                        <ul className="submenu">
                        </ul>
                    </li></Link>

                    <li>운동
                        <ul className="submenu">
                            <Link to ="/exercise/ExerciseMain"><li>운동 관리</li></Link>
                            <Link to="/DietPlanner"><li>식단 관리</li></Link>
                            <Link to= "/DietPlannerSelf"><li>수면 관리</li></Link>
                        </ul>
                    </li>

                    
                    <li>MYPAGE
                        <ul className="submenu">
                            <li>서브메뉴7</li>
                            <li>서브메뉴8</li>
                            <li>서브메뉴9</li>
                        </ul>
                    </li>
                    
                    <li>고객센터
                        <ul className="submenu">
                            <Link to ="/faqPage/FAQpage"><li>FAQ</li></Link>
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
                <div className="login_btn"><i className="fa-regular fa-circle-user"></i></div>
            </div>
            <hr/>
        </header>
    );
};

export default Header;