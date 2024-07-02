import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer>
            <hr />
            <div className="footer-content">
                <div className="company-info">
                    <h4>회사 정보</h4>
                    <p><strong>상호명:</strong> 피트니스 올인원</p>
                    <p><strong>사업자등록번호:</strong> 123-45-67890</p>
                    <p><strong>주소:</strong>Silicon Valley</p>
                    <p><strong>전화번호:</strong> 02-1234-5678</p>
                </div>
                <div className="site-map">
                    <h4>사이트 맵</h4>
                    <ul>
                        <li><Link to="/">홈</Link></li>
                        <li>회사 소개</li>
                        <li>서비스</li>
                    </ul>
                </div>
                <div className="customer-support">
                    <h4>고객 지원</h4>
                    <ul>
                        <li><Link to="/noticePage">공지사항</Link></li>
                        <li><Link to="/FAQpage">FAQ</Link></li>
                        <li><Link to="/QnAPage">1:1문의</Link></li>
                    </ul>
                </div>
                <div className="legal-info">
                    <h4>법적 고지</h4>
                    <ul>
                        <li><Link to="/privacyPolicy">개인정보 처리방침</Link></li>
                        <li><Link to="/termsOfService">이용약관</Link></li>
                        <li><Link to="/previousTerms">이전약관</Link></li>
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
