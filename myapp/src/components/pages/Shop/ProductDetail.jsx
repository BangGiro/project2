import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = ({ userId }) => {
  const { id } = useParams(); // URL에서 상품 ID 가져오기
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const handleAddToCart = async () => {
    try {
      const cartItem = {
        user: { userId: userId }, // 로그인된 사용자 ID 사용
        productId: product.productId,
        createdAt: new Date().toISOString()
      };
      await axios.post('/api/cart/add', cartItem); // 장바구니에 추가하는 API 호출
      alert('장바구니에 추가되었습니다!');
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
            <button onClick={handleAddToCart}>장바구니에 추가</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
