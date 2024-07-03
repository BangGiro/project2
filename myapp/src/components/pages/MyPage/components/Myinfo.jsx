import React, { useState, useEffect } from 'react';


export default function MyInfo() {
    //===============================================================================
    // 데이터 불러오기 파트
    const [MyData, setMyData] = useState(null);

    useEffect(() => {
        let userData = localStorage.getItem('user');
        if(userData) {
            setMyData (JSON.parse(userData));
        }
    }, []);
    //===============================================================================

    return (
        <div className="MyInfo">
            <h1>내 정보</h1>

            <section className="MyInfoBox">
                <div className="MyProfile"></div>
                <div className="MyInfoList">
                    <div>
                        <span>이름</span>
                        <p>{MyData ? MyData.name : ''}</p> 
                        {/* 비동기 방어코드 필수!! */}
                    </div>
                    <div>
                        <span>이메일</span>
                        <p>{MyData ? MyData.email : ''}</p>
                    </div>
                    <div>
                        <span>가입일</span>
                        <p>2021.04.23</p>
                    </div>
                    <div>
                        <span>회원 타입</span>
                        <p>{MyData ? MyData.loginType : ''}</p>
                    </div>
                </div>
            </section>    
        </div>
    )

}