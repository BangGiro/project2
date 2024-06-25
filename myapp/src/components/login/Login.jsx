import { Link } from "react-router-dom";
import { useState } from "react";
import './Login.css';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    function CompareLoginData(e) {
        e.preventDefault();

        const CompareLocalLoginData = localStorage.getItem("userData");
        const parsedCompareLocalLoginData = JSON.parse(CompareLocalLoginData);
        const parsedEmail = parsedCompareLocalLoginData.email;
        const parsedPassword = parsedCompareLocalLoginData.password;

        if (email === parsedEmail && password === parsedPassword) {
            <Link to="/management" />
        } else {
            alert("이메일 또는 비밀번호를 다시 확인해주세요.");
        }

    }

    return (
        <div className="login-location-container">
            <div className="login-container">
                <h1>로그인</h1>
                <form className="login-form">
                    <label>
                        <input type="email" placeholder="이메일 입력" onChange={handleEmailChange} required />
                    </label>
                    <label>
                        <input type="password" placeholder="비밀번호 입력" onChange={handlePasswordChange} required />
                    </label>
                    <button type="submit" onClick={CompareLoginData}>로그인</button>
                </form>
                <Link to="/SignUp">회원가입</Link>
                <Link to="/find-id">아이디 찾기</Link>
            </div>
        </div>
    );
}