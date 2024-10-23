import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { apiCall } from "../../../service/apiService";
import { useLocation } from 'react-router-dom';

export default function SignUp() {
    const [userData, setUserData] = useState({
        userId: "",
        password: "",
        name: "",
        gender: "",
        loginType: "",
        joinDate: ""
    });
    
    const location = useLocation();
    const isAdd = location.state;
    const [errorMessage, setErrorMessage] = useState("");
    const [duplicateMessage, setDuplicateMessage] = useState("");
    const [signZipCode, setZipCode] = useState("");
    const [signAddress, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
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

    //회원추가에서 올 때
    useEffect(()=>{
        setUserData(prevState => ({
            ...prevState,
            memberType: '일반'
        }));

    },[isAdd])


    //에러메세지 일괄 관리
    const handleErrorMessage = (name , message) => {
        setErrorMessage (prevState => ({
            ...prevState,
            [name]: [message]
        }))
    }

    //아이디 검증
    const validateUserId = async () => { //submit을 위한 비동기 처리(어렵다)
        let userId = userData.userId;
        let uri = `/users/${userId}`;
        let result = false

        apiCall(uri,'get',null,null)
        .then((response)=>{
            if(response.userId != null) {
                handleErrorMessage('userId','이미 존재하는 아이디 입니다');
            } else {
                handleErrorMessage('userId', "사용가능한 아이디 입니다");
                result = true;
            }    
        }).catch((err)=>{
                alert("오류. 관리자에게 문의하세요")
        });

        return result;
    }

    //비밀번호 검증
    const validatePassword = () => {
        let password = userData.password;
        let result = false;

        if (password.length < 6) {
            handleErrorMessage('password',"비밀번호는 최소 6자 이상이어야 합니다.");
        } else if (!(/^(?=.*[a-zA-Z])(?=.*[0-9])/).test(password)) {
            handleErrorMessage('password',"비밀번호는 영문자+숫자 조합이어야 합니다.");
        } else {
            handleErrorMessage('password',"");
            result = true;
        }
        return result;
    };

    const validatePassword2 = () => {
        let result = false;

        if (userData.password !== userData.confirmPassword) {
            handleErrorMessage(`confirmPassword`,"비밀번호가 일치하지 않습니다.");
        } else {
            handleErrorMessage(`confirmPassword`,"");
            result = true;
        }

        return result;
    }
    

    //전화번호 검증 및 자동완성
    const validatePhoneNum = () => {
        let phoneNum = userData.phoneNumber;
        let result = false;

        if(phoneNum) {
            if(!phoneNum.includes('-')){
                phoneNum = phoneNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            } else {
                phoneNum = phoneNum.replace(/-+/g,'-');
            }
    
            if(phoneNum?.length != 13) {
                handleErrorMessage(`phoneNumber`,"전화번호를 확인해주세요")
            } else {
                setErrorMessage(`phoneNumber`,"")
                setUserData(prevState => ({
                    ...prevState,
                    phoneNumber : phoneNum
                }));
                result = true;
            }
        }

        return result;
    }

    //submit 코드
    const handleSubmit = (e) => {
        e.preventDefault();

        const newUserData = {
            ...userData,
            joinDate: new Date().toISOString(),
            zipCode: signZipCode,
            address: signAddress
        };

        if(validatePhoneNum() && validatePassword() && validatePassword2() && validateUserId() ) {
            setErrorMessage("");
        } else {
            alert("항목을 다시 확인하세요");
            return;
        }

        let uri = "/users/signUp"
        let method = "post";
        const data = newUserData;

        apiCall(uri, method, data, null)
        .then((response) => {
            if(response !=  null) {
                alert('회원가입 성공');
            } else {
                alert('회원가입 실패');
            }
        }).catch((err)=>{
            alert('회원가입 실패'+err.message);
            console.log(userData);
        })
        if(isAdd) navigate("/management")
        else navigate("/login");
    };

    return (
        <div className="login_true_location-container">
            <div className="login-location-container">
                <div className="signUp-container">
                    <h1>회원가입</h1>
                    {duplicateMessage && <p className="duplicate-message">{duplicateMessage}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>회원 유형 선택
                            {isAdd ?  <p> 일반 회원 </p> :
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
                            }
                        </label>
                        <label>아이디
                            {errorMessage && <p className="SignErrorMessage">{errorMessage.userId}</p>}
                            <input
                                type="text"
                                className="userId"
                                name="userId"
                                placeholder="아이디 입력"
                                onChange={handleChange}
                                required
                            />
                            <button type="button" onClick={validateUserId}>중복 체크</button>
                        </label>
                        <label>비밀번호
                            {errorMessage && <p className="SignErrorMessage">{errorMessage.password}</p>}
                            <input
                                type="password"
                                className="password"
                                name="password"
                                placeholder="비밀번호 입력 (6 ~ 15자리)"
                                value={userData.password}
                                onChange={handleChange}
                                onBlur={validatePassword}
                                maxLength={15}
                                minLength={6}
                                required
                            />
                        </label>
                        <label>비밀번호 확인
                            {errorMessage && <p className="SignErrorMessage">{errorMessage.confirmPassword}</p>}
                            <input
                                type="password"
                                className="confirmPassword"
                                name="confirmPassword"
                                placeholder="비밀번호 확인 (6 ~ 15자리)"
                                onChange={handleChange}
                                onBlur={validatePassword2}
                                maxLength={15}
                                minLength={6}
                                required
                            />
                        </label>
                        <label>*이름
                            <input
                                type="text"
                                name="name"
                                placeholder="이름 입력"
                                value={userData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>*전화번호
                        {errorMessage && <p className="SignErrorMessage">{errorMessage.phoneNumber}</p>}
                            <input
                                type="text"
                                name="phoneNumber"
                                className="phoneNumber"
                                placeholder="예시) 01011112222"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                                onBlur={validatePhoneNum}
                                required
                            />
                        </label>
                        <div className="addrBox">
                        <label>주소
                            <input
                                type="text"
                                name="address"
                                className="address"
                                placeholder="주소"
                                value={signAddress}
                                onClick={daumAddrAPI}
                            />
                            <button onClick={daumAddrAPI}>주소찾기</button>
                        </label>
                        <label>우편번호
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="우편번호"
                                value={signZipCode}
                                onClick={daumAddrAPI}
                            />
                        </label>
                        <label>상세주소
                            <input
                                type="text"
                                className="detailAddress"
                                placeholder="상세주소"
                                name="detailAddress"
                                onChange={handleChange}
                            />
                        </label>
                        </div>
                        
                        <div className="select_gender">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="남성"
                                checked={userData.gender === "남성"}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="male" className={userData.gender === "남자" ? "active" : ""}>남자</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="여성"
                                checked={userData.gender === "여성"}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="female" className={userData.gender === "여자" ? "active" : ""}>여자</label>
                        </div>
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
