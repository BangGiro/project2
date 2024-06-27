import { useState } from 'react';
import '../Login.css'
import { Link, useNavigate } from 'react-router-dom';

export default function FindPw() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    function CompareLoginData(e) {
        e.preventDefault();

        const CompareLocalLoginData = localStorage.getItem("userData");
        const parsedCompareLocalLoginData = JSON.parse(CompareLocalLoginData);
        const parsedEmail = parsedCompareLocalLoginData.email;
        const parsedPassword = parsedCompareLocalLoginData.password;


        if (email === parsedEmail) {
            alert("비밀번호는 " + parsedPassword + " 입니다.");
            navigate("/login");
        } else {
            alert("존재하지 않는 이메일입니다.");
        }

    }

    return (
        <div className="login_true_location-container" >
            <div className="login-location-container">
                <div className="login-container">
                    <div className="login_main">
                        <h1>비밀번호 찾기</h1>
                        <form className="login-form">
                            <label>
                                <input type="email" placeholder="이메일 입력" onChange={handleEmailChange} required />
                            </label>
                            <button type="submit" onClick={CompareLoginData}>비밀번호 찾기</button>
                        </form>
                        <div className="login-links">
                        <Link to="/SignUp">회원가입</Link>
                        <Link to="/Login">로그인 화면으로</Link>
                        <Link to="/">Home</Link>
                    </div>
                    </div>
                </div>
            </div>
        </div >
    );
}