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
                        <span>정기 결제 수단</span>
                        <p>카드 결제</p>
                    </div>
                </div>
            </div>
                <button className="CancelSubscription">
                        구독해지
                </button>
        </section>
    )
}