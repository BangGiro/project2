import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = ({ userId }) => {
  const { id } = useParams(); // URL에서 상품 ID 가져오기
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 콘솔로 userId 확인
  console.log("userId:", userId);

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

  // 장바구니에 추가
  const handleAddToCart = async (productId) => {
    try {
      if (!userId || !productId) {
        throw new Error('Invalid user ID or product ID');
      }
  
      const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
      const token = loginInfo ? loginInfo.token : null;
  
      if (!token) {
        throw new Error('JWT token not found. Please login again.');
      }
  
      const response = await axios.post('http://localhost:3000/api/cart/add', 
        { productId, userId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('장바구니에 추가되었습니다.', response.data);
       alert('장바구니에 추가되었습니다!');
      } else {
        console.error('장바구니 추가에 실패했습니다.', response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error('장바구니에 추가하는 데 실패했습니다.', error);
    }
  };
  
  
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-detail">
      {product && (
        <>
          <img src={`/image/shop/${product.productsImages}`} alt={product.productName} />
          <div className="detail-info">
            <h1>{product.productName}</h1>
            <p>{product.price.toLocaleString()} 원</p>
            <p>{product.description}</p>
            {/* productId를 handleAddToCart 함수에 전달 */}
            <button onClick={() => handleAddToCart(product.productId)}>장바구니에 추가</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
