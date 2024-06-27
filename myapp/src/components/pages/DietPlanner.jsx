import React, { useState } from 'react';
import './DietPlanner.css';

const DietPlanner = () => {
    
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [goal, setGoal] = useState('');

    const handleGenderSelection = (selectedGender) => {
        setGender(selectedGender);
    };

    const handleAgeSelection = (selectedAge) => {
        setAge(selectedAge);
    };

    const handleGoalSelection = (selectedGoal) => {
        setGoal(selectedGoal);
    };

    const renderGenderButtons = () => {
        return (
            <div className='mainBody'>
                <h2>성별을 선택하세요</h2>
                <hr/>
                <div className="genderButtons">
                    <button className="maleButton" onClick={() => handleGenderSelection('male')}>남</button>
                    <button className="femaleButton" onClick={() => handleGenderSelection('female')}>여</button>
                </div>
            </div>
        );
    };

    const renderAgeButtons = () => {
        const ageOptions = Array.from({ length: 9 }, (_, index) => 10 + index  * 10);

        return (
            <div className='mainBody'>
                <h2>나이를 선택하세요</h2>
                <hr/>
                <div className="ageButtons">
                    {ageOptions.map((ageOption) => (
                        <button className='ageButton' key={ageOption} onClick={() => handleAgeSelection(ageOption)}>
                            {ageOption+`~${ageOption + 9}`}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderGoalButtons = () => {
        return (
            <div className='mainBody'>
                <h2>목적을 선택하세요</h2>
                <hr/>
                <div className="goalButtons">
                    <button className="goalButton" onClick={() => handleGoalSelection('bulking')}>벌크업</button>
                    <button className="goalButton" onClick={() => handleGoalSelection('dieting')}>다이어트</button>
                </div>
            </div>
        );
    };

    const renderDietRecommendation = () => {
        let dietRecommendation = '';
        if (goal === 'dieting') {
            if (gender === 'male') {
            if (age >= 10 && age <= 19) {
                dietRecommendation = `
                적정 칼로리: 2200-2800kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 20 && age <= 29) {
                dietRecommendation = `
                적정 칼로리: 2000-2600kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 30 && age <= 39) {
                dietRecommendation = `
                적정 칼로리: 1800-2400kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 40 && age <= 49) {
                dietRecommendation = `
                적정 칼로리: 1600-2200kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 50 && age <= 59) {
                dietRecommendation = `
                적정 칼로리: 1400-2000kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 60 && age <= 69) {
                dietRecommendation = `
                적정 칼로리: 1200-1800kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 70 && age <= 79) {
                dietRecommendation = `
                적정 칼로리: 1000-1600kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 80 && age <= 89) {
                dietRecommendation = `
                적정 칼로리: 800-1400kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 90 && age <= 99) {
                dietRecommendation = `
                적정 칼로리: 600-1200kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            }

        } else if (gender === 'female') {
            if (age >= 10 && age <= 19) {
                dietRecommendation = `
                적정 칼로리: 1800-2200kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 20 && age <= 29) {
                dietRecommendation = `
                적정 칼로리: 1600-2000kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 30 && age <= 39) {
                dietRecommendation = `
                적정 칼로리: 1400-1800kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 40 && age <= 49) {
                dietRecommendation = `
                적정 칼로리: 1200-1600kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 50 && age <= 59) {
                dietRecommendation = `
                적정 칼로리: 1000-1400kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 60 && age <= 69) {
                dietRecommendation = `
                적정 칼로리: 800-1200kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 70 && age <= 79) {
                dietRecommendation = `
                적정 칼로리: 600-1000kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 80 && age <= 89) {
                dietRecommendation = `
                적정 칼로리: 400-800kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 90 && age <= 99) {
                dietRecommendation = `
                적정 칼로리: 200-600kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            }
            }
            
        } else if (goal === 'bulking') {
            if (gender === 'male') {
            if (age >= 10 && age <= 19) {
                dietRecommendation = `
                적정 칼로리: 3000-3500kcal<br/>
                적정 단백질: 1.6-2.2g/kg 체중<br/>
                적정 탄수화물: 55-65% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고탄수화물, 고단백 식품 중심<br/>
                `;
            } else if (age >= 20 && age <= 29) {
                dietRecommendation = `
                적정 칼로리: 2800-3300kcal<br/>
                적정 단백질: 1.6-2.2g/kg 체중<br/>
                적정 탄수화물: 55-65% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고탄수화물, 고단백 식품 중심<br/>
                `;
            } else if (age >= 30 && age <= 39) {
                dietRecommendation = `
                적정 칼로리: 2600-3100kcal<br/>
                적정 단백질: 1.6-2.2g/kg 체중<br/>
                적정 탄수화물: 55-65% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고탄수화물, 고단백 식품 중심<br/>
                `;
            } else if (age >= 40 && age <= 49) {
                dietRecommendation = `
                적정 칼로리: 2400-2900kcal<br/>
                적정 단백질: 1.6-2.2g/kg 체중<br/>
                적정 탄수화물: 55-65% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고탄수화물, 고단백 식품 중심<br/>
                `;
            } else if (age >= 50 && age <= 59) {
                dietRecommendation = `
                적정 칼로리: 2200-2700kcal<br/>
                적정 단백질: 1.6-2.2g/kg 체중<br/>
                적정 탄수화물: 55-65% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고탄수화물, 고단백 식품 중심<br/>
                `;
            } else if (age >= 60 && age <= 69) {
                dietRecommendation = `
                적정 칼로리: 2000-2500kcal<br/>
                적정 단백질: 1.6-2.2g/kg 체중<br/>
                적정 탄수화물: 55-65% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고탄수화물, 고단백 식품 중심<br/>
                `;
            } else if (age >= 70 && age <= 79) {
                dietRecommendation = `
                적정 칼로리: 1800-2300kcal<br/>
                적정 단백질: 1.6-2.2g/kg 체중<br/>
                적정 탄수화물: 55-65% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고탄수화물, 고단백 식품 중심<br/>
                `;
            } else if (age >= 80 && age <= 89) {
                dietRecommendation = `
                적정 칼로리: 1600-2100kcal<br/>
                적정 단백질: 1.6-2.2g/kg 체중<br/>
                적정 탄수화물: 55-65% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고탄수화물, 고단백 식품 중심<br/>
                `;
            } else if (age >= 90 && age <= 99) {
                dietRecommendation = `
                적정 칼로리: 1400-1900kcal<br/>
                적정 단백질: 1.6-2.2g/kg 체중<br/>
                적정 탄수화물: 55-65% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고탄수화물, 고단백 식품 중심<br/>
                `;
            } 
        }

        else if (gender === 'female') {
            if (age >= 10 && age <= 19) {
                dietRecommendation = `
                적정 칼로리: 1800-2200kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 20 && age <= 29) {
                dietRecommendation = `
                적정 칼로리: 1600-2000kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 30 && age <= 39) {
                dietRecommendation = `
                적정 칼로리: 1400-1800kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 40 && age <= 49) {
                dietRecommendation = `
                적정 칼로리: 1200-1600kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 50 && age <= 59) {
                dietRecommendation = `
                적정 칼로리: 1000-1400kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 60 && age <= 69) {
                dietRecommendation = `
                적정 칼로리: 800-1200kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 70 && age <= 79) {
                dietRecommendation = `
                적정 칼로리: 600-1000kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 80 && age <= 89) {
                dietRecommendation = `
                적정 칼로리: 400-800kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            } else if (age >= 90 && age <= 99) {
                dietRecommendation = `
                적정 칼로리: 600-1200kcal<br/>
                적정 단백질: 1.2-1.6g/kg 체중<br/>
                적정 탄수화물: 45-55% 총 칼로리<br/>
                적정 지방: 20-30% 총 칼로리<br/>
                음식 종류: 고단백, 저지방 식품 중심<br/>
                `;
            };
        };
    };
    dietRecommendation = dietRecommendation.replace(/<br\/>/g, "<br/><hr/>");
    return(
        <div className='mainBody'>
            <h2>당신에게 추천해드리는 식단입니다.</h2>
            <hr/>
            <div className="dietRecommendation" dangerouslySetInnerHTML={{ __html: dietRecommendation  }} />
            </div>
    )
};
return (
    <div className="dietPlannerTrue">
    <div className="dietPlanner">
        {!gender && renderGenderButtons()}
        {gender && !age && renderAgeButtons()}
        {gender && age && !goal && renderGoalButtons()}
        {gender && age && goal && renderDietRecommendation()}
    </div>
    </div>
);

};
export default DietPlanner;
