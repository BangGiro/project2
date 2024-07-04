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

const[tabs , setTabs] = useState('기본 정보');
// 탭 전환
    function ChangeMyService(e) {
        let eventTarget = e.target.closest('div');
        setTabs(eventTarget.innerText);
    }

    function renderMyService() {
        if(tabs === '기본 정보') {
            return <MyInfo/>
        } else if(tabs === '구독 정보') {
            return <MySubscribe/>
        } else if(tabs === '문의 내역') {
            return <MyInquiry/>
        } else if(tabs === '결제 내역') {
            return <p> 서비스 준비중입니다 </p>
        } else if(tabs === '회원탈퇴') {
            return <p> 서비스 준비중입니다 </p>
        }
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
                    <div onClick={ChangeMyService}>보안</div>
                </section>

                <div className="renderMyService">
                    {renderMyService()}
                </div>

            </div>
        </div>
    );


}

export default MyPage;