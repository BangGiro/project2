import React from 'react';
import Navbar from './Navbar';
import './Legal.css';
function CyberAuditOffice() {
    return (
        <div>
            <Navbar />
            <div className="legal-content">
            <h2>사이버윤리실</h2>
            <ul>
                <li>사이버 윤리의 정의</li>
                <li>사이버 윤리 위반 사례</li>
                <li>사이버 윤리 교육 및 캠페인</li>
                <li>사이버 윤리 신고 절차</li>
            </ul>
        </div>
        </div>
    );
}

export default CyberAuditOffice;
