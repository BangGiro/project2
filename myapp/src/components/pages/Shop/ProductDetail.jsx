import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import './ReviewList.css';

import ReviewList from './ReviewList';

const ProductDetail = ({ userId }) => {
  const { id } = useParams(); // URL에서 상품 ID 가져오기
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // 수량 상태 추가
  const navigate = useNavigate(); // useNavigate를 사용하여 페이지 이동 처리

  // 상품 데이터 불러오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`); // 상품 데이터 가져오기

        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError('상품 데이터를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 수량 변경 시 가격 재계산
  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value)); // 최소 수량 1로 제한
    setQuantity(value);
  };

  // 총 가격 계산 (상품 가격 * 수량 + 배송비)
  const calculateTotalPrice = () => {
    if (!product) return 0;
    const totalPrice = (product.price * quantity) + product.shippingCost;
    return totalPrice.toLocaleString();
  };

  // 로그인 여부 확인 함수
  const checkLoginStatus = () => {
    const token = localStorage.getItem('JwtToken');
    if (!token) {
      alert('로그인 후 이용해 주세요.');
      return false;
    }
    return true;
  };

  // 장바구니에 추가 및 주문 테이블에 저장
  const handleAddToCartAndOrder = async (productId) => {
    if (!checkLoginStatus()) return;

    try {
      const token = localStorage.getItem('JwtToken');
      console.log(`Adding product ID: ${productId} for user ID: ${userId}`);

      // 장바구니에 추가
      const cartResponse = await axios.post(
        'http://localhost:3000/api/cart/add',
        { productId, userId, quantity },  // 수량 추가
        {
          headers: {
            Authorization: `Bearer ${token}`,  // JWT 토큰을 헤더에 포함
          },
        }
      );

      if (cartResponse.status === 200) {
        alert('장바구니에 추가되었습니다!');
      } else {
        console.error('장바구니 추가에 실패했습니다.', cartResponse.data);
      }

      // 주문 생성 요청
      const orderData = {
        userId,
        productId,
        quantity,
        totalAmount: (product.price * quantity) + product.shippingCost, // 총 주문 금액
        shippingAddress: '사용자가 입력한 배송지', // 이 부분은 입력 폼으로 받아올 수 있음
        deliveryAddress: '사용자가 입력한 배달지', // 이 부분도 사용자가 입력
      };

      const orderResponse = await axios.post(
        'http://localhost:3000/api/orders/create',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // JWT 토큰을 헤더에 포함
          },
        }
      );

      if (orderResponse.status === 200) {
        console.log('주문이 생성되었습니다.', orderResponse.data);
      } else {
        console.error('주문 생성에 실패했습니다.', orderResponse.data);
      }
    } catch (error) {
      console.error('장바구니에 추가 및 주문 생성 실패:', error.message);
      if (error.response) {
        console.error('서버 응답:', error.response.data);
      }
    }
  };

  // 장바구니 페이지 이동 버튼
  const handleGoToCart = () => {
    if (!checkLoginStatus()) return;
    navigate('/shop/cart');
  };

  // 결제 페이지로 이동 버튼
  const handleGoToCheckout = () => {
    if (!checkLoginStatus()) return;
    navigate('/checkout');
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='product-detail-css'>
      <div className="product-detail">
        {product && (
          <>
            <div className="main-content">
              <img src={`/image/shop/${product.productsImages}`} alt={product.productName} className="product-image" />
              <div className="detail-info">
                <h1>{product.productName}</h1>
                <p>가격: {product.price.toLocaleString()} 원</p>
                <p>설명: {product.description}</p>
                <p>브랜드: {product.brand}</p>
                <p>재고: {product.stockQuantity > 0 ? product.stockQuantity : '재고 없음'}</p>
                <p>무게: {product.weight} kg</p>
                <p>배송비: {product.shippingCost.toLocaleString()} 원</p>

                {/* 수량 입력 및 총 가격 계산 */}
                <div className="quantity-input">
                  <label htmlFor="quantity">수량: </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    min="1"
                    max={product.stockQuantity}
                    onChange={handleQuantityChange}
                  />
                </div>
                <p>총 가격: {calculateTotalPrice()} 원 (배송비 포함)</p>

                <button onClick={() => handleAddToCartAndOrder(product.productId)}>장바구니에 추가</button>
                <button className='common-button' onClick={handleGoToCart}>장바구니</button>
                <button className='common-button' onClick={handleGoToCheckout}>결제하기</button>
              </div>
            </div>

            {/* 리뷰 섹션 */}
            <div className="reviews-section">
              <h2>리뷰</h2>
              <ReviewList productId={product.productId} userId={userId} />
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
