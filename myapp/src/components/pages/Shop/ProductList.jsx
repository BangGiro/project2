import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // API 호출
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.error('Error status', error.response.status);
          console.error('Error data', error.response.data);
          setError('상품을 불러오는 데 실패했습니다.');
        } else {
          console.error('Error message', error.message);
          setError('서버에 연결할 수 없습니다.');
        }
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list">
      <h1>상품 목록</h1>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price.toLocaleString()} 원</p>
            <Link to={`/shop/product/${product.id}`}>
              <button>상품 보기</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
