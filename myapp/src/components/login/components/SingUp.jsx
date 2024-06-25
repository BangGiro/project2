import { useState } from "react";
import "./SignUp.css";

export default function SignUp() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        birth: "",
        gender: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    console.log(userData);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("회원가입 완료");
        console.log(userData);
        localStorage.setItem("userData", JSON.stringify(userData));

        let data = localStorage.getItem("userData");
        console.log(JSON.parse(data));
    }

    return (
        <div className="su-location-container">
            
                <div className="su-container">
                    <h1>회원가입</h1>
                    <form className="su-form">
                        <label>
                            <input type="email" name="email" placeholder="이메일 입력" value={userData.email} onChange={handleChange} required/>
                        </label>
                        <label>
                            <input type="password" name="password" placeholder="비밀번호 입력" value={userData.password} onChange={handleChange} required/>
                        </label>
                        <label>
                            <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={userData.confirmPassword} onChange={handleChange} required />
                        </label>
                        <label>
                            <input type="text" name="name" placeholder="이름 입력" value={userData.name} onChange={handleChange} required/>
                        </label>
                        <label>생년월일
                            <input type="date" name="birth" placeholder="생년월일 ex)2000.01.01" value={userData.birth} onChange={handleChange} required />
                        </label>
                        <label>성별
                            <input type="radio" name="gender" value="남자" checked={userData.gender === "남자"} onChange={handleChange} /> 남자
                            <input type="radio" name="gender" value="여자" checked={userData.gender === "여자"} onChange={handleChange} /> 여자
                        </label>
                        <label>회원 유형 선택
                            <select name="member-species" id="member-species" required>
                                <option value="일반">일반</option>
                                <option value="트레이너">트레이너</option>
                                <option value="비지니스">비지니스</option>
                            </select>
                        </label>
                        <button type="submit" onClick={handleSubmit}>회원가입</button>
                    </form>
                </div>
        </div>
    );
}