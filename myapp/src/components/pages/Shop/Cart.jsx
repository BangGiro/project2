import React from 'react';
import './Cart.css'; // 스타일링 추가

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart">
      <h1>장바구니</h1>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h2>{item.name}</h2>
                <p>{item.price.toLocaleString()} 원</p>
              </div>
              <button onClick={() => onRemoveFromCart(item.id)}>삭제</button>
            </div>
          ))}
          <h2>총 가격: {totalPrice.toLocaleString()} 원</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
