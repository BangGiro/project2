import React, { useState } from 'react';

function ExerciseJournal() {
    const [sets, setSets] = useState([
        { type: "", sets: 1, weight: 1, reps: 1 }
    ]);

    const addSet = () => {
        setSets([...sets, { type: "", sets: 1, weight: 1, reps: 1 }]);
    };

    const removeSet = (index) => {
        setSets(sets.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, field, value) => {
        const newSets = sets.map((set, i) =>
        i === index ? { ...set, [field]: value } : set
        );
        setSets(newSets);
    };

    return (
        <div>
        <div className="container">
            <div className="workoutSection">
            <h2>운동 계획하기</h2>
            <div id="exerciseContainer">
                {sets.map((set, index) => (
                <div className="exerciseEntry" key={index}>
                    <div className="setLabels">
                    <label htmlFor={`type-${index}`}>운동종류</label>
                    <label htmlFor={`sets-${index}`}>세트</label>
                    <label htmlFor={`weight-${index}`}>kg</label>
                    <label htmlFor={`reps-${index}`}>회</label>
                    </div>
                    <div className="setContainer">
                    <div className="setEntry">
                        <input
                        type="text"
                        id={`type-${index}`}
                        placeholder="운동종류"
                        value={set.type}
                        onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                        />
                        <input
                        type="number"
                        id={`sets-${index}`}
                        placeholder="세트"
                        min="1"
                        value={set.sets}
                        onChange={(e) => handleInputChange(index, 'sets', e.target.value)}
                        />
                        <input
                        type="number"
                        id={`weight-${index}`}
                        placeholder="kg"
                        min="1"
                        value={set.weight}
                        onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                        />
                        <input
                        type="number"
                        id={`reps-${index}`}
                        placeholder="회"
                        min="1"
                        value={set.reps}
                        onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
                        />
                        <button className="removeSet" onClick={() => removeSet(index)}>-</button>
                    </div>
                    </div>
                </div>
                ))}
                <button className="addSet" onClick={addSet}>세트 추가</button>
            </div>
            <button className="submitBtn">저장하기</button>
            </div>
        </div>
        </div>
    );
}

export default ExerciseJournal;