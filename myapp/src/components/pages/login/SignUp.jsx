import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { apiCall } from "../../../service/apiService";

export default function SignUp() {
    const [userData, setUserData] = useState({
        userId: "",
        password: "",
        confirmPassword: "",
        name: "",
        gender: "",
        loginType: "",
        joinDate: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [duplicateMessage, setDuplicateMessage] = useState("");
    const [signZipCode, setZipCode] = useState("");
    const [signAddress, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const navigate = useNavigate();

    //다음주소 API scropt임포트
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        },[]);

    //다음 주소 api실행코드
    const daumAddrAPI = (e) => {
        e.preventDefault();
        new window.daum.Postcode({ //왜 window붙여야 사용이 되는거지??어렵네
            oncomplete: function(data) {
                setZipCode(data.zonecode);
                setAddress(data.address);
            }
        }).open();
    }

    //비동기 값 변화 일괄 관리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const validatePassword = (password, confirmPassword) => {
        if (password.length < 6) {
            setErrorMessage("비밀번호는 최소 6자 이상이어야 합니다.");
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return false;
        }
        return true;
    };

    //submit 코드
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword(userData.password, userData.confirmPassword)) {
            return;
        }

        setErrorMessage("");

        const newUserData = {
            ...userData,
            joinDate: new Date().toISOString(),
            zipCode: signZipCode,
            address: signAddress
        };

        let uri = "/users/signUp"
        let method = "post";
        const data = newUserData;

        apiCall(uri, method, data, null)
        .then((response) => {
            if(response !=  null) {
                console.log("login axios response 확인 ➡️ "+response.name); //오류테스트 용으로 남겨줄 것
                
                console.log(response);
                alert('회원가입 성공');
            } else {
                alert('회원가입 실패');
            }
        }).catch((err)=>{
            alert('회원가입 실패'+err.message);
            console.log(userData);
        })

        // navigate("/login");
    };

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
                                type="text"
                                name="userId"
                                placeholder="아이디 입력"
                                onChange={handleChange}
                                required
                            />
                            <button type="button" disabled>중복 체크</button>
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
                        <label>전화번호
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="예시) 01011112222"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <div className="addrBox">
                        <label>주소
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="우편번호"
                                value={signZipCode}
                                onClick={daumAddrAPI}
                                readOnly
                            />
                            <button onClick={daumAddrAPI}>우편번호찾기</button>
                            <input
                                type="text"
                                name="address"
                                className="address"
                                placeholder="주소"
                                value={signAddress}
                                readOnly
                            />
                            <input
                                type="text"
                                className="detailAddress"
                                placeholder="상세주소"
                                name="detailAddress"
                                onChange={handleChange}
                            />
                        </label>
                        </div>
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
                                name="memberType"
                                value={userData.memberType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">선택하세요</option>
                                <option value="일반">일반</option>
                                <option value="트레이너">트레이너</option>
                            </select>
                        </label>
                        <button type="submit">회원가입</button>
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
}//signUP
