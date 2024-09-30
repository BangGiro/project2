import React, { useState } from 'react';
import './ProductSearch.css';

const ProductSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword); // 부모 컴포넌트로 검색어 전달
    }
  };

  return (
    <div>
      <div className="Search-list">
        <form onSubmit={handleSubmit} className="form-inline p-2 bd-highlight" role="search">
          <input
            type="text"
            name="keyword"
            className="form-control"
            id="search"
            placeholder="검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // 검색어 상태 업데이트
          />
          <button type="submit" className="btn btn-success bi bi-search">검색</button>
        </form>
      </div>
    </div>
  );
};

export default ProductSearch;
