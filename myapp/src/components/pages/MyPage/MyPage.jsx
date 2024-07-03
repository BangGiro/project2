import { useEffect , useState } from "react";
import './MyPage.css';
import MyInfo from "./components/MyInfo";
import MySubscribe from "./components/MySubscription";



const MyPage = () => {
//=================================================================================================
// 데이터 불러오기 파트

//=================================================================================================
// 이벤트 핸들러

// 탭 전환
    function ChangeMyService(e) {
        let eventTarget = e.target.closest('div');
        let tabs = eventTarget.innerText;
    }
    
//=================================================================================================
// 렌더링 파트
    return (
        <div className="MyPage">
            <h1>My Page</h1>
            <div>
                <section className="MyService" onClick={ChangeMyService}>
                    <div>기본 정보</div>
                    <div>구독 정보</div>
                    <div>문의 내역</div>
                    <div>결제 내역</div>
                    <div>회원탈퇴</div>
                </section>

                <div className="renderMyService">
                    <MyInfo/>
                    <MySubscribe/>
                    
                </div>

            </div>
        </div>
    );


}

export default MyPage;