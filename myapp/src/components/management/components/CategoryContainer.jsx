import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryContainer.css';

function CategoryContainer({ memberNames = [], onDeleteMember }) {
    return (
        <div className="category-container">
            <h2>카테고리</h2>
            <div>
                <h3><Link to="/management">회원관리</Link></h3>
                <ul className='user-category-management-container'>
                    {memberNames.map((member, index) => (
                        <li className='cat-list-member' key={index}>
                            {member.name}
                            {/* <button onClick={() => onDeleteMember(member.email)}>삭제</button> */}
                        </li>
                    ))}
                </ul>
                <h3><Link to="/exerciseMain">내 운동</Link></h3>
                <h3><Link to="/">마이페이지</Link></h3>
            </div>
        </div>
    );
}

export default CategoryContainer;
