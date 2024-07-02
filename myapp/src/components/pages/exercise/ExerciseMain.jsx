import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ExerciseMain.css';

const initialExerciseData = [];

export const availableExercises = [
  { name: "스쿼트", category: "하체", image: "/image/exercisePictogram/squat.png" },
  { name: "데드리프트", category: "하체", image: "/image/exercisePictogram/deadlift.png" },
  { name: "런지", category: "하체", image: "/image/exercisePictogram/lunge.png" },
  { name: "레그 프레스", category: "하체", image: "/image/exercisePictogram/legpress.png" },
  { name: "레그 컬", category: "하체", image: "/image/exercisePictogram/legcurl.png" },
  { name: "이너 타이", category: "하체", image: "/image/exercisePictogram/innerThigh.png" },
  { name: "카프 레이즈", category: "하체", image: "/image/exercisePictogram/calfRaise.png" },
  { name: "풀업", category: "등", image: "/image/exercisePictogram/pullup.png" },
  { name: "풀 오버", category: "등", image: "/image/exercisePictogram/pullover.png" },
  { name: "시티드 로우", category: "등", image: "/image/exercisePictogram/seatedrow.png" },
  { name: "랫 풀 다운", category: "등", image: "/image/exercisePictogram/latpulldown.png" },
  { name: "원 암 로우", category: "등", image: "/image/exercisePictogram/onearmrow.png" },
  { name: "티바 로우", category: "등", image: "/image/exercisePictogram/tbarrow.png" },
  { name: "벤치프레스", category: "가슴", image: "/image/exercisePictogram/benchpress.png" },
  { name: "인클라인 벤치프레스", category: "가슴", image: "/image/exercisePictogram/inclinebenchpress.png" },
  { name: "덤벨 벤치프레스", category: "가슴", image: "/image/exercisePictogram/dumbbellbenchpress.png" },
  { name: "케이블 크로스오버", category: "가슴", image: "/image/exercisePictogram/cablecrossover.png" },
  { name: "푸쉬업", category: "가슴", image: "/image/exercisePictogram/pushup.png" },
  { name: "딥스", category: "가슴", image: "/image/exercisePictogram/dips.png" },
  { name: "팩덱플라이", category: "가슴", image: "/image/exercisePictogram/packDeckFly.png" },
  { name: "숄더 프레스", category: "어깨", image: "/image/exercisePictogram/shoulderpress.png" },
  { name: "사이드 레터럴 레이즈", category: "어깨", image: "/image/exercisePictogram/sideLateralRaise.png" },
  { name: "밀리터리 프레스", category: "어깨", image: "/image/exercisePictogram/militarypress.png" },
  { name: "컨센트레이션컬", category: "팔", image: "/image/exercisePictogram/concentrationcurl.png" },
  { name: "바벨 컬", category: "팔", image: "/image/exercisePictogram/barbellcurl.png" },
  { name: "덤벨 컬", category: "팔", image: "/image/exercisePictogram/dumbbellcurl.png" },
  { name: "시티드 덤벨 컬", category: "팔", image: "/image/exercisePictogram/seateddumbbellcurl.png" },
  { name: "삼두 익스텐션", category: "팔", image: "/image/exercisePictogram/tricepsextension.png" },
  { name: "버피 테스트", category: "유산소", image: "/image/exercisePictogram/burpee.png" },
  { name: "싸이클", category: "유산소", image: "/image/exercisePictogram/cycle.png" },
  { name: "트레드밀", category: "유산소", image: "/image/exercisePictogram/treadmill.png" },
  { name: "스텝퍼", category: "유산소", image: "/image/exercisePictogram/stepper.png" },
  { name: "로잉", category: "유산소", image: "/image/exercisePictogram/rowing.png" },
];

const categories = [
  "하체", "등", "가슴", "어깨", "팔", "유산소"
];

