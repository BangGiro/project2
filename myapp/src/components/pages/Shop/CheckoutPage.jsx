import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css'; // 스타일링을 위해 별도의 CSS 파일 사용

const CheckoutPage = ({ userId }) => {
    const [userInfo, setUserInfo] = useState({});
    const [cartData, setCartData] = useState([]); // cartItems -> cartData로 변경
    const [orderData, setOrderData] = useState([]); // 추가된 주문 데이터
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        postalCode: '',
        city: ''
    });
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCVC: ''
    });

    const navigate = useNavigate(); // 페이지 리디렉션을 위해 사용

    // 사용자 정보와 장바구니 데이터를 가져옴
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`/users/${userId}`);
                setUserInfo(response.data);
                // 기본값으로 사용자 이름과 주소를 배송 정보에 입력
                setShippingInfo({
                    ...shippingInfo,
                    name: response.data.name,
                    address: response.data.address,
                    zip_code: response.data.zipCode,
                    detail_address: response.data.detailAddress
                });
            } catch (error) {
                console.error("사용자 정보를 가져오는 중 오류 발생:", error);
            }
        };

        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`/api/cart/${userId}`); // 사용자 ID로 장바구니 불러오기
                setCartData(response.data); // cartItems -> cartData로 변경
                console.log("==========cartData========", response.data);
                console.log("UserId:", userId);
            } catch (error) {
                console.error('장바구니 데이터를 불러오는 중 오류 발생:', error);
                console.log("UserId:", userId);
            }
        };

        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`/api/orders/${userId}`); // 사용자 ID로 주문 데이터 불러오기
                setOrderData(response.data);
                console.log("==========orderData========", response.data);
            } catch (error) {
                console.error('주문 데이터를 불러오는 중 오류 발생:', error);
            }
        };

        fetchUserInfo();
        fetchCartItems();
        fetchOrderData();
    }, [userId]);

    //총 주문 금액
    const totalAmount = orderData.reduce((total, order) => total + order.totalAmount, 0);

    // 배송 정보 변경 핸들러
    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    // 결제 정보 변경 핸들러
    const handlePaymentChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    // 장바구니 및 주문에서 항목 삭제
    const handleRemoveFromCart = async (cartId, orderId) => {
        try {
            // Cart에서 항목 삭제
            await axios.delete(`/api/cart/${cartId}`);
            setCartData(cartData.filter(item => item.cartId !== cartId));

            // Order에서 항목 삭제
            if (orderId) {
                await axios.delete(`/api/orders/${orderId}`);
                setOrderData(orderData.filter(order => order.orderId !== orderId));
            }
        } catch (error) {
            console.error('장바구니에서 항목을 제거하는 중 오류 발생:', error);
        }
    };

    // 결제 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 장바구니 및 주문 목록 초기화
            for (let i = 0; i < cartData.length; i++) {
                const cartItem = cartData[i];
                const orderItem = orderData[i];
                await handleRemoveFromCart(cartItem.cartId, orderItem?.orderId); // 주문과 장바구니 데이터 삭제
            }

            // 결제 완료 메시지 표시
            alert("결제가 완료되었습니다!");

            // 홈 화면으로 이동
            navigate('/');
        } catch (error) {
            console.error("결제 처리 중 오류 발생:", error);
        }
    };

    return (
        <div className="checkout-pageCss">
        <div className="checkout-page">
            <h1>주문/결제</h1>
            <hr/>
            <br/>

            {/* 사용자 정보 출력 */}
            <div className="user-info" style={{textAlign:'center'}}  >
                <h2>구매자 정보</h2>
                <br/>
                <p><strong>이름:</strong> {userInfo.name}</p>
                <p><strong>주소:</strong> {userInfo.address}</p>
                <p><strong>전화번호:</strong> {userInfo.phoneNumber}</p>
            </div>

            {/* 장바구니 항목 출력 */}
            <div className="cart-info">
                <hr/>
                <br/>
                <h2 style={{textAlign:'center', fontWeight:'bold'}}>장바구니</h2>
                <ul>
                    {cartData.map((item, index) => (
                        <li key={item.cartId}>
                            <img src={`/image/shop/${item.productsImages}`} alt={item.productName} />
                            <div>
                                <h2>{item.productName}</h2>
                                {orderData[index] && (
                                    <div>
                                        <p>주문 날짜: {orderData[index].orderDate}</p>
                                        <p>주문 금액: {orderData[index].totalAmount?.toLocaleString()} 원</p>
                                        <p>주문 수량: {orderData[index].quantity}</p>
                                    </div>
                                )}
                                <button onClick={() => handleRemoveFromCart(item.cartId, orderData[index]?.orderId)}>제거</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <h3 className="text-right">총 주문 금액 : {totalAmount.toLocaleString()} 원</h3>
            </div>

            {/* 배송 정보 입력 */}
            <form onSubmit={handleSubmit} className="checkout-form">
                <h2>배송 정보</h2>
                <div className="form-group">
                    <label>받는 사람</label>
                    <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>주소</label>
                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>우편 번호</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={shippingInfo.zip_code}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>상세주소</label>
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.detail_address}
                        onChange={handleShippingChange}
                        required
                    />
                </div>

                {/* 결제 정보 입력 */}
                <h2>결제 정보</h2>
                <div className="form-group">
                    <label>카드 번호</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>유효 기간 (MM/YY)</label>
                    <input
                        type="text"
                        name="cardExpiry"
                        value={paymentInfo.cardExpiry}
                        onChange={handlePaymentChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CVC 코드</label>
                    <input
                        type="text"
                        name="cardCVC"
                        value={paymentInfo.cardCVC}
                        onChange={handlePaymentChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">결제하기</button>
            </form>
        </div>
        </div>
    );
};

export default CheckoutPage;
