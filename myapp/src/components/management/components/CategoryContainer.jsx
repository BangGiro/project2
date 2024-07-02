import React from 'react';
import './CategoryContainer.css';

function CategoryContainer({ memberNames = [], onDeleteMember }) {
    return (
        <div className="category-container">
            <h2>카테고리</h2>
            <div>
                <h3>회원관리</h3>
                <ul className='user-category-management-container'>
                    {memberNames.map((member, index) => (
                        <li className='cat-list-member' key={index}>
                            {member.name}
                            <button onClick={() => onDeleteMember(member.email)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoryContainer;
