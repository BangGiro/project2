import React from 'react';
import './Member.css';

const Member = ({ items, onDelete, onEdit, onView }) => {
  // 5개씩 끊어서 행을 만들기
  const rows = [];
  for (let i = 0; i < items.length; i += 5) {
    rows.push(items.slice(i, i + 5));
  }

  return (
    <table className="member-table">
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((item, itemIndex) => (
              <td key={itemIndex} onClick={() => onView(itemIndex + rowIndex * 5)}>
                <div className='profile'><div></div></div>
                <div>{item.name}</div>
                <button className="edit-button" onClick={(e) => { e.stopPropagation(); onEdit(itemIndex + rowIndex * 5); }}>수정하기</button>
                <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(itemIndex + rowIndex * 5); }}>삭제하기</button>
              </td>
            ))}
            {/* 빈 셀 채우기 */}
            {row.length < 5 && [...Array(5 - row.length)].map((_, idx) => <td key={`empty-${idx}`}>&nbsp;</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Member;
