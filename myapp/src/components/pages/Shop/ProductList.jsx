import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import PagiNation from '../../layout/PagiNation';
import ProductSearch from './ProductSearch';
import CategoryFilter from '../../layout/CategoryFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);   // 상품 데이터
  const [loading, setLoading] = useState(false);  // 로딩 상태
  const [error, setError] = useState(null);       // 에러 상태
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1);   // 전체 페이지 수
  const [keyword, setKeyword] = useState('');        // 검색어
  const [prevProducts, setPrevProducts] = useState([]); // 이전 상품 데이터를 유지
  const [selectedCategories, setSelectedCategories] = useState([]); // 카테고리 상태를 배열로 수정
  
  // 상품 데이터를 가져오는 함수
  const fetchProducts = async (page = 0, searchKeyword = '', categories = []) => {
    setLoading(true); // 로딩 상태 시작

    try {
      const response = await axios.get(`/api/products/paging`, {
        params: {
          page: page,
          size: 10,
          keyword: searchKeyword, // 검색어 추가
          categories: categories.length > 0 ? categories.join(',') : '', // 배열을 문자열로 변환해 전달
        },
      });
      setPrevProducts(products); // 이전 상품 데이터를 저장
      setProducts(response.data.content); // 새로운 데이터 설정
      setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
    } catch (error) {
      setError('상품을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  // 검색어나 페이지가 변경될 때마다 상품 목록을 가져옴
  useEffect(() => {
    console.log('Current Page:', currentPage);
  console.log('Current Keyword:', keyword);
  console.log('Selected Categories:', selectedCategories);
    fetchProducts(currentPage, keyword, selectedCategories);  // 페이지 및 검색어에 따라 상품 목록 로드
  }, [currentPage, keyword, selectedCategories]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // 페이지 변경 시 상태 업데이트
  };

  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);  // 검색어 변경 시 상태 업데이트
    setCurrentPage(0);          // 검색 시 페이지를 0으로 리셋
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories); // 여러 카테고리 선택 시 배열로 설정
    setCurrentPage(0); // 카테고리 선택 시 페이지 리셋
  };

  return (
    <div>
      <div className="product-list">
        <h1>상품 목록</h1>

        {/* 검색 컴포넌트에 검색어 업데이트 핸들러 전달 */}
        <ProductSearch onSearch={handleSearch} />
        
        {/* CategoryFilter 컴포넌트 사용 */}
        <CategoryFilter selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />

        {/* 로딩 상태일 때도 이전 데이터를 보여줌 */}
        <div className="products">
          {loading ? (
            prevProducts.map((product) => (
              <div key={product.productId} className="product-item">
                <img src={`/image/shop/${product.productsImages}`} alt={product.productName} />
                <h2>{product.productName}</h2>
                <p>{product.price.toLocaleString()} 원</p>
                <Link to={`/shop/product/${product.productId}`}>
                  <button>상품 보기</button>
                </Link>
              </div>
            ))
          ) : (
            products.length > 0 ? (
              products.map((product) => (
                <div key={product.productId} className="product-item">
                  <img src={`/image/shop/${product.productsImages}`} alt={product.productName} />
                  <h2>{product.productName}</h2>
                  <p>{product.price.toLocaleString()} 원</p>
                  <Link to={`/shop/product/${product.productId}`}>
                    <button>상품 보기</button>
                  </Link>
                </div>
              ))
            ) : (
              <div>검색된 상품이 없습니다.</div>
            )
          )}
        </div>
        
        {/* 페이지네이션 컴포넌트 */}
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
