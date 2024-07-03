import { useEffect , useState } from "react";
import './MyPage.css';
import MyInfo from "./components/Myinfo";
import MySubscribe from "./components/MySubscription";
import MyInquiry from "./components/MyInquiry";



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
                    <div onClick={ChangeMyService}>기본 정보</div>
                    <div onClick={ChangeMyService}>구독 정보</div>
                    <div onClick={ChangeMyService}>문의 내역</div>
                    <div onClick={ChangeMyService}>결제 내역</div>
                    <div onClick={ChangeMyService}>회원탈퇴</div>
                </section>

                <div className="renderMyService">
                    <MyInfo/>
                    <MySubscribe/>
                    <MyInquiry/>
                </div>

            </div>
        </div>
    );


}

export default MyPage;