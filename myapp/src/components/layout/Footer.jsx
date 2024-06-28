import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <hr />
            <div className="footer-content">
                <div className="company-info">
                    <h4>회사 정보</h4>
                    <p><strong>상호명:</strong> ABC 주식회사</p>
                    <p><strong>사업자등록번호:</strong> 123-45-67890</p>
                    <p><strong>주소:</strong> 서울특별시 강남구 가로수길 1234</p>
                    <p><strong>전화번호:</strong> 02-1234-5678</p>
                </div>
                <div className="site-map">
                    <h4>사이트 맵</h4>
                    <ul>
                        <li>홈</li>
                        <li>회사 소개</li>
                        <li>서비스</li>
                        <li>문의하기</li>
                    </ul>
                </div>
                <div className="customer-support">
                    <h4>고객 지원</h4>
                    <ul>
                        <li>FAQ</li>
                        <li>고객 지원</li>
                        <li>피드백</li>
                    </ul>
                </div>
                <div className="legal-info">
                    <h4>법적 고지</h4>
                    <ul>
                        <li>개인정보 처리방침</li>
                        <li>이용약관</li>
                    </ul>
                </div>
                <div className="social-media">
                    <h4>소셜 미디어</h4>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/image/footer/facebook.png" alt="Facebook" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="/image/footer/twitter.png" alt="Twitter" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/image/footer/instagram.png" alt="Instagram" />
                    </a>
                </div>
            </div>
            <div className="copyright">
                &copy; 2024 ABC 주식회사. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
