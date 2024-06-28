// src/components/login/SignUp.jsx

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function SignUp() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        birth: "",
        gender: "",
        loginType: "",
        businessNumber: "",
        time: "",
        trainer: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [duplicateMessage, setDuplicateMessage] = useState("");
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === "email") {
            setIsEmailChecked(false);
            setDuplicateMessage("");
        }
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailCheck = () => {
        if (!validateEmail(userData.email)) {
            setDuplicateMessage("유효한 이메일 주소를 입력하세요.");
            setIsEmailChecked(false);
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
        const isDuplicate = storedUsers.some(user => user.email === userData.email);
        if (isDuplicate) {
            setDuplicateMessage("이미 사용중인 이메일입니다.");
            setIsEmailChecked(false);
        } else {
            setDuplicateMessage("사용 가능한 이메일입니다.");
            setIsEmailChecked(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(userData.email)) {
            setErrorMessage("유효한 이메일 주소를 입력하세요.");
            return;
        }
        if (userData.password.length < 6) {
            setErrorMessage("비밀번호는 최소 6자 이상이어야 합니다.");
            return;
        }
        if (userData.password !== userData.confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (userData.loginType === "비지니스" && !userData.businessNumber) {
            setErrorMessage("사업자 번호를 입력하세요.");
            return;
        }
        setErrorMessage("");

        const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
        const isDuplicate = storedUsers.some(user => user.email === userData.email);
        if (isDuplicate) {
            setErrorMessage("이미 사용중인 이메일입니다.");
            return;
        }

        const updatedUsers = [...storedUsers, userData];
        localStorage.setItem("userData", JSON.stringify(updatedUsers));

        navigate("/login");
    };

    useEffect(() => {
        const createDummyUsers = (count) => {
            const dummyUsers = [];
            const names = ["folder"];
            const domains = ["test.com"];
            const genders = ["남자", "여자"];
            const loginTypes = ["일반", "트레이너", "비지니스"];

            for (let i = 0; i < count; i++) {
                const randomName = names[Math.floor(Math.random() * names.length)];
                const randomEmail = `${randomName}${i}@${domains[Math.floor(Math.random() * domains.length)]}`;
                const randomGender = genders[Math.floor(Math.random() * genders.length)];
                const randomLoginType = loginTypes[Math.floor(Math.random() * loginTypes.length)];
                const randomBirth = `19${Math.floor(Math.random() * 50) + 50}-01-01`;
                const randomBusinessNumber = randomLoginType === "비지니스" ? `123-45-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` : "";

                dummyUsers.push({
                    email: randomEmail,
                    password: "password",
                    confirmPassword: "password",
                    name: randomName,
                    birth: randomBirth,
                    gender: randomGender,
                    loginType: randomLoginType,
                    businessNumber: randomBusinessNumber,
                    time: "",
                    trainer: "",
                });
            }

            return dummyUsers;
        };

        const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
        if (storedUsers.length === 0) {
            const dummyUsers = createDummyUsers(50);
            localStorage.setItem("userData", JSON.stringify(dummyUsers));
        }
    }, []);

    return (
        <div className="login_true_location-container">
            <div className="login-location-container">
                <div className="login-container">
                    <h1>회원가입</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {duplicateMessage && <p className="duplicate-message">{duplicateMessage}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="email"
                                name="email"
                                placeholder="이메일 입력"
                                value={userData.email}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" onClick={handleEmailCheck}>중복 체크</button>
                        </label>
                        <label>
                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호 입력 (6 ~ 15자리)"
                                value={userData.password}
                                onChange={handleChange}
                                maxLength={15}
                                minLength={6}
                                required
                            />
                        </label>
                        <label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="비밀번호 확인 (6 ~ 15자리)"
                                value={userData.confirmPassword}
                                onChange={handleChange}
                                maxLength={15}
                                minLength={6}
                                required
                            />
                        </label>
                        <label>
                            <input
                                type="text"
                                name="name"
                                placeholder="이름 입력"
                                value={userData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>생년월일
                            <input
                                type="date"
                                name="birth"
                                value={userData.birth}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <div>성별</div>
                        <div className="select_gender">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="남자"
                                checked={userData.gender === "남자"}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="male" className={userData.gender === "남자" ? "active" : ""}>남자</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="여자"
                                checked={userData.gender === "여자"}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="female" className={userData.gender === "여자" ? "active" : ""}>여자</label>
                        </div>
                        <div>회원 유형 선택</div>
                        <label>
                            <select
                                name="loginType"
                                value={userData.loginType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">선택하세요</option>
                                <option value="일반">일반</option>
                                <option value="트레이너">트레이너</option>
                                <option value="비지니스">비지니스</option>
                            </select>
                        </label>
                        {userData.loginType === "비지니스" && (
                            <label>
                                <input
                                    type="text"
                                    name="businessNumber"
                                    placeholder="사업자 번호 입력"
                                    value={userData.businessNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        )}
                        <button type="submit" disabled={!isEmailChecked}>회원가입</button>
                    </form>
                    <div className="login-links">
                        <Link to="/login">로그인 화면으로</Link>
                        <Link to="/findPw">비밀번호 찾기</Link>
                        <Link to="/">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
