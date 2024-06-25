import React, { useEffect } from 'react';
import './AddMemberModal.css';

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

const ViewMemberModal = ({ item, onClose }) => {
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
                <div className="modal-form view-modal-form left-align">
                    <div>
                        <strong>Name:</strong> {item.name}
                    </div>
                    <div>
                        <strong>Email:</strong> {item.email}
                    </div>
                    <div>
                        <strong>Memo:</strong> {item.memo}
                    </div>
                    <div className="availability-section">
                        <label>Available Days and Times:</label>
                        <div className="times-container">
                            {daysOfWeek.map((day) =>
                                item.availability[day] && (
                                    <div key={day} className="time-input">
                                        <label>{day}</label>
                                        <span>{item.times[day]}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <button className="submit-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ViewMemberModal;
