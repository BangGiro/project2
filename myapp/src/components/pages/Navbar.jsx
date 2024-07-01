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
            </ul>
        </nav>
    );
}

export default Navbar;
