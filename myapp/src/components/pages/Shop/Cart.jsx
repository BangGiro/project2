import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import { Link } from 'react-router-dom';
const Cart = ({ userId }) => {
  const [cartData, setCartData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  // 장바구니 데이터 불러오기
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/api/cart/${userId}`); // 사용자 ID로 장바구니 불러오기
        setCartData(response.data);
      } catch (error) {
        console.error('장바구니 데이터를 불러오는 중 오류 발생:', error);
      }
    };
      
    // 주문 데이터 불러오기
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`/api/orders/${userId}`); // 사용자 ID로 주문 데이터 불러오기
        setOrderData(response.data);
      } catch (error) {
        console.error('주문 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchCartItems();
    fetchOrderData();
  }, [userId]);

    //총 주문 금액
    const totalAmount = orderData.reduce((total, order) => total + order.totalAmount, 0);

  // 장바구니에서 항목 삭제
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
      console.error('항목을 제거하는 중 오류 발생:', error);
    }
  };

  return (
    <div className='cartCss'>
      <div className="cart">
        <h1>장바구니</h1>
        <ul>
          {cartData.map((item, index) => (
            <li key={item.cartId}>
              <img src={`/image/shop/${item.productsImages}`} alt={item.productName} />
              <div>
                <h2>{item.productName}</h2>
                {orderData[index] && (
                  <div>
                    <h3>주문 날짜: {orderData[index].orderDate }</h3>
                    <p>총 금액: {orderData[index].totalAmount?.toLocaleString()} 원</p>
                    <p>수량: {orderData[index].quantity }</p>
                  </div>
                )}
                 <button onClick={() => handleRemoveFromCart(item.cartId, orderData[index]?.orderId)}>제거</button>

                {/* orderData에서 값을 뽑아서 사용 (순서대로 매칭 없이 출력) */}
              </div>
            </li>
          ))}
        </ul>
        <h3>총 주문 금액:{totalAmount.toLocaleString()} 원(배송비포함)</h3>

        <Link
          to={{
            pathname: "/checkout",
            state: { cartItems: cartData, userId: userId }, // cartData를 전달
          }}
        >
          <button className='checkoutbtn'>결제하기</button> {/* 결제 페이지로 이동하는 버튼 */}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
