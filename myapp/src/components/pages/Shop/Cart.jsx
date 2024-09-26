import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = ({ userId }) => {
  const [cartData, setCartData] = useState([]);

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
    fetchCartItems();
  }, [userId]);

  // 장바구니에서 항목 삭제
  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`/api/cart/${id}`);
      setCartData(cartData.filter(item => item.cartId !== id));
    } catch (error) {
      console.error('장바구니에서 항목을 제거하는 중 오류 발생:', error);
    }
  };

  if (cartData.length === 0) {
    return <div>장바구니가 비어 있습니다.</div>;
  }

  return (
    <div className="cart">
      <h1>장바구니</h1>
      <ul>
        {cartData.map((item) => (
          <li key={item.cartId}>
            <img src={`/image/shop/${item.productImage}`} alt={item.productName} />
            <div>
              <h2>{item.productName}</h2>
              <p>{item.price.toLocaleString()} 원</p>
              <button onClick={() => handleRemoveFromCart(item.cartId)}>제거</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
