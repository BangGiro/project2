import React from 'react';
import Navbar from './Navbar';
import './Legal.css';
function Announcement() {
    return (
        <div>
        <Navbar />
        <div className="legal-content">
            <h2>공지사항</h2>
            <ul>
                <li>2024년 1월 1일 - 서비스 업데이트 안내</li>
                <li>2024년 2월 15일 - 개인정보처리방침 변경 안내</li>
                <li>2024년 3월 10일 - 서버 점검 안내</li>
            </ul>
        </div>
    </div>
    );
}

export default Announcement;
