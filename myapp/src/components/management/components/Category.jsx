import React from 'react';
import './Category.css';

const Category = ({ items, onSelect }) => {
    return (
        <div className="category-container">
            <h3 onClick={() => onSelect('members')}>회원 목록 보기</h3>
            <ul className="category-list">
                {items.map((item, index) => (
                    <li key={index} onClick={() => onSelect(index)}>
                        {item.name}
                    </li>
                ))}
            </ul>
            <h3 onClick={() => onSelect('schedule')}>내 일정관리 보기</h3>
        </div>
    );
};

export default Category;
