import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutPage = ({ userId }) => {
    const [userInfo, setUserInfo] = useState({});
    const [cartItems, setCartItems] = useState([]);

    // 사용자 정보와 장바구니 데이터를 가져옴
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`/api/user/${userId}`);
                setUserInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("사용자 정보를 가져오는 중 오류 발생:", error);
            }
        };

        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`/api/cart/${userId}`);
                setCartItems(response.data);
            } catch (error) {
                console.error("장바구니 데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchUserInfo();
        fetchCartItems();
    }, [userId]);

    return (
        <div>
            <h1>주문/결제</h1>
            
            {/* 사용자 정보 출력 */}
            <div>
                <h2>구매자 정보</h2>
                <p>이름: {userInfo.name}</p>
                <p>이메일: {userInfo.email}</p>
                <p>전화번호: {userInfo.phoneNumber}</p>
                <p>주소: {userInfo.address}</p>
            </div>
            
            {/* 장바구니 항목 출력 */}
            <div>
                <h2>장바구니</h2>
                {cartItems.map(item => (
                    <div key={item.productId}>
                        <p>상품명: {item.productName}</p>
                        <p>가격: {item.price} 원</p>
                        <p>수량: {item.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckoutPage;
