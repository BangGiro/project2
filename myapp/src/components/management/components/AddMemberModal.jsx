import React, { useState, useEffect } from 'react';
import './AddMemberModal.css';

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const AddMemberModal = ({ onAdd, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [memo, setMemo] = useState('');
    const [availability, setAvailability] = useState(
        daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: false }), {})
    );
    const [times, setTimes] = useState(
        daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: '' }), {})
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email) {
            onAdd({ name, email, memo, availability, times });
            setName('');
            setEmail('');
            setMemo('');
            setAvailability(daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: false }), {}));
            setTimes(daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: '' }), {}));
            onClose();
        } else {
            alert('이메일과 이름을 입력해주세요.');
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
                        placeholder="Name"
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
                        placeholder="Memo (optional, max 150 characters)"
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
                                            value={times[day]}
                                            onChange={(e) => handleTimeChange(day, e.target.value)}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;
