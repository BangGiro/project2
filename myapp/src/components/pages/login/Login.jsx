// src/components/login/Login.jsx

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Login.css';
import { apiCall } from "../../../service/apiService";
import { loginUser } from '../helpers/auth';

export default function Login({ onLogin }) {
    const [userId, setUserID] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const handleUserIdChange = (e) => {
        setUserID(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    };

    // 로그인 전송 & 처리
    function SubmitLogin(userId, userPassword) {
        let uri = "/users/login"
        let method = "post";
        const data = {userId:userId, password:userPassword};

        apiCall(uri, method, data, null)
        .then((response) => {
            if(response !=  null) {
                const temp = JSON.stringify(response); //axios여도 json파싱필수
                console.log("login axios response 확인 ➡️ "+response.userId); //오류테스트 용으로 남겨줄 것

                sessionStorage.setItem("loginInfo",JSON.stringify(response));
                alert('로그인 성공');
                navigate("/");
            } else {
                alert('로그인 실패');
            }
        }).catch((err)=>{
            alert('로그인 실패'+err.message);
        })
    };

    return (
        <div className="login_true_location-container">
            <div className="login-location-container">
                <div className="login-container">
                    <div className="login_main">
                        <h1>로그인</h1>
                        <form className="login-form" onSubmit={ (e) => {
                            e.preventDefault();
                            SubmitLogin(userId, userPassword);
                        }}>
                            <label>
                                <input type="text" placeholder="아이디 입력" onChange={handleUserIdChange} required />
                            </label>
                            <label>
                                <input type="password" placeholder="비밀번호 입력" onChange={handlePasswordChange} required />
                            </label>
                            <button type="submit" className="loginBtn">로그인</button>
                        </form>
                    </div>
                    <div className="login-links">
                        <Link to="/signUp">회원가입</Link>
                        <Link to="/findPw">비밀번호 찾기</Link>
                        <Link to="/">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
