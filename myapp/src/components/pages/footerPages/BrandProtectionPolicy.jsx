import React from 'react';
import Navbar from './Navbar';
import './Legal.css';
function BrandProtectionPolicy() {
    return (
        <div>
        <Navbar />
        <div className="legal-content">
            <h2>브랜드보호정책</h2>
            <ul>
                <li>브랜드 로고 및 이름 사용 규정</li>
                <li>브랜드 가치 훼손 방지 방법</li>
                <li>브랜드 보호를 위한 법적 조치</li>
                <li>브랜드 관리 및 모니터링 절차</li>
            </ul>
        </div>
        </div>
    );
}

export default BrandProtectionPolicy;
