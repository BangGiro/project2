export default function MySubscription() {
    return (
        <section className="MySubscription">
            <h1>구독 정보</h1>
            <div className="MySubscribeBox">
                <div className="CurrentSubscription">
                    <p> 트레이너 (개인용)</p>
                </div>
                <div>
                    <span>구독 기간</span>
                    <p>2021.04.23 ~ 2022.04.23</p>
                </div>
                <div className="SubscriptionPayment">
                    <div>
                        <span>결제 금액</span>
                        <p>10,000원</p>
                    </div>
                    <div >
                        <span>결제 방법</span>
                        <p>카드 결제</p>
                    </div>
                </div>
                <button className="CancelSubscription">
                    구독해지
                </button>

            </div>
        </section>
    )
}