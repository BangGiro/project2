import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { Line } from 'react-chartjs-2';
import 'react-calendar/dist/Calendar.css';
import './SleepTracker.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SleepTracker = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [sleepDuration, setSleepDuration] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [records, setRecords] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tipsVisible, setTipsVisible] = useState(false);

    useEffect(() => {
        const savedRecords = localStorage.getItem('sleepRecords');
        if (savedRecords) {
            setRecords(JSON.parse(savedRecords));
        }
    }, []);

    useEffect(() => {
        const record = records.find(record => new Date(record.date).toLocaleDateString() === selectedDate.toLocaleDateString());
        setSelectedRecord(record);
        if (record) {
            setStartTime(record.startTime);
            setEndTime(record.endTime);
            setSleepDuration(record.sleepDuration);
        } else {
            setStartTime('');
            setEndTime('');
            setSleepDuration(null);
        }
    }, [selectedDate, records]);

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

        setErrorMessage(''); // Clear previous error message
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        let duration = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
        if (duration < 0) {
            duration += 24; // Adjust for cases where end time is past midnight
        }
        return duration.toFixed(1);
    };

    const getSleepAdvice = (duration) => {
        if (duration <= 5) {
            return '수면 시간이 부족합니다. 건강을 위해 더 많은 수면이 필요합니다. 최소 7시간 이상 자도록 노력하세요.';
        } else if (duration <= 7) {
            return '적절한 수면을 취하고 있습니다. 하지만 조금 더 자는 것이 건강에 좋습니다. 7-9시간의 수면을 권장합니다.';
        } else if (duration <= 9) {
            return '이상적인 수면 시간입니다! 건강을 유지하기 위해 이 수면 패턴을 지속하세요.';
        } else {
            return '수면 시간이 너무 깁니다. 너무 많은 수면은 오히려 건강에 해로울 수 있습니다. 적절한 수면 시간을 유지하세요.';
        }
    };



    const editRecord = (index) => {
        const record = records[index];
        setStartTime(record.startTime);
        setEndTime(record.endTime);
        setSleepDuration(record.sleepDuration);
        setEditIndex(index);
        setIsModalOpen(true); // Open modal for editing
    };

    const deleteRecord = (index) => {
        const updatedRecords = records.filter((_, i) => i !== index);
        setRecords(updatedRecords);
        localStorage.setItem('sleepRecords', JSON.stringify(updatedRecords));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const getTileContent = ({ date, view }) => {
        if (view === 'month') {
            const record = records.find(record => new Date(record.date).toLocaleDateString() === date.toLocaleDateString());
            if (record) {
                return (
                    <div className="sleepTrackerTileContent" style={{ backgroundColor: getRecordColor(record.sleepDuration) }}>
                        <span>{record.sleepDuration}h</span>
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

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleTipsVisibility = () => {
        setTipsVisible(!tipsVisible);
    };

    const saveEditedRecord = (event) => {
        event.preventDefault();
        const duration = calculateSleepDuration();
        if (duration === null) return;

        const date = new Date(selectedDate).toLocaleDateString();
        const newRecord = { date, startTime, endTime, sleepDuration: duration };
        const existingRecordIndex = records.findIndex(record => record.date === date);
        let updatedRecords;

        if (existingRecordIndex !== -1) {
            updatedRecords = records.map((record, index) =>
                index === existingRecordIndex ? newRecord : record
            );
        } else {
            updatedRecords = [...records, newRecord];
        }

        updatedRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

        setRecords(updatedRecords);
        localStorage.setItem('sleepRecords', JSON.stringify(updatedRecords));
        setErrorMessage('');
    };

    const getWeekData = () => {
        const weekData = [];
        const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + i);
            const record = records.find(record => new Date(record.date).toLocaleDateString() === date.toLocaleDateString());
            weekData.push({
                day: weekDays[i],
                duration: record ? parseFloat(record.sleepDuration) : 0,
            });
        }

        return weekData;
    };

    const weekData = getWeekData();

    const data = {
        labels: weekData.map(data => data.day),
        datasets: [
            {
                label: '수면 시간 (시간)',
                data: weekData.map(data => data.duration),
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
                max: 24,
            },
        },
    };

    return (
        <div className='SleepTrackerTrue'>
        <div className="sleepTracker">
            <h1>수면 관리</h1>
            <hr/>
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
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="수면 기록"
                className="sleepTrackerModal"
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
                    <div className="sleepTrackerButtonGroup">
                        <button type="submit" className="sleepTrackerButton">저장</button>
                        <button type="button" className="sleepTrackerButton" onClick={closeModal}>닫기</button>
                    </div>
                    {sleepDuration !== null && (
                        <div className="sleepTrackerResult">
                            <h2>수면 시간: {sleepDuration}h</h2>
                            <p>{getSleepAdvice(sleepDuration)}</p>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="sleepTrackerErrorMessage">{errorMessage}</div>
                    )}
                </form>
            </Modal>
            <hr/>
            <SleepRecords
                records={records}
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

    return (
        <div className="sleepTrackerRecords">
            <h2>수면 기록</h2>
            <ul>
                {records.map((record, index) => (
                    <li key={index} className="sleepTrackerRecord" style={getRecordStyle(record.sleepDuration)}>
                        <div className="sleepTrackerRecordInfo">
                            <strong>{record.date}:</strong> 수면 시간: {record.sleepDuration}h
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
