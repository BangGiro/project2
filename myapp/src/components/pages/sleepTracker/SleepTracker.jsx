import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { Line } from 'react-chartjs-2';
import 'react-calendar/dist/Calendar.css';
import './SleepTracker.css';
import { API_BASE_URL } from '../../../service/app-config';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import FloatingButton from '../../layout/FloatingButton';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SleepTracker = ({ userId }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [sleepDuration, setSleepDuration] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [records, setRecords] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentRecords, setCurrentRecords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAnimation, setModalAnimation] = useState('');
    const [sleepQuality, setSleepQuality] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        // 서버에서 기록을 가져오는 함수 호출
        if (userId) {
            fetchRecordsFromServer(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (Array.isArray(records) && records.length > 0) {
            const selectedDateData = records.find(record => record.date === selectedDate.toLocaleDateString());
            setCurrentRecords(selectedDateData || []);
        } else {
            setCurrentRecords([]);
        }
    }, [selectedDate, records]);

    const fetchRecordsFromServer = async (userId) => {
        try {
            const response = await axios.get(`${ API_BASE_URL }/api/sleep/user/${userId}`);
            const records = response.data;
    
            // 서버에서 받은 기록들에 대해 duration을 다시 계산
            const updatedRecords = records.map(record => {
                const start = new Date(record.sleepStart);
                const end = new Date(record.sleepEnd);
    
                let duration = (end - start) / (1000 * 60 * 60); // 밀리초를 시간으로 변환
    
                // 종료 시간이 시작 시간보다 이전일 때 24시간 더해줌
                if (duration < 0) {
                    duration += 24;
                }
    
                return {
                    ...record,
                    duration: parseFloat(duration.toFixed(1)) // 소수점 한 자리로 고정
                };
            });
    
            setRecords(updatedRecords); // 업데이트된 기록을 상태로 설정
        } catch (error) {
            console.error('수면 기록이 없습니다');
        }
    };
    

    const openModal = () => {
        setIsModalOpen(true);
        setModalAnimation('modal-show');
    };

    const closeModal = () => {
        setModalAnimation('modal-hide');
        setTimeout(() => {
            setIsModalOpen(false);
            setModalAnimation('');
        }, 500);
        setEditIndex(null); // 모달이 닫힐 때 editIndex 초기화
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setEditIndex(null); // 날짜가 변경될 때 editIndex 초기화
        openModal();
    };

    const calculateSleepDuration = () => {
        if (!startTime && !endTime) {
            setErrorMessage('시작 시간과 종료 시간을 설정하세요');
            return null;
        } else if (!startTime) {
            setErrorMessage('시작 시간을 설정하세요');
            return null;
        } else if (!endTime) {
            setErrorMessage('종료 시간을 설정하세요');
            return null;
        }

        setErrorMessage('');
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        let duration = (end - start) / (1000 * 60 * 60);
        if (duration < 0) {
            duration += 24;
        }
        return duration.toFixed(1);
    };


    const editRecord = (index) => {
        const record = records[index]; // 수정할 기록 가져오기
        setStartTime(record.sleepStart.split('T')[1].slice(0, 5)); // sleepStart에서 시간 부분만 설정
        setEndTime(record.sleepEnd.split('T')[1].slice(0, 5)); // sleepEnd에서 시간 부분만 설정
        setSleepQuality(record.sleepQuality);
        setSelectedDate(new Date(record.sleepDate)); // 날짜 설정
        setEditIndex(index); // 수정할 인덱스를 설정
        openModal(); // 모달 열기
    };

    const deleteRecord = async (index) => {
        const sleepId = records[index].sleepId;  // 서버로부터 받아온 기록 ID
        try {
            await axios.delete(`${ API_BASE_URL }/api/sleep/logs/${sleepId}`);  // 서버에서 삭제
            setRecords(records.filter((_, i) => i !== index));// 삭제 후 상태 업데이트
        } catch (error) {
            console.error('수면 기록 삭제에 실패했습니다:', error);
        }
    };

    

    const saveEditedRecord = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('JwtToken'); // 토큰 가져오기
        if (!startTime || !endTime) {
            alert('수면 시작 시간과 종료 시간을 모두 설정하세요.');
            return;
        }
    
        const duration = calculateSleepDuration();
        if (duration === null) return;
        
        

        const formattedDate = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD 형식으로 변환
        const formattedStartTime = `${formattedDate}T${startTime}:00`;  // yyyy-MM-ddTHH:mm:ss
        const formattedEndTime = `${formattedDate}T${endTime}:00`;      // yyyy-MM-ddTHH:mm:ss
    
        const newRecord = {
            userId: userId,  // userId 사용
            sleepDate: formattedDate,  // 수면 날짜 (YYYY-MM-DD 형식)
            sleepStart: formattedStartTime,
            sleepEnd: formattedEndTime,
            sleepQuality: sleepQuality,
            duration: duration,
        };
    
        try {
            await axios.post(`${ API_BASE_URL }/api/sleep/logs`, newRecord, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            alert('수면 기록이 저장되었습니다.');
            // 이미 같은 날짜의 기록이 화면에 있는지 확인
        const existingRecordIndex = records.findIndex(record => record.sleepDate === formattedDate);

        if (existingRecordIndex !== -1) {
            // 이미 같은 날짜가 있는 경우 해당 기록을 업데이트
            const updatedRecords = [...records];
            updatedRecords[existingRecordIndex] = {
                ...updatedRecords[existingRecordIndex],
                sleepStart: formattedStartTime,
                sleepEnd: formattedEndTime,
                sleepQuality: sleepQuality,
                duration: duration,
            };
            setRecords(updatedRecords);
        } else {
            // 새로운 기록을 추가
            setRecords([...records, newRecord]);
        }

        closeModal();  // 모달 닫기
    } catch (error) {
        console.error('수면 기록 저장에 실패했습니다:', error);
        alert('수면 기록 저장에 실패했습니다.');
    }
};

    const getTileContent = ({ date, view }) => {
        if (view === 'month') {
            const validRecords = Array.isArray(records) ? records : [];
            const formattedDate = date.toLocaleDateString('en-CA');
        
            // 해당 날짜에 해당하는 기록을 찾음
            const record = validRecords.find(record => record.sleepDate === formattedDate);
            if (record) {
                return (
                    <div className="sleepTrackerTileContent" style={{ backgroundColor: getRecordColor(record.duration) }}>
                        <span>{record.duration}h</span>
                    </div>
                );
            }
        }
    };

    const getRecordColor = (duration) => {
        if (duration <= 5) {
            return '#ffcccc';
        } else if (duration <= 7) {
            return '#ffffcc';
        } else if (duration <= 9) {
            return '#ccffcc';
        } else {
            return '#cce0ff';
        }
    };

    const getWeekData = () => {
        const weekData = [];
        const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    
        const validRecords = Array.isArray(records) ? records : [];
        const currentDate = new Date(); // 현재 날짜
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // 이번 주의 첫 날(일요일)
    
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i); // 해당 주의 각 요일로 설정
    
            // sleepDate와 date를 YYYY-MM-DD 형식으로 비교
            const record = validRecords.find(record => {
                const recordDate = new Date(record.sleepDate).toLocaleDateString('en-CA'); // 기록된 날짜
                const currentDayFormatted = date.toLocaleDateString('en-CA'); // 현재 요일의 날짜
                return recordDate === currentDayFormatted;
            });
    
            // duration 값을 시간 단위로 사용
            const durationInHours = record ? parseFloat(record.duration) : 0;
    
            weekData.push({
                day: weekDays[i], // 요일 이름
                duration: durationInHours, // 해당 요일의 수면 시간
            });
        }
    
        return weekData;
    };
    
    const weekData = getWeekData();

    const data = {
        labels: weekData.map(data => data.day), // 요일 레이블 설정
        datasets: [
            {
                label: '수면 시간 (시간)',
                data: weekData.map(data => isNaN(data.duration) ? 0 : data.duration),  // 수면 시간을 데이터로 사용
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };
    
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 24, // 최대 24시간으로 설정
            },
        },
    };

    const handleQualityChange = (emoji) => {
        let quality;
        switch (emoji) {
            case '😴':
                quality = '매우 안좋음';
                break;
            case '🥱':
                quality = '안좋음';
                break;
            case '😑':
                quality = '보통';
                break;
            case '🙂':
                quality = '좋음';
                break;
            case '😁':
                quality = '매우 좋음';
                break;
            default:
                quality = '';
        }
        setSleepQuality(quality); // 문자열로 sleepQuality 설정
    };

 

    const paginatedRecords = Array.isArray(records)
        ? records.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
        : [];


    return (
        <div className='SleepTrackerTrue'>
            <div className="sleepTracker">
                <h1>수면 관리</h1>
                <FloatingButton />
                <hr />
                <div className='sleepTrackerMain'>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileContent={getTileContent}
                    />
                    <div className="sleepTrackerGraph">
                        <h2>주간 수면 시간 그래프</h2>
                        <Line data={data} options={options} />
                    </div>
                </div>
                <Modal
                    ariaHideApp={false}
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="수면 기록"
                    className={`sleepTrackerModal ${modalAnimation}`}
                    overlayClassName="sleepTrackerOverlay"
                >
                    <form onSubmit={saveEditedRecord}>
                        <div className="sleepTrackerInputGroup">
                            <label>수면 시작</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="sleepTrackerInputGroup">
                            <label>수면 종료</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                        <div className="sleepTrackerInputGroup">
                            <label>수면 품질</label>
                            <div className="sleepQualityButtons">
                                <button type="button" onClick={() => handleQualityChange('😴')} className={sleepQuality === '매우 안좋음' ? 'selected' : ''}>😴</button>
                                <button type="button" onClick={() => handleQualityChange('🥱')} className={sleepQuality === '안좋음' ? 'selected' : ''}>🥱</button>
                                <button type="button" onClick={() => handleQualityChange('😑')} className={sleepQuality === '보통' ? 'selected' : ''}>😑</button>
                                <button type="button" onClick={() => handleQualityChange('🙂')} className={sleepQuality === '좋음' ? 'selected' : ''}>🙂</button>
                                <button type="button" onClick={() => handleQualityChange('😁')} className={sleepQuality === '매우 좋음' ? 'selected' : ''}>😁</button>
                            </div>
                            {sleepQuality && (
                                <div className="selectedQuality">
                                    {sleepQuality}
                                </div>
                            )}
                        </div>
                        <div className="sleepTrackerButtonGroup">
                            <button type="submit" className="sleepTrackerButton">저장</button>
                            <button type="button" className="sleepTrackerButton" onClick={closeModal}>닫기</button>
                        </div>
                        {sleepDuration !== null && (
                            <div className="sleepTrackerResult">
                                <h2>수면 시간: {sleepDuration}h</h2>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="sleepTrackerErrorMessage">{errorMessage}</div>
                        )}
                    </form>
                </Modal>
                <hr />
                <SleepRecords
                    records={paginatedRecords}
                    editRecord={editRecord}
                    deleteRecord={deleteRecord}
                />
            </div>
        </div>
    );
};

