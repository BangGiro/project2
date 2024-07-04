export default function MySubscription() {
    return (
        <section className="MySubscription">
            <h1>구독 정보</h1>

            <div className="MySubscribeBox">
                <h2>
                    구독중인 상품
                </h2>

                <div className="CurrentSubscription">
                    <img src="/image/unDrawSVG/undraw_personal_trainer_re_cnua.svg" alt="" />
                </div>

                <div>
                    <span>구독 기간: </span>
                    <p> &nbsp; 2021.04.23 ~ 2022.04.23</p>
                </div>

                <div className="SubscriptionPayment">
                    <div>
                        <span>결제 금액</span>
                        <p>12,000원</p>
                    </div>
                    <div >
                        <span>정기 결제 수단</span>
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