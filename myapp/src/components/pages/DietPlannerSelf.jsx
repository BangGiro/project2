import React, { useState } from 'react';
import './DietPlannerSelf.css';
const DietPlannerSelf = () => {
    const [selectedFoods, setSelectedFoods] = useState([]);
    const foodOptions = [
        { id: 1, name: '쌀(밥) (밥한공기 210g)', calories: 33.2, carbs: 3, protein: 0.1, fat: 0 },
        { id: 2, name: '쌀(생것) (밥한공기 90g)', calories: 79.5, carbs: 6.4, protein: 0.4, fat: 0 },
        { id: 3, name: '오트밀', calories: 64.9, carbs: 13.2, protein: 8.2, fat: 0 },
        { id: 4, name: '고구마', calories: 31.2, carbs: 1.4, protein: 0.2, fat: 0 },
        { id: 5, name: '목살', calories: 1.3, carbs: 20.2, protein: 9.5, fat: 0 },
        { id: 6, name: '목살(지방많음)', calories: 1.3, carbs: 17.21, protein: 16.36, fat: 0 },
        { id: 7, name: '소고기안심', calories: 0, carbs: 19.17, protein: 13.14, fat: 0 },
        { id: 8, name: '계란 (1개 60g)', calories: 3.41, carbs: 12.44, protein: 7.37, fat: 0 },
        { id: 9, name: '닭 가슴살(생것) (보통 한덩이에 120g)', calories: 0, carbs: 22.97, protein: 0.97, fat: 0 },
        { id: 10, name: '브로콜리', calories: 3.8, carbs: 3.81, protein: 0.92, fat: 0 },
        { id: 11, name: '토마토', calories: 4.26, carbs: 1.03, protein: 0.18, fat: 0 },
        { id: 12, name: '당근', calories: 7.03, carbs: 1.02, protein: 0.13, fat: 0 },
        { id: 13, name: '김치', calories: 4.4, carbs: 1.4, protein: 0.2, fat: 0 },
        { id: 14, name: '사과', calories: 14.36, carbs: 0.2, protein: 0.03, fat: 0 },
        { id: 15, name: '바나나', calories: 21.94, carbs: 1.1, protein: 0.1, fat: 0 },
        { id: 16, name: '저지방우유', calories: 4.86, carbs: 3.43, protein: 0.9, fat: 0 },
        { id: 17, name: '아몬드 (큰알로 1개에 약 1g)', calories: 20.09, carbs: 23.44, protein: 49.96, fat: 0 },
        { id: 18, name: '호두', calories: 7.92, carbs: 15.47, protein: 71.99, fat: 0 },
        { id: 19, name: '단호박', calories: 13.63, carbs: 1.19, protein: 0.65, fat: 0 },
        { id: 20, name: '인스턴트오트', calories: 62, carbs: 11, protein: 7.7, fat: 0 },
        { id: 21, name: '꿀', calories: 81, carbs: 0, protein: 0, fat: 0 },
        { id: 22, name: '올리브오일', calories: 0, carbs: 0, protein: 93, fat: 0 },
        { id: 23, name: '미숫가루 (현미,보리 베이스)', calories: 66, carbs: 14.5, protein: 5.5, fat: 0 },
        { id: 24, name: '귀리 파우더', calories: 51, carbs: 11, protein: 7.7, fat: 0 },
        { id: 25, name: '우유', calories: 5, carbs: 3, protein: 3.6, fat: 0 },
        { id: 26, name: '2% 저지방우유', calories: 5, carbs: 3, protein: 2, fat: 0 },
        { id: 27, name: '1% 저지방우유', calories: 5, carbs: 3, protein: 1, fat: 0 },
        { id: 28, name: '무지방 우유', calories: 5, carbs: 3, protein: 0, fat: 0 },
        { id: 29, name: '두유', calories: 3.5, carbs: 3, protein: 3, fat: 0 },
        { id: 30, name: '아몬드 브리즈(오리지널)', calories: 2.7, carbs: 0.6, protein: 1.1, fat: 0 },
        { id: 31, name: '아몬드 브리즈(언스위트)', calories: 1.6, carbs: 0.6, protein: 1.1, fat: 0 },
        { id: 32, name: '옵티멈 골드 스텐다드', calories: 3, carbs: 24, protein: 1, fat: 0 },
        { id: 33, name: '옵티멈 하이드로 웨이', calories: 3, carbs: 30, protein: 0.5, fat: 0 },
        { id: 34, name: '컴뱃 파우더', calories: 4, carbs: 25, protein: 1.5, fat: 0 },
        { id: 35, name: '컴뱃 100%웨이', calories: 2, carbs: 25, protein: 1.5, fat: 0 },
        { id: 36, name: '마이프로틴 임팩트웨이 프로틴', calories: 1, carbs: 21, protein: 1.9, fat: 0 },
        { id: 37, name: '마이프로틴 아이솔레이트', calories: 0.6, carbs: 23, protein: 0.1, fat: 0 },
        { id: 38, name: '나우 아이솔레이트', calories: 0, carbs: 25, protein: 0.5, fat: 0 },
        { id: 39, name: 'WPC 무맛', calories: 1, carbs: 21, protein: 1.9, fat: 0 },
        { id: 40, name: 'WPI 무맛', calories: 0, carbs: 27, protein: 0, fat: 0 },
        { id: 41, name: '신타 6', calories: 10, carbs: 22, protein: 6, fat: 0 },
        { id: 42, name: '신타6 아이솔레이트', calories: 5, carbs: 25, protein: 1.5, fat: 0 },
        // 추가 음식들
    ];
    const handleFoodSelection = (food) => {
        setSelectedFoods([...selectedFoods, food]);
    };

    const calculateTotalNutrition = () => {
        let totalCalories = 0;
        let totalCarbs = 0;
        let totalProtein = 0;
        let totalFat = 0;

        selectedFoods.forEach((food) => {
            totalCalories += food.calories;
            totalCarbs += food.carbs;
            totalProtein += food.protein;
            totalFat += food.fat;
        });

        return { totalCalories, totalCarbs, totalProtein, totalFat };
    };

    return (
        <div>
            <h1>Diet Planner</h1>
            <h2>Selected Foods:</h2>
            <ul>
                {selectedFoods.map((food) => (
                    <li key={food.id}>{food.name}</li>
                ))}
            </ul>
            <h2>Total Nutrition:</h2>
            <p>Calories: {calculateTotalNutrition().totalCalories}</p>
            <p>Carbs: {calculateTotalNutrition().totalCarbs}</p>
            <p>Protein: {calculateTotalNutrition().totalProtein}</p>
            <p>Fat: {calculateTotalNutrition().totalFat}</p>
            <h2>Food Options:</h2>
            <ul>
                {foodOptions.map((food) => (
                    <li key={food.id} onClick={() => handleFoodSelection(food)}>
                        {food.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DietPlannerSelf;