const SleepRecords = ({ records, editRecord, deleteRecord }) => {

    const getRecordStyle = (duration) => {
        if (duration <= 5) {
            return { backgroundColor: '#ffcccc' };
        } else if (duration <= 7) {
            return { backgroundColor: '#ffffcc' };
        } else if (duration <= 9) {
            return { backgroundColor: '#ccffcc' };
        } else {
            return { backgroundColor: '#cce0ff' };
        }
    };

    // records가 배열인지 확인 후 처리
    if (!Array.isArray(records) || records.length === 0) {
        return <p>수면 기록이 없습니다.</p>;
    }

    return (
        <div className="sleepTrackerRecords">
            <h2>수면 기록</h2>
            <ul>
                {records.map((record, index) => (
                    <li key={index} className="sleepTrackerRecord" style={getRecordStyle(record.duration)}>
                        <div className="sleepTrackerRecordInfo">
                            <strong>{record.sleepDate}:</strong> 수면 시간: {record.duration}시간 | 수면 품질: {record.sleepQuality}
                        </div>
                        <div className="sleepTrackerRecordButtons">
                            <button className="sleepTrackerButton" onClick={() => editRecord(index)}>수정</button>
                            <button className="sleepTrackerButton" onClick={() => deleteRecord(index)}>삭제</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SleepTracker;