function ExerciseMain({ loggedInEmail }) {
  const [exercises, setExercises] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingExercises, setPendingExercises] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentExercises, setCurrentExercises] = useState([]);

  useEffect(() => {
    if (loggedInEmail) {
      const storedExercises = JSON.parse(localStorage.getItem(`exercises_${loggedInEmail}`));
      if (storedExercises) {
        setExercises(storedExercises);
      }
    }
  }, [loggedInEmail]);

  useEffect(() => {
    if (loggedInEmail && exercises.length > 0) {
      localStorage.setItem(`exercises_${loggedInEmail}`, JSON.stringify(exercises));
    }
  }, [exercises, loggedInEmail]);

  useEffect(() => {
    const selectedDateData = exercises.find(day => day.day === selectedDate.toLocaleDateString());
    if (selectedDateData) {
      setCurrentExercises(selectedDateData.exercises);
    } else {
      setCurrentExercises([]);
    }
  }, [selectedDate, exercises]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setSearchTerm('');
    setPendingExercises([]);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddExercise = (exerciseName, exerciseImage) => {
    setPendingExercises([...pendingExercises, { name: exerciseName, image: exerciseImage, weight: '', reps: '', sets: '' }]);
  };

  const handleRemoveExercise = (exerciseName) => {
    setPendingExercises(pendingExercises.filter(exercise => exercise.name !== exerciseName));
  };

  const handleConfirmExercises = () => {
    const updatedExercises = exercises.map((day) =>
      day.day === selectedDate.toLocaleDateString()
        ? { ...day, exercises: [...day.exercises, ...pendingExercises] }
        : day
    );
    if (!exercises.find(day => day.day === selectedDate.toLocaleDateString())) {
      updatedExercises.push({ day: selectedDate.toLocaleDateString(), exercises: pendingExercises });
    }
    setExercises(updatedExercises);
    closeModal();
  };

  const deleteExercise = (exerciseIndex) => {
    const updatedExercises = exercises.map((day) =>
      day.day === selectedDate.toLocaleDateString()
        ? { ...day, exercises: day.exercises.filter((_, i) => i !== exerciseIndex) }
        : day
    );
    setExercises(updatedExercises);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.replace(/\s+/g, '').toLowerCase());
  };

  const handleExerciseSelect = (exerciseName, exerciseImage) => {
    if (pendingExercises.find(exercise => exercise.name === exerciseName)) {
      handleRemoveExercise(exerciseName);
    } else {
      handleAddExercise(exerciseName, exerciseImage);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedExercises = [...currentExercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setCurrentExercises(updatedExercises);

    const updatedAllExercises = exercises.map((day) =>
      day.day === selectedDate.toLocaleDateString()
        ? { ...day, exercises: updatedExercises }
        : day
    );
    setExercises(updatedAllExercises);
  };

  const filteredExercises = availableExercises.filter(exercise =>
    (selectedCategory ? exercise.category === selectedCategory : true) &&
    exercise.name.replace(/\s+/g, '').toLowerCase().includes(searchTerm)
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const selectedDayData = exercises.find(day => day.day === date.toLocaleDateString());
    if (selectedDayData) {
      setCurrentExercises(selectedDayData.exercises);
    } else {
      setCurrentExercises([]);
    }
  };

  const handleSave = () => {
    if (loggedInEmail) {
      localStorage.setItem(`exercises_${loggedInEmail}`, JSON.stringify(exercises));
    }
  };

  const handleClear = () => {
    const updatedExercises = exercises.filter(day => day.day !== selectedDate.toLocaleDateString());
    setExercises(updatedExercises);
    setCurrentExercises([]);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && exercises.some(day => day.day === date.toLocaleDateString())) {
      return <div className="dot"></div>;
    }
    return null;
  };

  return (
    <div className='ExerciseMainTrue'>
      <div className='every'>
        <div className='exerciseMainBody'>
          <div className="header">
            <h1>운동</h1>
            <hr/>
          </div>
          <div className='exerciseMain'> 
            <div className="calendarContainer">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
              />
            </div>
            <div className="weeklyStats">
              <div className="statsBars">
                <div className="weeks">
                  <div className="day">{selectedDate.toLocaleDateString()}</div>
                  <hr/>
                  {currentExercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="exerciseEntry">
                      <img src={exercise.image} alt={exercise.name} className="exerciseImage"/>
                      <p>{exercise.name}</p>
                      <li>
                      <label>&nbsp;무게</label>
                      <input
                        type="number"
                        min="1"
                        placeholder="(kg)"
                        value={exercise.weight}
                        onChange={(e) => handleInputChange(exerciseIndex, 'weight', e.target.value)}
                        className="weightInput"
                      />
                      </li>
                      <li>
                        <label>&nbsp;횟수</label>
                        <input
                          type="number"
                          min="1"
                          placeholder="횟수"
                          value={exercise.reps}
                          onChange={(e) => handleInputChange(exerciseIndex, 'reps', e.target.value)}
                          className="repsInput"
                        />
                      </li>
                      <li>
                      <label>&nbsp;세트 수</label>
                        <input
                          type="number"
                          min="1"
                          placeholder="세트 수"
                          value={exercise.sets}
                          onChange={(e) => handleInputChange(exerciseIndex, 'sets', e.target.value)}
                          className="setsInput"
                        />
                      </li>
                      <button className="delete" onClick={() => deleteExercise(exerciseIndex)}>
                        <i className="fa-solid fa-circle-minus"></i>
                      </button>
                    </div>
                  ))}
                  <div className="dailyActivity">
                    <button className="add" onClick={openModal}>운동 추가하기</button>
                    <button className="save" onClick={handleSave}>저장하기</button>
                    <button className="clear" onClick={handleClear}>초기화</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modalContent">
              <h2>운동 선택</h2>
              <input
                type="text"
                placeholder="운동 검색"
                value={searchTerm}
                onChange={handleSearchChange}
                className="searchInput"
              />
              {!selectedCategory && searchTerm === '' ? (
                <div className="categoryList">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="categoryItem"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="exerciseList">
                  {filteredExercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="exerciseItem"
                      onClick={() => handleExerciseSelect(exercise.name, exercise.image)}
                    >
                      <img src={exercise.image} alt={exercise.name} />
                      <p>{exercise.name}</p>
                      {pendingExercises.find(pendingExercise => pendingExercise.name === exercise.name) && (
                        <div className="checkMark">&#10003;</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="rowBox">
                <button className="redBtn" onClick={() => { setSelectedCategory(null); setSearchTerm(''); }}>
                  <i className="fa-solid fa-circle-arrow-left"></i>
                </button>
                <button className="redBtn" onClick={closeModal}>
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
                <button className="blueBtn" onClick={handleConfirmExercises}>
                  <i className="fa-solid fa-circle-check"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseMain;
