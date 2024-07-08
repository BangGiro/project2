import React from 'react';
import Navbar from './Navbar';
import './Legal.css';
function ContactUs() {
    return (
        <div>
            <Navbar />
            <div className="legal-content">
            <h2>Contact Us</h2>
            <ul>
                <li>이메일: support@company.com</li>
                <li>전화번호: 02-1234-5678</li>
                <li>주소: Silicon Valley, CA</li>
            </ul>
            <h2>문의 양식</h2>
            <form>
                <label>
                    이름:
                    <input type="text" name="name" />
                </label>
                <label>
                    이메일:
                    <input type="email" name="email" />
                </label>
                <label>
                    메시지:
                    <textarea className="reSize" name="message"></textarea>
                </label>
                <button type="submit">제출</button>
            </form>
        </div>
        </div>
    );
}

export default ContactUs;
