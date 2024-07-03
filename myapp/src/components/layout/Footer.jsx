import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h4>올인원 피트니스</h4>
                        <ul>
                            <li>올인원 문화</li>
                            <li>공동체</li>
                            <li>히스토리</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>뉴스</h4>
                        <ul>
                            <li>기술</li>
                            <li>서비스</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>기술과 서비스</h4>
                        <ul>
                            <li>기술</li>
                            <li>서비스</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>약속과 책임</h4>
                        <ul>
                            <li>ESG</li>
                            <li>소셜임팩트</li>
                            <li>디지털 권리</li>
                            <li>AI 윤리</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>투자정보</h4>
                        <ul>
                            <li>기업지배구조</li>
                            <li>주가정보</li>
                            <li>재무정보</li>
                            <li>IR행사</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>고객 지원</h4>
                        <ul>
                            <li><Link to="/noticePage">공지사항</Link></li>
                            <li><Link to="/FAQpage">FAQ</Link></li>
                            <li><Link to="/QnAPage">1:1문의</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <ul>
                        <li><Link to="/privacyPolicy">개인정보처리방침</Link></li>
                        <li><Link to="/termsOfService">이용약관</Link></li>
                        <li><Link to="/previousTerms">이전약관</Link></li>
                        <li><Link to="/youthProtectionPolicy">청소년보호정책</Link></li>
                        <li><Link to="/brandProtectionPolicy">브랜드보호정책</Link></li>
                        <li><Link to="/report">권리침해신고안내</Link></li>
                        <li><Link to="/announcement">공지사항</Link></li>
                        <li><Link to="/cyberAuditOffice">사이버윤리실</Link></li>
                        <li><Link to="/contactUs">Contact Us</Link></li>
                    </ul>
                    <p>&copy; 올인원 피트니스. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
