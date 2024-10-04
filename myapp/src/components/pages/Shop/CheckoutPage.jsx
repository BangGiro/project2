import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
                    address: response.data.address
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

    // 배송 정보 변경 핸들러
    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    // 결제 정보 변경 핸들러
    const handlePaymentChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 결제 및 배송 처리 로직 추가
        console.log("결제 정보: ", paymentInfo);
        console.log("배송 정보: ", shippingInfo);
    };

    const handleRemoveFromCart = async (cartId) => {
        try {
            await axios.delete(`/api/cart/${cartId}`);
            setCartData(cartData.filter(item => item.cartId !== cartId));
        } catch (error) {
            console.error('장바구니에서 항목을 제거하는 중 오류 발생:', error);
        }
    };

    return (
        <div className="checkout-page">
            <h1>주문/결제</h1>

            {/* 사용자 정보 출력 */}
            <div className="user-info">
                <h2>구매자 정보</h2>
                <p><strong>이름:</strong> {userInfo.name}</p>
                <p><strong>주소:</strong> {userInfo.address}</p>
                <p><strong>전화번호:</strong> {userInfo.phoneNumber}</p>
            </div>

            {/* 장바구니 항목 출력 */}
            <div className="cart-info">
                <h2>장바구니</h2>
                <ul>
                    {cartData.map((item, index) => (
                        <li key={item.cartId}>
                            <img src={`/image/shop/${item.productsImages}`} alt={item.productName} />
                            <div>
                                <h2>{item.productName}</h2>
                                <p>{item.price?.toLocaleString() || 0} 원</p>
                                <p>수량: {item.quantity || 1}</p>
                                {orderData[index] && (
                                    <div>
                                        <h3>주문 날짜: {orderData[index].orderDate}</h3>
                                        <p>총 금액: {orderData[index].totalAmount?.toLocaleString()} 원</p>
                                        <p>주문 수량: {orderData[index].quantity}</p>
                                    </div>
                                )}
                                <button onClick={() => handleRemoveFromCart(item.cartId)}>제거</button>
                            </div>
                        </li>
                    ))}
                </ul>
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
                        value={shippingInfo.postalCode}
                        onChange={handleShippingChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>도시</label>
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
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
    );
};

export default CheckoutPage;
