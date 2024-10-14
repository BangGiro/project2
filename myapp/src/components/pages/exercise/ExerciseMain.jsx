import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ExerciseMain.css';
import axios from 'axios';

export const availableExercises = [
  { name: "스쿼트", category: "하체", imagePath: "squat.png", imageId: 1 },
  { name: "데드리프트", category: "하체", imagePath: "deadlift.png", imageId: 2 },
  { name: "런지", category: "하체", imagePath: "lunge.png", imageId: 3 },
  { name: "레그 프레스", category: "하체", imagePath: "legpress.png", imageId: 4 },
  { name: "레그 컬", category: "하체", imagePath: "legcurl.png", imageId: 5 },
  { name: "이너 타이", category: "하체", imagePath: "innerthigh.png", imageId: 6 },
  { name: "카프 레이즈", category: "하체", imagePath: "calfraise.png", imageId: 7 },
  { name: "풀업", category: "등", imagePath: "pullup.png", imageId: 8 },
  { name: "풀 오버", category: "등", imagePath: "pullover.png", imageId: 9 },
  { name: "시티드 로우", category: "등", imagePath: "seatedrow.png", imageId: 10 },
  { name: "랫 풀 다운", category: "등", imagePath: "latpulldown.png", imageId: 11 },
  { name: "원 암 로우", category: "등", imagePath: "onearmrow.png", imageId: 12 },
  { name: "티바 로우", category: "등", imagePath: "tbarrow.png", imageId: 13 },
  { name: "벤치프레스", category: "가슴", imagePath: "benchpress.png", imageId: 14 },
  { name: "인클라인 벤치프레스", category: "가슴", imagePath: "inclinebenchpress.png", imageId: 15 },
  { name: "덤벨 벤치프레스", category: "가슴", imagePath: "dumbbellbenchpress.png", imageId: 16 },
  { name: "케이블 크로스오버", category: "가슴", imagePath: "cablecrossover.png", imageId: 17 },
  { name: "푸쉬업", category: "가슴", imagePath: "pushup.png", imageId: 18 },
  { name: "딥스", category: "가슴", imagePath: "dips.png", imageId: 19 },
  { name: "팩덱플라이", category: "가슴", imagePath: "packDeckfly.png", imageId: 20 },
  { name: "숄더 프레스", category: "어깨", imagePath: "shoulderpress.png", imageId: 21 },
  { name: "사이드 레터럴 레이즈", category: "어깨", imagePath: "sidelateralraise.png", imageId: 22 },
  { name: "밀리터리 프레스", category: "어깨", imagePath: "militarypress.png", imageId: 23 },
  { name: "컨센트레이션컬", category: "팔", imagePath: "concentrationcurl.png", imageId: 24 },
  { name: "바벨 컬", category: "팔", imagePath: "barbellcurl.png", imageId: 25 },
  { name: "덤벨 컬", category: "팔", imagePath: "dumbbellcurl.png", imageId: 26 },
  { name: "시티드 덤벨 컬", category: "팔", imagePath: "seateddumbbellcurl.png", imageId: 27 },
  { name: "삼두 익스텐션", category: "팔", imagePath: "tricepsextension.png", imageId: 28 },
  { name: "버피 테스트", category: "유산소", imagePath: "burpee.png", imageId: 29 },
  { name: "싸이클", category: "유산소", imagePath: "cycle.png", imageId: 30 },
  { name: "트레드밀", category: "유산소", imagePath: "treadmill.png", imageId: 31 },
  { name: "스텝퍼", category: "유산소", imagePath: "stepper.png", imageId: 32 },
  { name: "로잉", category: "유산소", imagePath: "rowing.png", imageId: 33 },
];



