import React, { useState, useEffect } from 'react';
import './Switch.css';  

const Switch = ({ onCategoryChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    // 각 스위치의 상태 관리 및 카테고리 선택 처리
    const handleCategoryChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    // 부모 컴포넌트로 선택된 카테고리 전달
    useEffect(() => {
        onCategoryChange(selectedCategories);
    }, [selectedCategories, onCategoryChange]);

    return (
        <div className="switch-container">
            <div className="form-check form-switch">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    id="flexSwitchCheckDumbbell" 
                    onChange={() => handleCategoryChange(1)}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDumbbell">덤벨</label>
            </div>
            <div className="form-check form-switch">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    id="flexSwitchCheckProtein" 
                    onChange={() => handleCategoryChange(2)}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckProtein">프로틴</label>
            </div>
            <div className="form-check form-switch">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    id="flexSwitchCheckStrap" 
                    onChange={() => handleCategoryChange(3)}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckStrap">스트랩</label>
            </div>
            <div className="form-check form-switch">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    id="flexSwitchCheckMat" 
                    onChange={() => handleCategoryChange(4)}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckMat">매트</label>
            </div>
            <div className="form-check form-switch">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    id="flexSwitchCheckGrip" 
                    onChange={() => handleCategoryChange(5)}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckGrip">악력기</label>
            </div>
        </div>
    );
};

export default Switch;
