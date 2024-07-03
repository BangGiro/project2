import React from 'react';
import './CategoryContainer.css';

function CategoryContainer({ memberNames = [] }) {
    return (
        <div className="category-container">
            <h2>회원목록</h2>
            <div>
                <ul className='user-category-management-container'>
                    {memberNames.map((member, index) => (
                        <li className='cat-list-member' key={index}>
                            {member.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoryContainer;
