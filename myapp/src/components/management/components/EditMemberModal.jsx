import React, { useState, useEffect } from 'react';
import './AddMemberModal.css'; // 동일한 스타일 사용

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const EditMemberModal = ({ item, onSave, onClose }) => {
    const [name, setName] = useState(item.name);
    const [email, setEmail] = useState(item.email);
    const [memo, setMemo] = useState(item.memo || '');
    const [availability, setAvailability] = useState(item.availability || {});
    const [times, setTimes] = useState(item.times || {});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email) {
            onSave({ name, email, memo, availability, times });
        } else {
            alert('회원명과 이메일을 입력해주세요.');
        }
    };

    const handleAvailabilityChange = (day) => {
        setAvailability((prev) => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    const handleTimeChange = (day, value) => {
        setTimes((prev) => ({
            ...prev,
            [day]: value
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="회원명"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea
                        placeholder="메모 (최대 150자)"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        maxLength="150"
                    />
                    <div className="availability-section">
                        <label>Available Days:</label>
                        <div className="days-container">
                            {daysOfWeek.map((day) => (
                                <span
                                    key={day}
                                    className={`day-label ${availability[day] ? 'selected' : ''}`}
                                    onClick={() => handleAvailabilityChange(day)}
                                >
                                    {day}
                                </span>
                            ))}
                        </div>
                        <div className="times-container">
                            {daysOfWeek.map((day) =>
                                availability[day] && (
                                    <div key={day} className="time-input">
                                        <label>{day}</label>
                                        <input
                                            type="time"
                                            step="60000"
                                            value={times[day]}
                                            onChange={(e) => handleTimeChange(day, e.target.value)}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <button type="submit" className="submit-button">저장</button>
                </form>
            </div>
        </div>
    );
};

export default EditMemberModal;
