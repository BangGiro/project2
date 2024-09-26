import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();  // URL에서 전달된 id를 가져옴
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 상품 데이터를 API로부터 불러오는 로직 (여기서는 하드코딩 예시)
    const fetchProduct = async () => {
      const fetchedProduct = {
        id,
        name: '노트북',
        price: 1000000,
        description: '고성능 노트북입니다.',
        image: '/images/laptop.jpg'
      };
      setProduct(fetchedProduct);  // 실제로는 백엔드에서 데이터를 가져와야 합니다.
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>로딩 중...</div>;  // 데이터 로딩 중 메시지
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div className="detail-info">
        <h1>{product.name}</h1>
        <p>{product.price.toLocaleString()} 원</p>
        <p>{product.description}</p>
        <button onClick={() => onAddToCart(product)}>장바구니에 추가</button>
      </div>
    </div>
  );
};

export default ProductDetail;