function ExerciseMain({ userId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingExercises, setPendingExercises] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentExercises, setCurrentExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [exerciseDates, setExerciseDates] = useState([]);
  useEffect(() => {

    const fetchExerciseDates = async () => {
      const token = localStorage.getItem('JwtToken');
      try {
        const response = await axios.get(`/api/exercises/logs/dates`, {
          params: { userId },
          headers: { Authorization: `Bearer ${token}` }
        });
        setExerciseDates(response.data);  // 운동 기록이 있는 모든 날짜를 저장
      } catch (error) {
        console.error('운동 날짜 조회에 실패했습니다:', error);
      }
    };
    fetchExerciseDates();
    // localStorage에서 저장 상태를 가져옴
    const savedStatus = localStorage.getItem('isSaved') === 'true';
    setIsSaved(savedStatus);

    if (userId) {
      setLoading(true);
      fetchExerciseLogs(userId, selectedDate.toLocaleDateString('en-CA'), setCurrentExercises)
        .finally(() => setLoading(false));
      return;
    }
  }, [userId, selectedDate]);

  const fetchExerciseLogs = async (userId, date, setCurrentExercises, signal) => {
    const token = localStorage.getItem('JwtToken');
    setCurrentExercises([]);// 현재 운동 기록 초기화
    try {
      const response = await axios.get(`/api/exercises/logs`, {
        params: { userId, date },
        headers: { Authorization: `Bearer ${token}` },
        signal: signal
      });
      const exercises = response.data;

    // 운동 기록이 없으면 isSaved를 false로, 있으면 true로 설정
    if (exercises.length === 0) {
      setIsSaved(false);  // 기록이 없으므로 수정 가능
    } else {
      setIsSaved(true);   // 기록이 있으므로 수정 불가능
    }

    setCurrentExercises(exercises);  // 불러온 운동 기록 설정
      
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error('운동 기록 조회에 실패했습니다:', error);
      }
    } finally {
      setLoading(false);
      
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setSearchTerm('');
    setPendingExercises([]);
  };

  const categories = [
    "하체", "등", "가슴", "어깨", "팔", "유산소"
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddExercise = (exerciseName, exerciseImagePath, exerciseId, exerciseCategory) => {
    setPendingExercises([...pendingExercises, {
      name: exerciseName,
      imagePath: exerciseImagePath,
      imageId: exerciseId,
      weightUsed: '',
      reps: '',
      sets: '',
      category: exerciseCategory
    }]);
  };

  const handleRemoveExercise = (exerciseName) => {
    setPendingExercises(pendingExercises.filter(exercise => exercise.name !== exerciseName));
  };

  const handleConfirmExercises = () => {
    setCurrentExercises([...currentExercises, ...pendingExercises]);
    closeModal();
  };

  const deleteExercise = async (exerciseIndex) => {
    const exerciseId = currentExercises[exerciseIndex].exerciseId; // 삭제할 운동 기록의 ID
    const exerciseDate = currentExercises[exerciseIndex].exerciseDate;// 삭제할 운동 기록의 date
    try {
      await axios.delete(`/api/exercises/logs/${exerciseId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('JwtToken')}` }
      });
      const updatedExercises = currentExercises.filter((_, index) => index !== exerciseIndex);
      setCurrentExercises(updatedExercises);
      // 삭제 후 해당 날짜에 남은 운동 기록이 없는지 확인
    if (updatedExercises.length === 0 || !updatedExercises.some(ex => ex.exerciseDate === exerciseDate)) {
      const formattedDate = new Date(exerciseDate).toLocaleDateString('en-CA');
      setExerciseDates(prevDates => prevDates.filter(date => date !== formattedDate)); // 해당 날짜 제거
    }
    } catch (error) {
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.replace(/\s+/g, '').toLowerCase());
  };

  const handleExerciseSelect = (exerciseName, exerciseImage, exerciseId, exerciseCategory) => {
    if (pendingExercises.find(exercise => exercise.name === exerciseName)) {
      handleRemoveExercise(exerciseName);
    } else {
      handleAddExercise(exerciseName, exerciseImage, exerciseId, exerciseCategory);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedExercises = [...currentExercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setCurrentExercises(updatedExercises);
  };

  const filteredExercises = availableExercises.filter(exercise =>
    (selectedCategory ? exercise.category === selectedCategory : true) &&
    exercise.name.replace(/\s+/g, '').toLowerCase().includes(searchTerm)
  );

  const handleDateChange = (date) => {
    const selectedDateString = selectedDate.toLocaleDateString('en-CA');
    const newDateString = date.toLocaleDateString('en-CA');

    if (selectedDateString !== newDateString) {
      setSelectedDate(date);
      setCurrentExercises([]);
    }
  };

  const handleEdit = () => {
    setIsSaved(false); // 수정 모드로 전환
  };

  const handleSave = async () => {
    if (userId) {
      const formattedDate = selectedDate.toLocaleDateString('en-CA');

      const logsToSave = currentExercises.map(exercise => ({
        exerciseId: exercise.exerciseId, // 기존 기록의 ID
        userId: userId,
        exerciseName: exercise.name,
        exerciseType: exercise.category,
        weightUsed: exercise.weightUsed,
        reps: exercise.reps,
        sets: exercise.sets,
        exerciseDate: formattedDate,
        imageId: exercise.imageId,
        imagePath: exercise.imagePath
      }));

      try {
        await axios.put('/api/exercises/logs', logsToSave, {
          headers: { 'Content-Type': 'application/json' },
        });
        setExerciseDates(prevDates => [...new Set([...prevDates, formattedDate])]);
        setIsSaved(true); // 저장 후 수정 불가능하게 전환
        localStorage.setItem('isSaved', 'true'); // 저장 상태를 localStorage에 저장

        fetchExerciseLogs(userId, formattedDate, setCurrentExercises);
      } catch (error) {
        console.error('운동 기록 업데이트에 실패했습니다:', error);
      }
    }
  };

  const handleClear = async () => {
    const token = localStorage.getItem('JwtToken');
    if (userId) {
      try {
        const formattedDate = selectedDate.toLocaleDateString('en-CA');
        await axios.delete('/api/exercises/delete', {
          params: { userId, date: formattedDate },
          headers: { 'Authorization': `Bearer ${token}` }
        });
        alert('운동 기록이 성공적으로 삭제되었습니다');
        setCurrentExercises([]);
        setExerciseDates(prevDates => prevDates.filter(date => date !== formattedDate));
        localStorage.removeItem('isSaved'); // 기록 삭제 시 저장 상태 초기화
        setIsSaved(false);
      } catch (error) {
        alert('운동 기록 삭제에 실패했습니다: ' + error.response?.data || error.message);
      }
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const selectedDateString = date.toLocaleDateString('en-CA');
  
      // exerciseDates에 해당 날짜가 있으면 dot을 표시
      if (exerciseDates.includes(selectedDateString)) {
        return <div className="dot"></div>;
      }
    }
    return null;
  };
  
  return (
    <div className='ExerciseMainTrue'>
      <div className='every'>
        <div className='exerciseMainBody'>
          <div className="header">
            <h1>내 운동</h1>
            <hr />
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
                  <hr />
                  {loading ? (
                    <div className="loading">로딩 중...</div>
                  ) : (
                    currentExercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="exerciseEntry">
                        <img src={`/image/exercisePictogram/${exercise.imagePath}`} alt={exercise.name} className="exerciseImage" />
                        <p>{exercise.name}</p>
                        {!isSaved ? (
                          <div>
                            <li>
                              <label>&nbsp;무게</label>
                              <input
                                type="number"
                                min="1"
                                placeholder="(kg)"
                                value={exercise.weightUsed}
                                onChange={(e) => handleInputChange(exerciseIndex, 'weightUsed', e.target.value)}
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
                          </div>
                        ) : (
                          <ul>
                            <li>무게: {exercise.weightUsed}kg</li>
                            <li>횟수: {exercise.reps}회</li>
                            <li>세트: {exercise.sets}세트</li>
                          </ul>
                        )}
                        <button className="delete" onClick={() => deleteExercise(exerciseIndex)}>
                          <i className="fa-solid fa-circle-minus"></i>
                        </button>
                      </div>
                    ))
                  )}
                  {/* 첫 로딩시 버튼 3개 저장 2개 수정 3개 */}
                  <div className="dailyActivity">
                    {!isSaved ? (
                      <>
                        <button className="add" onClick={openModal} disabled={isSaved}>운동 추가하기</button>
                        <button className="clear" onClick={handleClear}>초기화</button>
                        <button className="save" onClick={handleSave} disabled={isSaved}>저장하기</button>
                      </>
                    ) : (
                      <>
                        <button className="clear" onClick={handleClear}>초기화</button>
                        <button className="save" onClick={handleEdit}>수정하기</button>
                      </>
                    )}
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
                      onClick={() => handleAddExercise(exercise.name, exercise.imagePath, exercise.imageId, exercise.category)}
                    >
                      <img src={`/image/exercisePictogram/${exercise.imagePath}`} alt={exercise.name} className="exerciseImage" />
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
