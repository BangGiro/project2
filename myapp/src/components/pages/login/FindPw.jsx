import { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

export default function FindPw() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleBirthChange = (e) => {
        setBirth(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    function CompareLoginData(e) {
        e.preventDefault();

        const CompareLocalLoginData = localStorage.getItem("userData");
        const parsedCompareLocalLoginData = JSON.parse(CompareLocalLoginData) || [];

        // 세 개의 조건을 모두 만족하는 사용자 찾기
        const matchedUser = parsedCompareLocalLoginData.find(user =>
            user.email === email && user.name === name && user.birth === birth
        );

        if (matchedUser) {
            alert("비밀번호는 " + matchedUser.password + " 입니다.");
            navigate("/login");
        } else {
            alert("사용자가 존재하지 않습니다.");
        }
    }

    return (
        <div className="login_true_location-container">
            <div className="login-location-container">
                <div className="login-container">
                    <div className="login_main">
                        <h1>비밀번호 찾기</h1>
                        <form className="login-form" onSubmit={CompareLoginData}>
                            <label>
                                <input type="email" placeholder="이메일 입력" onChange={handleEmailChange} required />
                            </label>
                            <label>
                                <input type="text" placeholder="이름 입력" onChange={handleNameChange} required />
                            </label>
                            <label>생년월일 입력
                                <input type="date" placeholder="생년월일 입력" onChange={handleBirthChange} max="9999-12-31" min="1900-01-01" required />
                            </label>
                            <button type="submit">비밀번호 찾기</button>
                        </form>
                        <div className="login-links">
                            <Link to="/SignUp">회원가입</Link>
                            <Link to="/Login">로그인 화면으로</Link>
                            <Link to="/">Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
