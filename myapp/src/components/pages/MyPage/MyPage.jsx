import { useEffect } from "react";




const MyPage = () => {
//=================================================================================================
// 데이터 불러오기 파트

    useEffect(() => {
        let userData = localStorage.getItem('userData');
        const parsedUserData = JSON.parse(userData);
    }, []);
    
    let myData ;

    
//=================================================================================================
// 렌더링 파트
    return (
        <div className="MyPage">
            <h1>My Page</h1>
            <div>
                <section className="MyService">
                    <div>기본 정보</div>
                    <div>구독 정보</div>
                    <div>문의 내역</div>
                    <div>결제 내역</div>
                    <div>회원탈퇴</div>
                </section>
            </div>
        </div>
    );


}

export default MyPage;