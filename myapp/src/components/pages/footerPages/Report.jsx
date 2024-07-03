import React from 'react';
import Navbar from './Navbar';
import './Legal.css';
function Report() {
    return (
        <div>
            <Navbar />
            <div className="legal-content">
            <h2>권리침해신고안내</h2>
            <ul>
                <li>권리 침해의 정의 및 유형</li>
                <li>권리 침해 신고 절차</li>
                <li>신고 후 처리 절차</li>
                <li>권리 보호를 위한 지원 방안</li>
            </ul>
        </div>
        </div>
    );
}

export default Report;
