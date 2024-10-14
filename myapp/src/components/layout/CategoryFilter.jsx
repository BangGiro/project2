import React, { useState, useEffect } from 'react';
import './CategoryFilter.css';
import axios from 'axios';

const CategoryFilter = ({ selectedCategories, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // API를 통해 카테고리 목록을 가져오는 코드
    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('카테고리 가져오기 실패', error));
  }, []);

  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (event.target.checked) {
      onCategoryChange([...selectedCategories, value]); // 체크된 항목 추가
    } else {
      onCategoryChange(selectedCategories.filter(category => category !== value)); // 체크 해제된 항목 제거
    }
  };

  return (
    <div className="category-filter-container">
      {categories.map(category => (
        <label key={category.categoryId} className="category-checkbox">
          <input
            type="checkbox"
            value={category.categoryId}
            checked={selectedCategories.includes(category.categoryId)}
            onChange={handleCheckboxChange}
          />
          {category.categoryName}
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
