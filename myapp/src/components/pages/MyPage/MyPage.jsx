import { useEffect , useState } from "react";
import './MyPage.css';
import MyInfo from "./components/Myinfo";
import MySubscribe from "./components/MySubscription";
import MyInquiry from "./components/MyInquiry";
import MySecurity from "./components/MySecurity";



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
        } else if(tabs === '보안') {
            return <MySecurity/>
        }
    }     
//=================================================================================================
// 렌더링 파트
    return (
        <div className="MyPage">

            <div >
                <section className="MyService" onClick={ChangeMyService}>
                    <div onClick={ChangeMyService}><i className="fa-regular fa-user"></i><p>기본 정보</p></div>
                    <div onClick={ChangeMyService}><i className="fa-regular fa-id-card"></i><p>구독 정보</p></div>
                    <div onClick={ChangeMyService}><i className="fa-solid fa-table-list"></i><p>문의 내역</p></div>
                    <div onClick={ChangeMyService}><i className="fa-solid fa-lock"></i><p>보안</p></div>
                </section>

                <div className="renderMyService">
                    {renderMyService()}
                </div>

            </div>
        </div>
    );


}

export default MyPage;