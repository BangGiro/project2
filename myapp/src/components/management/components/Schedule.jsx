import React from 'react';
import './Schedule.css';

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
const hours = Array.from({ length: 20 }, (_, i) => i + 5); // 5시부터 24시까지

const colors = [
    'rgba(0, 123, 255, 0.5)',
    'rgba(40, 167, 69, 0.5)',
    'rgba(255, 193, 7, 0.5)',
    'rgba(220, 53, 69, 0.5)',
    'rgba(108, 117, 125, 0.5)',
    'rgba(102, 16, 242, 0.5)',
    'rgba(23, 162, 184, 0.5)',
    'rgba(255, 87, 34, 0.5)'
];

const borderColors = [
    'rgb(0, 123, 255)',
    'rgb(40, 167, 69)',
    'rgb(255, 193, 7)',
    'rgb(220, 53, 69)',
    'rgb(108, 117, 125)',
    'rgb(102, 16, 242)',
    'rgb(23, 162, 184)',
    'rgb(255, 87, 34)'
];

const getColor = (name) => {
    const index = name.charCodeAt(0) % colors.length;
    return { background: colors[index], border: borderColors[index] };
};

const Schedule = ({ items }) => {
    const getMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const renderEntries = (day, hour) => {
        return items
            .filter((item) => item.availability[day])
            .map((item) => {
                const startMinutes = getMinutes(item.times[day]);
                const startHour = Math.floor(startMinutes / 60);
                const startMinute = startMinutes % 60;
                if (startHour === hour) {
                    const { background, border } = getColor(item.name);
                    return (
                        <div
                            key={item.name}
                            className="schedule-entry"
                            style={{
                                top: 0,
                                height: '100%', // 셀을 가득 채우도록 설정
                                backgroundColor: background,
                                borderColor: border
                            }}
                        >
                            {item.name}
                        </div>
                    );
                }
                return null;
            });
    };

    const hasEntries = (day, hour) => {
        return items.some(item => item.availability[day] && Math.floor(getMinutes(item.times[day]) / 60) === hour);
    };

    return (
        <div className="schedule-container">
            <h3>내 일정관리</h3>
            <div className="schedule-grid">
                {daysOfWeek.map((day) => (
                    <div key={day} className="schedule-day">
                        <div className="schedule-day-header">{day}</div>
                        {hours.map((hour) => (
                            <div key={hour} className={`schedule-hour ${hasEntries(day, hour) ? '' : 'empty-hour'}`}>
                                <div className="schedule-hour-label">{`${hour}:00`}</div>
                                <div className="schedule-entries">
                                    {renderEntries(day, hour)}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
