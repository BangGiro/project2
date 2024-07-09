export default function MySubscription() {
    return (
        <section className="MySubscription">
            <h1>구독 정보</h1>

            <div className="MySubscribeBox">

                <div className="CurrentSubscription">
                    <img src="/image/unDrawSVG/undraw_personal_trainer_re_cnua.svg" alt="" />
                    
                    <div className="SubscriptionInfo">
                        <p>트레이너 플랜</p>
                        <span>월 12,900원</span>
                        <ul>
                            <li><i className="fa-solid fa-check"></i>일정 관리</li>
                            <li><i className="fa-solid fa-check"></i>회원 관리</li>
                            <li><i className="fa-solid fa-check"></i>용량 20gb</li>
                            <li><i className="fa-solid fa-xmark"></i>무제한 회원추가</li>
                            <li><i className="fa-solid fa-xmark"></i>직원 관리 지원</li>
                        </ul>
                    </div>
                </div>

                <div className="SubscriptionPayment">
                    <div >
                        <p>다음 결제 예정일: </p>
                        <p>결제 방식:</p>
                    </div>
                </div>
            </div>

        </section>
    )
}