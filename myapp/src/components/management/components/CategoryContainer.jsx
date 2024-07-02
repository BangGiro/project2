import React from 'react';
import './CategoryContainer.css';

function CategoryContainer({ memberNames = []}) {
    return (
        <div className="category-container">
            <h2>카테고리</h2>
            <div className='user-category-management-container'>
                <h3>회원관리</h3>
                <ul>
                    {memberNames.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoryContainer;
