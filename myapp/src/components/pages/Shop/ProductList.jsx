import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import PagiNation from '../../layout/PagiNation';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);  // 현재 페이지 상태 추가
  const [totalPages, setTotalPages] = useState(1);    // 전체 페이지 수 상태 추가

  useEffect(() => {
    const fetchProducts = async (page = 0) => {
      try {
        const response = await axios.get(`/api/products/paging`, {
          params: {
            page: page,    // 페이지 번호
            size: 10       // 한 페이지에 보여줄 데이터 수
          }
        }); // API 호출
        console.log('Products Data:', response.data); // 응답 데이터를 확인
        setProducts(response.data.content);           // 현재 페이지의 상품 목록
        setTotalPages(response.data.totalPages);      // 전체 페이지 수
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
    fetchProducts(currentPage); // 현재 페이지에 해당하는 데이터 가져오기
  }, [currentPage]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);  // 페이지 변경 시 상태 업데이트
  };

  return (
    <div>
      <div className="product-list">
        <h1>상품 목록</h1>
        <div className="products">
          {products.map(product => (
            <div key={product.productId} className="product-item">
              <img src={`/image/shop/${product.productsImages}`} alt={product.productName} />
              <h2>{product.productName}</h2>
              <p>{product.price.toLocaleString()} 원</p>
              <Link to={`/shop/product/${product.productId}`}>
                <button>상품 보기</button>
              </Link>
            </div>
          ))}
        </div>
        {/* 페이지 네이션 컴포넌트에 현재 페이지와 전체 페이지 수 전달 */}
        <PagiNation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductList;
