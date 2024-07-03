import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="legalNavbar">
            <ul>
                <li>
                    <NavLink 
                        to="/privacyPolicy" 
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        개인정보 처리방침
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/termsOfService" 
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        이용약관
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/previousTerms" 
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        이전약관
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/youthProtectionPolicy" 
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        청소년보호정책
                    </NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink 
                        to="/brandProtectionPolicy" 
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        브랜드보호정책
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/report" 
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        권리침해신고안내
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/announcement" 
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        공지사항
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/cyberAuditOffice" 
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        사이버윤리실
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contactUs" 
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        Contact Us
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
